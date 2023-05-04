import ReplaceableEventMap from "@/nostr/eventMap/LocalMap";
import { parseMetadata } from "@/nostr/staff/createUseChannelMetadata";
import { deserializeTagR, getRootTagE } from "@/nostr/tag";
import { ChannelMetadata } from "@/types/ChannelMetadata";
import {
  defaultCacheOptions,
  deleteCache,
  getCache,
  setCache,
} from "@/utils/cache";
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
  const Kind0eventMap = ReplaceableEventMap.kind0.allMap();

  for (const pubkey in Kind0eventMap) {
    const event = Kind0eventMap[pubkey];
    const metadata = parseMetadata(event);

    const name =
      metadata.displayName ??
      metadata.name ??
      (event.pubkey?.slice(8) as string);
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
export type Marker = "root" | "reply" | "mention";
type EventMap = Map<string, { event: Event; marker: Marker }>;
export function useEventRef(value: Ref<string>) {
  const eventMap: EventMap = new Map();
  const relaysTags = ref([] as string[][]);

  const eventMentionOption: EventMentionOption = [];
  function addEventMentionOption(e: Event) {
    const { content, id } = e;
    eventMentionOption.push({
      label: content.slice(0, 20),
      value: `${createMapKey(e)}`,
      key: id,
    });
  }
  function addEvent(e: Event, marker: Marker) {
    eventMap.set(createMapKey(e), { event: e, marker });
    addEventMentionOption(e);
  }
  function replyEvent(e: Event) {
    //只能回复一人
    relaysTags.value = [];
    //直接被被回复的事件
    relaysTags.value.push(["e", e.id]);
    //直接被回复的用户
    relaysTags.value.push(["p", e.pubkey]);
    //创建根标签
    relaysTags.value.push(getRootTagE(e.tags) ?? ["e", e.id, "", "root"]);

    //被回复事件的直接回复变为提及，添加被回复事件的直接提及
    relaysTags.value.push(
      ...e.tags
        .filter(
          (tag) => tag[0] === "e" && tag[1] && (!tag[3] || tag[3] === "reply")
        )
        .map((tag) => [tag[0], tag[1], tag[2] ?? "", "mention"])
    );

    //被提及的用户列表
    relaysTags.value.push(
      ...e.tags
        .filter((tag) => tag[0] === "p" && tag[1])
        //将null过滤掉
        .map((tag) => tag.map((item) => item ?? ""))
    );
    //被提到的所有中继
    relaysTags.value.push(
      ...e.tags
        .filter((tag) => tag[0] === "r" && tag[1])
        //将null过滤掉
        .map((tag) => tag.map((item) => item ?? ""))
    );
  }
  function mentionEvent(e: Event) {
    if (value.value === "") value.value += `&${createMapKey(e)}\n`;
    else value.value += `\n&${createMapKey(e)}\n`;
    addEvent(e, "mention");
  }
  function createMapKey(event: Event) {
    return `${event.id}`;
  }

  return {
    eventMap,
    eventMentionOption,
    replyEvent,
    relaysTags,
    addEvent,
    mentionEvent,
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
      marker: Marker;
    }
  >;
  value: string;
  tags: string[][];
  replyTags: string[][];
};
export function useParseTagsFunction(
  userMap: UserMap,
  eventMap: EventMap,
  relaysTags: Ref<string[][]>
) {
  function parseTags(text: string) {
    const sourceOptions: SourceOptions = {
      userMap: {},
      eventMap: {},
      value: text,
      tags: [] as string[][],
      replyTags: relaysTags.value,
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
          const event = eventDataOpt.event;
          // 被回复引用所在的中续地址
          const s1 = [...deserializeTagR(eventDataOpt.event.tags)];

          //添加引用到的中继
          s1.forEach((u) => tags.push(["r", u]));

          //添加引用
          tags.push([
            "e",
            eventDataOpt.event.id,
            [...s1][0] ?? "",
            eventDataOpt.marker,
          ]);
          const place = tags.length - 1;

          //添加引用通知者
          tags.push([
            "p",
            eventDataOpt.event.pubkey,
            [...s1][0] ?? "",
            "mention",
          ]);

          //所有回复变引用
          tags.push(
            ...event.tags
              .filter((tag) => tag[0] === "e")
              .map((tag) => ["e", tag[1], tag[2], "mention"])
          );
          //所有提及人
          tags.push(...event.tags.filter((tag) => tag[0] === "p"));

          return `#[${place}]`;
        default:
          return str;
      }
    });
    tags.push(...sourceOptions.replyTags);
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
  value: Ref<string>,
  replyTags: Ref<string[][]>
) {
  const prefix = "rich-text-source-options";
  const richTextEditBoxOpt = useRichTextEditBoxOpt();
  watch(
    () => richTextEditBoxOpt.id,
    () => {
      try {
        const c = getCache(createCacheKey(), cacheOptions) as SourceOptions;

        for (const [key, opt] of Object.entries(c.userMap)) {
          unref(userMap).set(key, opt);
        }
        for (const [key, opt] of Object.entries(c.eventMap)) {
          unref(eventMap).set(key, opt);
        }
        value.value = c.value;
        replyTags.value = c.replyTags;
      } catch (error) {}
    },
    {
      immediate: true,
    }
  );

  function changeSourceCache(sourceOptions: SourceOptions) {
    setCache(createCacheKey(), sourceOptions, cacheOptions);
  }
  function createCacheKey() {
    return `${prefix}:${richTextEditBoxOpt.id}`;
  }
  function clearCache() {
    deleteCache(createCacheKey());
  }
  return { changeSourceCache, clearCache };
}
