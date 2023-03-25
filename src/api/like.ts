import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { PublishOpt } from "@/nostr/eventBeltline";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import ReplaceableEventMap from "@/nostr/ReplaceableEventMap";
import { deserializeTagRToReadWriteList } from "@/nostr/tag";
import {
  defaultCacheOptions,
  deleteCache,
  getCacheOrNull,
  setCache,
} from "@/utils/cache";
import { setAdds } from "@/utils/utils";
import { Event } from "nostr-tools";
import { userKey } from "../nostr/user";
import { eventDeletionOne } from "./event";

export function getLikeBeltline(urls?: Set<string>) {
  return createEventBeltlineReactive({})
    .addFilter({
      authors: [userKey.value.publicKey],
      kinds: [7],
    })

    .addReadUrl()
    .addRelayUrls(urls);
}
type SendReactionsOption = {
  urls?: Set<string>;
} & PublishOpt;

type ReactionsContent = "+" | "-";
const ReactionsCacheOptions = {
  ...defaultCacheOptions,
  duration: 1000 * 60 * 60 * 24,
};
export function sendReactions(
  content: ReactionsContent,
  targetEvent: Event,
  opt?: SendReactionsOption
) {
  let tags: string[][] = targetEvent.tags.filter(
    (tag) =>
      tag.length >= 2 && (tag[0] == "e" || tag[0] == "p" || tag[0] == "r")
  );
  tags.push(["e", targetEvent.id]);
  tags.push(["p", targetEvent.pubkey]);
  const urls = new Set(relayConfigurator.getWriteList());

  const event = ReplaceableEventMap.kind10002.getEvent(targetEvent.pubkey);
  if (event) {
    const { writeUrl } = deserializeTagRToReadWriteList(event.tags);
    setAdds(urls, writeUrl);
  }

  const likeEvent = rootEventBeltline.publish(
    {
      content,
      kind: 7,
      tags,
    },
    urls,
    opt
  );

  if (!likeEvent) return;

  setCache(
    createReactionsKey(content, targetEvent.id),
    likeEvent.id,
    ReactionsCacheOptions
  );
}
export function sendLike(likeEvent: Event, opt?: SendReactionsOption) {
  sendReactions("+", likeEvent, opt);
}
export function sendDislike(likeEvent: Event, opt?: SendReactionsOption) {
  sendReactions("-", likeEvent, opt);
}

type DeleteReactionsOptions = {
  eventId?: string;
  likeId?: string;
} & PublishOpt;
export function deleteReactions(
  content: ReactionsContent,
  opt: DeleteReactionsOptions
) {
  if (opt.eventId) {
    const key = createReactionsKey(content, opt.eventId);
    const cache = getCacheOrNull<string>(key, ReactionsCacheOptions);
    if (cache) {
      eventDeletionOne(cache, opt);
    }
    deleteCache(key);
  } else if (opt.likeId) {
    eventDeletionOne(opt.likeId, opt);
  }
}
export function deleteLike(opt: DeleteReactionsOptions) {
  deleteReactions("+", opt);
}
export function deleteDislike(opt: DeleteReactionsOptions) {
  deleteReactions("-", opt);
}

export function hasReactions(content: ReactionsContent, targetId: string) {
  const key = createReactionsKey(content, targetId);
  const cache = getCacheOrNull<string>(key, ReactionsCacheOptions);
  if (cache === null) return false;
  return true;
}
export function hasLike(eventId: string) {
  return hasReactions("+", eventId);
}
export function hasDislike(eventId: string) {
  return hasReactions("-", eventId);
}

function createReactionsKey(content: ReactionsContent, eventId: string) {
  return `${content}:${eventId}`;
}
