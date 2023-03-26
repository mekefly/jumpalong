import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import {
  createDoNotRepeatStaff,
  createFilterGreaterThanTheCurrenttimeStaff,
} from "@/nostr/staff";
import createAutoCloseReqByLimit from "@/nostr/staff/createAutoCloseReqByLimit";
import createRefreshLoadStaff from "@/nostr/staff/createRefreshLoadStaff";
import { Filter } from "nostr-tools";
import { createGarbageFilter } from "../nostr/staff/createGarbageFilter";
import { useCache } from "../utils/cache";
import { createBlackStaff } from "../views/ContentBlacklistView";

const filterKind1: Filter = { kinds: [1] };
export function getShortTextEventBeltline(
  pubkeys?: string[],
  options?: { relayUrls?: Set<string>; filter: Filter }
) {
  console.log("options", options);

  logger.for().for("getGlobalShortTextEventBeltline").debug("pubkey", pubkeys);
  return useCache(
    `getGlobalShortTextEventBeltline:${JSON.stringify(pubkeys)}${JSON.stringify(
      options
    )}`,
    () => {
      const filter = {
        ...filterKind1,
        ...(pubkeys ? { authors: pubkeys } : undefined),
        ...options?.filter,
      };

      const limit = 30;
      const shortTextEventBeltline = createEventBeltlineReactive({
        describe: "获取短消息列表",
        slef: reactive({}),
      })
        // .addFilter(filter)
        .addStaff(createRefreshLoadStaff([filter]))
        .addStaff(createAutoCloseReqByLimit(limit))
        .addStaff(createDoNotRepeatStaff()) // 重复事件过滤器
        .addStaff(createBlackStaff()) // 黑名单过滤器
        .addStaff(createGarbageFilter()) // 垃圾邮件过滤器
        .addStaff(createFilterGreaterThanTheCurrenttimeStaff()) // 解决-n秒前的情况
        .addStaffOfReverseSortByCreateAt(); // 通过创建时间反排序

      if (pubkeys?.length === 0) return shortTextEventBeltline;
      shortTextEventBeltline.feat.load();

      setTimeout(() => {
        const line = shortTextEventBeltline
          // .createChild()
          // .addFilter({ ...filter, limit })
          // .addStaff(createEoseUnSubStaff())

          // .addStaff(autoAddRelayUrlByFilter())
          .addReadUrl()
          .addRelayUrls(options?.relayUrls);
        // .onAfterReq(() => {
        //   line.feat.stopAutoAddRelayUrlByFilter();
        // });

        // shortTextEventBeltline.addExtends(line);
      }, 1000);

      logger
        .for("getGlobalShortTextEventBeltline")
        .for("getGlobalShortTextEventBeltline缓存函数内部")
        .debug("options?.relayUrls", options?.relayUrls);

      return shortTextEventBeltline;
    },
    {
      useLocalStorage: false,
    }
  );
}
export function getReferenceMessage(eventId: string[]) {
  return getShortTextEventBeltline(undefined, {
    filter: {
      "#e": eventId,
    },
  });
}

export async function sendShortTextNote(
  content: string,
  options: {
    relayUrls?: Set<string>;
    event?: Partial<Event>;
  } = {}
) {
  rootEventBeltline.publish(
    {
      kind: 1,
      content,
      ...options?.event,
    },
    relayConfigurator.getWriteList() as any
  );
}
