import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { EventBeltline } from "@/nostr/eventBeltline";
import { TYPES } from "@/nostr/nostr";
import {
  createDoNotRepeatStaff,
  createFilterGreaterThanTheCurrenttimeStaff,
} from "@/nostr/staff";
import autoAddRelayurlByEventIdStaff from "@/nostr/staff/autoAddRelayurlByEventIdStaff";
import createEoseUnSubStaff from "@/nostr/staff/createEoseUnSubStaff";
import { createGarbageFilter } from "@/nostr/staff/createGarbageFilter";
import { createLatestEventStaff } from "@/nostr/staff/createLatestEventStaff";
import createRefreshLoadStaff, {
  createEventSourceTracersForRefreshLoadStaff,
} from "@/nostr/staff/createRefreshLoadStaff";
import createTimeoutUnSubStaff from "@/nostr/staff/createTimeoutUnSubStaff";
import createUseChannelMetadata from "@/nostr/staff/createUseChannelMetadata";
import createWithEvent from "@/nostr/staff/createWithEvent";
import createChannelMetadataEventMap from "@/nostr/staff/storage/createChannelMetadataEventMap";
import { inject, injectable } from "inversify";
import { useCache } from "../utils/cache";
import { nowSecondTimestamp } from "../utils/utils";
import { createBlackStaff } from "../views/ContentBlacklistView";

@injectable()
export class CahnnelMessageBeltline {
  static logger = logger;
  constructor(
    @inject(TYPES.RootEventBeltline)
    private rootEventBeltline: EventBeltline<{}>
  ) {}

  /**
   * 获取元数据
   *
   * @param eventId
   * @returns
   */
  getChannelMetadataBeltlineByChannelId(eventId: string) {
    return useCache(
      `getChannelMetadataBeltlineByChannelId:${eventId}`,
      () => {
        const metadataLine = createEventBeltlineReactive({
          describe: "getChannelMetadataBeltlineByChannelId",
          from: this.rootEventBeltline,
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
  getChannelMessageBeltline(eventId: string, opts?: { urls?: Set<string> }) {
    return useCache(
      `etChannelMessageBeltline:${eventId}`,
      () => {
        const line = createEventBeltlineReactive({
          describe: "getChannelMessageBeltline",
          from: this.rootEventBeltline,
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
          .addStaff(createEventSourceTracersForRefreshLoadStaff()) // 给刷新和加载添加源头追踪
          .addStaff(createDoNotRepeatStaff()) //过滤重复
          .addStaff(createFilterGreaterThanTheCurrenttimeStaff()) //非法创建时间
          .addStaff(createGarbageFilter()) //垃圾过滤器
          .addStaff(createBlackStaff()) // 文本黑名单

          .addStaffOfSortByCreateAt();

        setTimeout(() => {
          line.addExtends(
            line
              .createChild()
              .addRelayUrls(opts?.urls)
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
          line.feat.firstLoad();
        }, 0);

        return line;
      },
      {
        useLocalStorage: false,
      }
    );
  }
}
