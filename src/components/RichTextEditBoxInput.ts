import ReplaceableEventMap from "@/nostr/ReplaceableEventMap";
import {
  ChannelMetadata,
  parseMetadata,
} from "@/nostr/staff/createUseChannelMetadata";
import { deserializeTagR, getRootTagE } from "@/nostr/tag";
import { defaultCacheOptions, getCache, setCache } from "@/utils/cache";
import { CacheOptions } from "@/utils/cache/types";
import { MaybeRef } from "@vueuse/core";
import { MentionOption } from "naive-ui";
import { Event } from "nostr-tools";
import { useRichTextEditBoxOpt } from "./RichTextEditBox";
type UserMap = Map<string, { event: Event; metadata: ChannelMetadata }>;
export function useUserOpt() {
  const userMap = new Map<
    string,
    { event: Event; metadata: ChannelMetadata }
  >();
  const userRefMentionOption: MentionOption[] = reactive([]);
  const Kind0eventMap = ReplaceableEventMap.kind0.getAll();
  for (const pubkey in Kind0eventMap) {
    const event = Kind0eventMap[pubkey];
    const metadata = parseMetadata(event);

    const name = metadata.name ?? (event.pubkey?.slice(8) as string);
    const encodeName = encodeURI(name);
    userMap.set(encodeName, {
      event,
      metadata: metadata,
    });
    userRefMentionOption.push({
      label: name,
      value: encodeName,
      key: event.pubkey,
    });
  }
  return { userRefMentionOption, userMap };
}
type EventMentionOption = MentionOption[];
type EventMap = Map<
  string,
  { event: Event; marker: "marker" | "reply" | "mention" }
>;
export function useEventRef(value: Ref<string>) {
  const eventMap: EventMap = new Map();
  const eventMentionOption: EventMentionOption = [];
  function addEventMentionOption(e: Event) {
    const { content, id } = e;
    eventMentionOption.push({
      label: content.slice(0, 20),
      value: `${createMapKey(e)}`,
      key: id,
    });
  }
  function addEvent(e: Event) {
    eventMap.set(createMapKey(e), { event: e, marker: "reply" });
    addEventMentionOption(e);
  }
  function replyEvent(e: Event) {
    if (value.value === "") value.value += `&${createMapKey(e)}\n`;
    else value.value += `\n&${createMapKey(e)}\n`;
    addEvent(e);
  }
  function createMapKey(event: Event) {
    return `${event.id}`;
  }

  return {
    eventMap,
    eventMentionOption,
    replyEvent,
    addEvent,
  };
}

export type SourceOptions = {
  userMap: Record<
    string,
    {
      event: Event;
      metadata: ChannelMetadata;
    }
  >;
  eventMap: Record<
    string,
    {
      event: Event;
      marker: "reply" | "marker" | "mention";
    }
  >;
  value: string;
  tags: string[][];
};
export function useParseTagsFunction(userMap: UserMap, eventMap: EventMap) {
  function parseTags(text: string) {
    const sourceOptions: SourceOptions = {
      userMap: {},
      eventMap: {},
      value: text,
      tags: [] as string[][],
    };
    const { tags } = sourceOptions;
    const postMessage = text.replace(/@\S+|(\s|^)#\S+|&\S+/g, (str) => {
      const prefix = str[0];
      let name = str.slice(1);
      switch (prefix) {
        case "@":
          //人
          const userDataOpt = userMap.get(name);
          if (!userDataOpt) return str;
          sourceOptions.userMap[name] = userDataOpt;
          const s = deserializeTagR(userDataOpt.event.tags);
          tags.push(["p", userDataOpt.event.pubkey, [...s][0]]);
          return `#[${tags.length - 1}]`;
        case "\n":
        case " ":
          name = name.slice(1);
        case "#":
          tags.push(["t", name]);
          return `#[${tags.length - 1}]`;
        case "&":
          const eventDataOpt = eventMap.get(name);
          if (!eventDataOpt) return str;
          sourceOptions.eventMap[name] = eventDataOpt;
          // 被回复事件所在的中续地址
          const s1 = [...deserializeTagR(eventDataOpt.event.tags)];

          //添加回复到的中继
          s1.forEach((u) => tags.push(["r", u]));

          //添加roottags
          const rootTag = getRootTagE(eventDataOpt.event.tags);
          rootTag && tags.push(rootTag);

          //添加回复人
          tags.push([
            "p",
            eventDataOpt.event.pubkey,
            [...s1][0],
            eventDataOpt.marker,
          ]);

          //添加回复
          tags.push([
            "e",
            eventDataOpt.event.id,
            [...s1][0],
            eventDataOpt.marker,
          ]);
          return `#[${tags.length - 1}]`;
        default:
          return str;
      }
    });
    return [postMessage, tags, sourceOptions] as const;
  }
  return parseTags;
}

const cacheOptions: CacheOptions = {
  ...defaultCacheOptions,
  duration: 1000 * 60 * 60,
};
export function useCacheTextValue(
  userMap: MaybeRef<UserMap>,
  eventMap: MaybeRef<EventMap>,
  value: Ref<string>
) {
  const prefix = "rich-text-source-options";
  const richTextEditBoxOpt = useRichTextEditBoxOpt();
  watch(
    () => richTextEditBoxOpt.id,
    () => {
      try {
        const c = getCache(
          `${prefix}:${richTextEditBoxOpt.id}`,
          cacheOptions
        ) as SourceOptions;

        for (const [key, opt] of Object.entries(c.userMap)) {
          unref(userMap).set(key, opt);
        }
        for (const [key, opt] of Object.entries(c.eventMap)) {
          unref(eventMap).set(key, opt);
        }
        value.value = c.value;
      } catch (error) {}
    },
    {
      immediate: true,
    }
  );

  function changeSourceCache(sourceOptions: SourceOptions) {
    setCache(`${prefix}:${richTextEditBoxOpt.id}`, sourceOptions, cacheOptions);
  }
  return { changeSourceCache };
}
