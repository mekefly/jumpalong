import ReplaceableEventMap from "@/nostr/ReplaceableEventMap";
import { type RelayConfigurator } from "@/nostr/Synchronizer/relayConfigurator";
import { type EventBeltline, type PublishOpt } from "@/nostr/eventBeltline";
import { TYPES } from "@/nostr/nostr";
import { type NostrApi } from "@/nostr/nostrApi/NostrApi";
import createEoseUnSubStaff from "@/nostr/staff/createEoseUnSubStaff";
import { getSourceUrls } from "@/nostr/staff/createEventSourceTracers";
import createTimeoutUnSubStaff from "@/nostr/staff/createTimeoutUnSubStaff";
import { deserializeTagRToReadWriteList } from "@/nostr/tag";
import {
  defaultCacheOptions,
  deleteCache,
  getCacheOrNull,
  setCache,
  useCache,
} from "@/utils/cache";
import { setAdds, withDefault } from "@/utils/utils";
import { inject, injectable } from "inversify";
import { Event } from "nostr-tools";
import type CreateEventBeltline from "./CreateEventBeltline";
import { GeneralEventEventBeltline } from "./GeneralEventEventBeltline";
import { EventApi } from "./event";
import { CreateTextEventBeltlineOption } from "./shortTextEventBeltline";

export const reactions = reactive(
  useLocalStorage("reactions", ["+", "-"]).value
);
const reactionsSet = new Set(reactions);
const ReactionsCacheOptions = {
  ...defaultCacheOptions,
  duration: 1000 * 60 * 60 * 24,
};

@injectable()
export class LikeApi {
  constructor(
    @inject(TYPES.RootEventBeltline)
    private rootEventBeltline: EventBeltline<{}>,
    @inject(TYPES.CreateEventBeltline)
    private createEventBeltline: CreateEventBeltline,
    @inject(TYPES.RelayConfiguratorFactory)
    private getRelayConfigurator: () => RelayConfigurator,
    @inject(TYPES.EventApi)
    private eventApi: EventApi,
    @inject(TYPES.GeneralEventEventBeltline)
    private generalEventEventBeltline: GeneralEventEventBeltline,
    @inject(TYPES.NostrApi)
    private nostrApi: NostrApi
  ) {}
  getLikeBeltline(urls?: Set<string>) {
    return useCache(
      "getLikeBeltline",
      () => {
        const line = this.createEventBeltline
          .createEventBeltlineReactive({})
          .addStaff(createEoseUnSubStaff())
          .addStaff(createTimeoutUnSubStaff())

          .addReadUrl()
          .addRelayUrls(urls);

        this.nostrApi.getPublicKey().then((pubkey) => {
          line.addFilter({
            authors: [pubkey],
            kinds: [7],
          });
        });

        return line;
      },
      {
        useLocalStorage: false,
      }
    );
  }
  async sendReactions(
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
    const urls = new Set(this.getRelayConfigurator().getWriteList());

    const event = ReplaceableEventMap.kind10002.get(targetEvent.pubkey);
    if (event) {
      const { writeUrl } = deserializeTagRToReadWriteList(event.tags);
      setAdds(urls, writeUrl);
    }

    const likeEvent = await this.rootEventBeltline.publish(
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
      this.createReactionsKey(content, targetEvent.id),
      likeEvent.id,
      ReactionsCacheOptions
    );
  }
  sendLike(likeEvent: Event, opt?: SendReactionsOption) {
    this.sendReactions("+", likeEvent, opt);
  }
  sendDislike(likeEvent: Event, opt?: SendReactionsOption) {
    this.sendReactions("-", likeEvent, opt);
  }

  deleteReactions(content: ReactionsContent, opt: DeleteReactionsOptions) {
    if (opt.eventId) {
      const key = this.createReactionsKey(content, opt.eventId);
      const cache = getCacheOrNull<string>(key, ReactionsCacheOptions);
      if (cache) {
        this.eventApi.eventDeletionOne(cache, opt);
      }
      deleteCache(key);
    } else if (opt.likeId) {
      this.eventApi.eventDeletionOne(opt.likeId, opt);
    }
  }
  deleteLike(opt: DeleteReactionsOptions) {
    this.deleteReactions("+", opt);
  }
  deleteDislike(opt: DeleteReactionsOptions) {
    this.deleteReactions("-", opt);
  }

  hasReactions(content: ReactionsContent, targetId: string) {
    const key = this.createReactionsKey(content, targetId);
    const cache = getCacheOrNull<string>(key, ReactionsCacheOptions);
    if (cache === null) return false;
    return true;
  }
  hasLike(eventId: string) {
    return this.hasReactions("+", eventId);
  }
  hasDislike(eventId: string) {
    return this.hasReactions("-", eventId);
  }

  createReactionsKey(content: ReactionsContent, eventId: string) {
    return `${content}:${eventId}`;
  }
  createReactionEventLine(opt: CreateReactionEventLine) {
    const event = opt.event;
    const urls = getSourceUrls(event.id);
    const reactionEventLine = this.generalEventEventBeltline
      .createGeneralEventEventBeltline(
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
      )
      .addStaff({
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
}

type SendReactionsOption = {
  urls?: Set<string>;
} & PublishOpt;
type ReactionsContent = "+" | "-";
type DeleteReactionsOptions = {
  eventId?: string;
  likeId?: string;
} & PublishOpt;
type CreateReactionEventLine = Partial<CreateTextEventBeltlineOption> & {
  event: Event;
};
