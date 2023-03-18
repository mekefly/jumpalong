import ReplaceableEventMap from "@/nostr/ReplaceableEventMap";
import {
  ChannelMetadata,
  parseMetadata,
} from "@/nostr/staff/createUseChannelMetadata";
import { deserializeTagR, getRootTagE } from "@/nostr/tag";
import { MentionOption } from "naive-ui";
import { Event } from "nostr-tools";
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
    userMap.set(name, {
      event,
      metadata: metadata,
    });
    userRefMentionOption.push({ label: name, value: name, key: event.pubkey });
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

export function useParseTagsFunction(userMap: UserMap, eventMap: EventMap) {
  function parseTags(text: string) {
    const tags: string[][] = [];
    const postMessage = text.replace(/@\S+|(\s|^)#\S+|&\S+/g, (str) => {
      const prefix = str[0];
      let name = str.slice(1);
      switch (prefix) {
        case "@":
          //人
          const data = userMap.get(name);
          if (!data) return str;
          const s = deserializeTagR(data.event.tags);
          tags.push(["p", data.event.pubkey, [...s][0]]);
          return `#[${tags.length - 1}]`;
        case "\n":
        case " ":
          name = name.slice(1);
        case "#":
          tags.push(["t", name]);
          return `#[${tags.length - 1}]`;
        case "&":
          const data1 = eventMap.get(name);
          if (!data1) return str;
          // 被回复事件所在的中续地址
          const s1 = [...deserializeTagR(data1.event.tags)];

          //添加回复到的中继
          s1.forEach((u) => tags.push(["r", u]));

          //添加roottags
          const rootTag = getRootTagE(data1.event.tags);
          rootTag && tags.push(rootTag);

          //添加回复人
          tags.push(["p", data1.event.pubkey, [...s1][0], data1.marker]);

          //添加回复
          tags.push(["e", data1.event.id, [...s1][0], data1.marker]);
          return `#[${tags.length - 1}]`;
        default:
          return str;
      }
    });
    return [postMessage, tags] as const;
  }
  return parseTags;
}
