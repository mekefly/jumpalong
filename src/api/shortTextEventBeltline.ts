import {
  CreateEventBeltlineOptions,
  createEventBeltlineReactive,
} from "@/nostr/createEventBeltline";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import {
  createDoNotRepeatStaff,
  createFilterGreaterThanTheCurrenttimeStaff,
} from "@/nostr/staff";
import autoAddRelayUrlByFilter from "@/nostr/staff/autoAddRelayUrlByFilter";
import autoAddRelayurlByPubkeyStaff from "@/nostr/staff/autoAddRelayurlByPubkeyStaff";
import createRefreshLoadStaff, {
  createEventSourceTracersForRefreshLoadStaff,
} from "@/nostr/staff/createRefreshLoadStaff";
import { withDefault } from "@/utils/utils";
import { Event, Filter } from "nostr-tools";
import { createGarbageFilter } from "../nostr/staff/createGarbageFilter";
import { useCache } from "../utils/cache";
import { createBlackStaff } from "../views/ContentBlacklistView";

const filterKind1: Filter = { kinds: [1] };

export type CreateTextEventBeltlineOption = CreateEventBeltlineOptions & {
  filters: Filter[];
  urls?: Set<string>;
  addUrls?: Set<string>;
  limit?: number;
  pubkeys?: string[];
};
export function createTextEventBeltline(opts: CreateTextEventBeltlineOption) {
  return useCache(
    `createShortTextEventBeltline:${JSON.stringify(opts.filters)}`,
    () => {
      const limit = opts.limit ?? 10;
      const filters = opts.filters;

      const textEventBeltline = createEventBeltlineReactive(
        withDefault(opts, {
          describe: "获取短消息列表",
        })
      )
        .addStaff(createDoNotRepeatStaff()) // 重复事件过滤器
        .addStaff(createBlackStaff()) // 黑名单过滤器
        .addStaff(createGarbageFilter()) // 垃圾邮件过滤器
        .addStaff(createFilterGreaterThanTheCurrenttimeStaff()) // 过滤掉-n秒前的情况
        .addStaff(createRefreshLoadStaff(filters, limit)) //添加刷新和加载功能
        .addStaff(createEventSourceTracersForRefreshLoadStaff()) // 给刷新和加载添加源头追踪
        .addStaffOfReverseSortByCreateAt(); // 通过创建时间反排序

      textEventBeltline
        .addReadUrl()
        .addRelayUrls(opts.urls)
        .addRelayUrls(opts.addUrls);

      opts.urls || textEventBeltline.addStaff(autoAddRelayUrlByFilter());

      for (const pubkey of opts.pubkeys ?? []) {
        textEventBeltline.addStaff(autoAddRelayurlByPubkeyStaff(pubkey));
      }
      textEventBeltline.feat.firstLoad();

      return textEventBeltline;
    },
    {
      useLocalStorage: false,
    }
  );
}

export function getShortTextEventBeltline(
  pubkeys: string[],
  options?: { relayUrls?: Set<string>; filter: Filter }
) {
  const filters = pubkeys?.map((pubkey) => {
    return {
      kinds: [1],
      authors: [pubkey],
    } as Filter;
  });
  return createTextEventBeltline({
    filters,
  });
}

export function getReferenceMessage(eventId: string[]) {
  return createTextEventBeltline({
    filters: [
      {
        "#e": eventId,
        kinds: [1],
      },
    ],
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
