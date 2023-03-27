import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { createEvent } from "@/nostr/event";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import {
  createDoNotRepeatStaff,
  createFilterGreaterThanTheCurrenttimeStaff,
} from "@/nostr/staff";
import autoAddRelayurlByEventIdStaff from "@/nostr/staff/autoAddRelayurlByEventIdStaff";
import createChannelLikeDataStaff from "@/nostr/staff/createChannelLikeDataStaff";
import createEoseUnSubStaff from "@/nostr/staff/createEoseUnSubStaff";
import { createGarbageFilter } from "@/nostr/staff/createGarbageFilter";
import { createLatestEventStaff } from "@/nostr/staff/createLatestEventStaff";
import createRefreshLoadStaff from "@/nostr/staff/createRefreshLoadStaff";
import createTimeoutUnSubStaff from "@/nostr/staff/createTimeoutUnSubStaff";
import createUseChannelMetadata from "@/nostr/staff/createUseChannelMetadata";
import createWithEvent from "@/nostr/staff/createWithEvent";
import createChannelMetadataEventMap from "@/nostr/staff/storage/createChannelMetadataEventMap";
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

        .addStaff(createLatestEventStaff()) //只获取最新的一条
        .addStaff(createUseChannelMetadata()) //生成metadata
        .addStaff(createEoseUnSubStaff()) //自动关闭请求
        .addStaff(createTimeoutUnSubStaff()) //超时关闭请求
        .addStaff(createChannelMetadataEventMap(eventId)) //临时缓存
        .addStaff(createWithEvent()); //检查是否具有至少一个事件

      if (!metadataLine.feat.withEvent()) {
        metadataLine
          .addStaff(autoAddRelayurlByEventIdStaff(eventId)) //根据事件id获取添加url
          .addReadUrl();
      }

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
        .addStaff(
          //刷新加载
          createRefreshLoadStaff([
            {
              kinds: [42],
              "#e": [eventId],
            },
          ])
        )
        .addStaff(createDoNotRepeatStaff()) //过滤重复
        .addStaff(createFilterGreaterThanTheCurrenttimeStaff()) //非法创建时间
        .addStaff(createGarbageFilter()) //垃圾过滤器
        .addStaff(createBlackStaff()) // 文本黑名单

        .addStaffOfSortByCreateAt();

      setTimeout(() => {
        line.addExtends(
          line
            .createChild()
            .addRelayUrls(urls)
            .onAddRelayUrlsAfter((set: Set<string>) => {
              line.addRelayUrls(set);
            })
            .addFilter({
              ids: [eventId], //订阅创建
              kinds: [40],
            })
            .addFilter({
              //订阅修改
              kinds: [41],
              "#e": [eventId],
            })
            .addFilter({
              //订阅新消息
              kinds: [42],
              "#e": [eventId],
              since: nowSecondTimestamp(),
            })
            .addStaff(autoAddRelayurlByEventIdStaff(eventId))
            .addReadUrl()
        );

        line.feat.load();
      }, 0);

      return line;
    },
    {
      useLocalStorage: false,
    }
  );
}
