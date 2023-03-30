<script lang="ts" setup>
import ReplaceableEventMap from "@/nostr/ReplaceableEventMap";
import { parseMetadata } from "@/nostr/staff/createUseChannelMetadata";
import { matchTagPlaceholderRegExp, matchUrlRegExp } from "@/utils/RegExpUtils";
import { isNumberAndNotNaN } from "@/utils/utils";
import { Event, nip19 } from "nostr-tools";
import ContentReplyItemVue from "./ContentReplyItem.vue";
import ContentWebsiteVue from "./ContentWebsite.vue";
import UserLinkVue from "./UserLink.vue";

const props = defineProps<{ event: Event; contenteditable?: boolean }>();
const { event, contenteditable } = toRefs(props);

function parseTag(mark: string, markIndex: string, tags: string[][]) {
  const index = parseInt(markIndex);

  if (!isNumberAndNotNaN(index)) return ["text", mark];
  const tag = tags[index];
  if (!tag) return ["text", mark];
  const data = tag[1];
  if (!data) return ["text", mark];

  switch (tag[0]) {
    case "p":
      const pubkey = data;
      const event = ReplaceableEventMap.kind0.get(pubkey);
      const nprofilte = nip19.nprofileEncode({ pubkey: data });
      if (event) {
        const metadata = parseMetadata(event);

        return ["p", `@${metadata.name}`, nprofilte] as const;
      }

      return ["p", `@${nprofilte}`, nprofilte] as const;
    case "e":
      const nevent = nip19.neventEncode({ id: data });
      return ["e", nevent, tag] as const;
    case "t":
      return ["t", `#${data}`, ""] as const;
    default:
      return ["text", mark] as const;
  }
}
function parseText(text: string, cols: Array<[string, string, ...any[]]>) {
  if (!text) return;

  let last = 0;
  const regExpStringIterator =
    matchTagPlaceholderRegExp()[Symbol.matchAll](text);
  for (const regExpMatchArray of regExpStringIterator) {
    let index = regExpMatchArray["index"];
    let mark = regExpMatchArray[0] as string;
    let markIndex = regExpMatchArray[1] as string;

    //push mark
    cols.push(parseTag(mark, markIndex, event.value.tags) as any);

    // 判断非数字和nan
    if (!isNumberAndNotNaN(index)) continue;
    //间隔部分两个标签之间的文本 #[0]
    if (index - last > 0) {
      cols.push(["text", text.slice(last, index)]);
    }

    last = index + mark.length;
  }

  //结尾部分
  if (text.length - last > 0) {
    cols.push(["text", text.slice(last)]);
  }
}
function parseRow(
  text: string,
  rows: Array<Array<[string, string, ...any[]]>>
) {
  text.split("\n").forEach((row) => {
    if (!row) {
      rows.push([["enter", ""]]);
      return;
    }
    const cols: Array<[string, string, ...any[]]> = [];

    const regExpStringIterator = matchUrlRegExp()[Symbol.matchAll](row);
    let last = 0;
    for (const regExpMatchArray of regExpStringIterator) {
      let index = regExpMatchArray["index"];
      let url = regExpMatchArray[0] as string;

      //url部分
      if (
        [".jpg", ".jpeg", ".png", ".gif", ".bmp"].some((suffix) =>
          url.endsWith(suffix)
        )
      ) {
        cols.push(["img", url, url]);
      } else if (
        [".mov", ".mp4", ".av1"].some((suffix) => url.endsWith(suffix))
      ) {
        cols.push(["video", url, url]);
      } else {
        if (row === url) {
          cols.push(["website", url, url]);
        } else {
          cols.push(["url", url, url]);
        }
      }

      // 判断非数字和nan
      if (!isNumberAndNotNaN(index)) continue;
      //间隔部分
      if (index - last > 0) {
        parseText(row.slice(last, index), cols);
      }

      // url last更新
      last = index + url.length;
    }

    //间隔部分
    if (row.length - last > 0) {
      parseText(row.slice(last), cols);
    }

    rows.push(cols);
  });
}

const rows = computed(() => {
  const rows: any[] = [];
  parseRow(event.value.content, rows);
  return rows;
});
// const [target, isShow] = useLazyShow(400);
</script>

<template>
  <div class="w-full" ref="target">
    <!-- <n-spin  class="w-full h-64" /> -->
    <div>
      <div
        v-for="row in rows"
        :key="row"
        class="w-full flex flex-wrap justify-start items-start"
      >
        <span
          v-for="item in row"
          :key="item[1]"
          class="flex justify-start items-start"
          :class="{
            'w-full': ['e', 'website', 'img', 'video'].some(
              (v) => item[0] === v
            ),
          }"
        >
          <div v-if="item[0] === 'img'">
            <n-image class="img w-full" :src="item[1]" />
          </div>
          <div v-else-if="item[0] === 'video'" class="p-0 m-0 w-full h-auto">
            <video
              controls
              class="overflow-hidden rounded-2xl w-full m-0 p-0 h-auto"
            >
              <source :src="item[1]" />
            </video>
          </div>
          <ContentWebsiteVue
            v-else-if="item[0] === 'website'"
            :key="item[1]"
            :src="item[1]"
          />
          <a v-else-if="item[0] === 'url'" class="break-words" :href="item[2]">
            {{ item[1] }}
          </a>

          <UserLinkVue v-else-if="item[0] === 'p'" :value="item[2]" />
          <ContentReplyItemVue
            v-else-if="item[0] === 'e'"
            :event="event"
            :nevent="item[1]"
            :tag="item[2]"
          />
          <a
            v-else-if="item[0] === 'url'"
            class="break-words block"
            :style="{
              'word-break': 'break-all',
              'text-overflow': 'ellipsis',
              'word-wrap': 'break-word',
            }"
            :href="item[2]"
          >
            {{ item[1] }}
          </a>
          <br v-else-if="item[0] === 'enter'" class="break-words block" />
          <span
            v-else
            class="flex"
            style="
              table-layout: fixed;
              word-break: break-all;
              word-wrap: break-word;
            "
            v-text="item[1].replace(' ', '&nbsp')"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img :deep() img {
  width: 100%;
}
.break-words {
  word-wrap: break-word;
}
</style>
