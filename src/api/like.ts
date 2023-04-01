import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { PublishOpt } from "@/nostr/eventBeltline";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import ReplaceableEventMap from "@/nostr/ReplaceableEventMap";
import { getSourceUrls } from "@/nostr/staff/createEventSourceTracers";
import { deserializeTagRToReadWriteList } from "@/nostr/tag";
import {
  defaultCacheOptions,
  deleteCache,
  getCacheOrNull,
  setCache,
} from "@/utils/cache";
import { setAdds, withDefault } from "@/utils/utils";
import { Event } from "nostr-tools";
import { userKey } from "../nostr/user";
import { eventDeletionOne } from "./event";
import {
  createTextEventBeltline,
  CreateTextEventBeltlineOption,
} from "./shortTextEventBeltline";

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
export const reactions = reactive(
  useLocalStorage("reactions", ["+", "-"]).value
);
const reactionsSet = new Set(reactions);
const ReactionsCacheOptions = {
  ...defaultCacheOptions,
  duration: 1000 * 60 * 60 * 24,
};
export function sendReactions(
  content: ReactionsContent,
  targetEvent: Event,
  opt?: SendReactionsOption
) {
  if (!reactionsSet.has(content)) {
    reactionsSet.add(content);
    reactions.push(content);
  }
  let tags: string[][] = targetEvent.tags.filter(
    (tag) =>
      tag.length >= 2 && (tag[0] == "e" || tag[0] == "p" || tag[0] == "r")
  );
  tags.push(["e", targetEvent.id]);
  tags.push(["p", targetEvent.pubkey]);
  const urls = new Set(relayConfigurator.getWriteList());

  const event = ReplaceableEventMap.kind10002.get(targetEvent.pubkey);
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
type CreateReactionEventLine = Partial<CreateTextEventBeltlineOption> & {
  event: Event;
};
export function createReactionEventLine(opt: CreateReactionEventLine) {
  const event = opt.event;
  const urls = getSourceUrls(event.id);
  const reactionEventLine = createTextEventBeltline(
    withDefault(opt, {
      filters: [
        {
          "#e": [opt.event.id],
          kinds: [7],
        },
      ],
      addUrls: new Set(urls),
      limit: 30,
    })
  ).addStaff({
    initialization() {
      (this.beltline.feat as any).reactionMap = {};
    },
    push(e) {
      const reactionMap = (this.beltline.feat as any).reactionMap as Record<
        string,
        Event[]
      >;
      (reactionMap[e.content] ?? (reactionMap[e.content] = [])).push(e);
    },

    feat: {
      getReactionMap() {
        return (this.beltline.feat as any).reactionMap as Record<
          string,
          Event[]
        >;
      },
    },
  });
  return reactionEventLine;
}
