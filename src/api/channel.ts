import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { createEvent } from "@/nostr/event";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import { createFilterGreaterThanTheCurrenttimeStaff } from "@/nostr/staff";
import autoAddRelayurlByEventIdStaff from "@/nostr/staff/autoAddRelayurlByEventIdStaff";
import createChannelLikeDataStaff from "@/nostr/staff/createChannelLikeDataStaff";
import { createGarbageFilter } from "@/nostr/staff/createGarbageFilter";
import createInfiniteScrolling from "@/nostr/staff/createInfiniteScrollingStaff";
import { createLatestEventStaff } from "@/nostr/staff/createLatestEventStaff";
import createUseChannelMetadata from "@/nostr/staff/createUseChannelMetadata";
import { createTagArray } from "../nostr/tag";
import { useCache } from "../utils/cache";
import { noUndefinedInTheArray, nowSecondTimestamp } from "../utils/utils";
import { createBlackStaff } from "../views/ContentBlacklistView";
import { eventDeletion } from "./event";

export const JOIN_CHANNEL_CONTENT = "+";

/**
 * 加入群聊
 * @param channelId
 * @param pubkey
 * @param relayUrl
 */
export function joinChannel(
  channelId: string,
  pubkey?: string,
  relayUrl?: string
) {
  const event = createEvent({
    kind: 7,
    content: JOIN_CHANNEL_CONTENT,
    tags: noUndefinedInTheArray([
      createTagArray("e", channelId, relayUrl),
      pubkey ? createTagArray("p", pubkey, relayUrl) : undefined,
    ]),
  });
  rootEventBeltline
    .createChild()
    .publish(event, relayConfigurator.getWriteList());
}

/**
 * 离开群聊
 * @param joinId
 * @param pubkey
 */
export function leaveChannelByjoinId(joinId: string, pubkey?: string) {
  eventDeletion([joinId]);
}

/**
 * 获取喜欢的channel列表
 *
 * @param urls
 * @returns
 */
export function getLikeChannelBeltline(urls?: Set<string>) {
  return useCache(
    `getLikeChannelBeltline`,
    () => {
      const line = createEventBeltlineReactive().addStaff(
        createChannelLikeDataStaff()
      );

      useCache(
        `getLikeChannelBeltline${urls}`,
        () => {
          urls ? line.addRelayUrls(urls) : line.addReadUrl();
          return true;
        },
        {
          duration: 100000, // 100秒
        }
      );
      return line;
    },
    {
      useLocalStorage: false,
      useMemoryCache: true,
    }
  );
}

/**
 * 获取元数据
 *
 * @param eventId
 * @returns
 */
export function getChannelMetadataBeltlineByChannelId(eventId: string) {
  return useCache(
    `getChannelMetadataBeltlineByChannelId:${eventId}`,
    () => {
      const metadataLine = createEventBeltlineReactive({
        describe: "getChannelMetadataBeltlineByChannelId",
      })
        .addFilter({ ids: [eventId], kinds: [40] })
        .addFilter({ kinds: [41], "#e": [eventId] })

        .addStaff(createLatestEventStaff())
        .addStaff(createUseChannelMetadata())

        .addStaff(autoAddRelayurlByEventIdStaff(eventId))
        .addReadUrl();

      return metadataLine;
    },
    {
      useMemoryCache: true,
      useLocalStorage: false,
    }
  );
}

/**
 * 获取messages
 *
 * @param eventId
 * @param urls
 * @returns
 */
export function getChannelMessageBeltline(eventId: string, urls?: Set<string>) {
  console.log("getChannelMessageBeltline", eventId);

  return useCache(
    `etChannelMessageBeltline:${eventId}`,
    () => {
      const line = createEventBeltlineReactive({
        describe: "getChannelMessageBeltline",
      })
        .addFilter({
          ids: [eventId],
          kinds: [40],
          since: nowSecondTimestamp() - 60 * 60,
        })
        .addFilter({
          kinds: [41, 42],
          "#e": [eventId],
          since: nowSecondTimestamp() - 60 * 60,
        })
        .addStaff(createInfiniteScrolling()) //无限滚动

        .addStaff(createFilterGreaterThanTheCurrenttimeStaff()) //非法创建时间
        .addStaff(createGarbageFilter()) //垃圾过滤器
        .addStaff(createBlackStaff()) // 文本黑名单

        .addStaffOfSortByCreateAt();

      setTimeout(() => {
        line
          .addStaff(autoAddRelayurlByEventIdStaff(eventId))
          .addReadUrl()
          .addRelayUrls(urls);
      }, 100);

      return line;
    },
    {
      useLocalStorage: false,
    }
  );
}
