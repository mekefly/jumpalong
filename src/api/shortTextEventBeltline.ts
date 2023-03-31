import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import {
  createDoNotRepeatStaff,
  createFilterGreaterThanTheCurrenttimeStaff,
} from "@/nostr/staff";
import createEventSourceTracers from "@/nostr/staff/createEventSourceTracers";
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

      const shortTextEventBeltline = createEventBeltlineReactive({
        describe: "获取短消息列表",
        slef: reactive({}),
      })
        .addStaff(createDoNotRepeatStaff()) // 重复事件过滤器
        .addStaff(createBlackStaff()) // 黑名单过滤器
        .addStaff(createGarbageFilter()) // 垃圾邮件过滤器
        .addStaff(createFilterGreaterThanTheCurrenttimeStaff()) // 过滤掉-n秒前的情况
        .addStaff(createRefreshLoadStaff([filter])) //添加刷新和加载功能
        .addStaffOfReverseSortByCreateAt(); // 通过创建时间反排序
      shortTextEventBeltline.feat.loadBufferOpt.bufferLine.addStaff(
        createEventSourceTracers(),
        { unshift: true }
      );
      shortTextEventBeltline.feat.refreshBufferOpt.bufferLine.addStaff(
        createEventSourceTracers(),
        { unshift: true }
      );

      if (pubkeys?.length === 0) return shortTextEventBeltline;

      shortTextEventBeltline.addReadUrl().addRelayUrls(options?.relayUrls);
      shortTextEventBeltline.feat.load();

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
