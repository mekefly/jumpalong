<script lang="ts" setup>
import ReplaceableEventMap from "@/nostr/ReplaceableEventMap";
import { parseMetadata } from "@/nostr/staff/createUseChannelMetadata";
import { Event, nip19 } from "nostr-tools";
import { computed } from "vue";

const props = defineProps<{ event: Event; contenteditable?: boolean }>();
const { event, contenteditable } = toRefs(props);

const list = computed(() => {
  return event.value.content
    .split("\n")
    .map((row) => {
      if (["http://", "https://"].some((v) => row.startsWith(v))) {
        if ([".jpg", ".png", ".gif"].some((v) => row.endsWith(v))) {
          return [["img", row]];
        } else {
          // https://xxx.com 这种不应该预览
          if (!(row.split(" ").length > 1)) {
            return [["website", row]];
          }
        }
      }
      let lest = 0;
      let list: string[] = [];
      row.replace(/#\[\d+\]/g, ((str: string, index: number) => {
        list.push(row.slice(lest, index));
        list.push(str);
        lest = index + str.length;
      }) as any);
      if (list.length === 0) {
        return [["text", row]];
      }
      let ll: [string, string][] = [];
      list.forEach((item, index) => {
        if (index % 2 === 0) {
          if (!item) {
            return;
          }
          ll.push(["text", item]);
        } else {
          ll.push(insertTag(item, event.value.tags) as any);
        }
      });

      return ll;
    })
    .flat(1);
});
function insertTag(mark: string, tags: string[][]) {
  const i = parseInt(mark.slice(2, 3));
  if (!i) return ["text", mark];
  const tag = tags[i];
  if (!tag) return ["text", mark];
  const data = tag[1];
  if (!data) return ["text", mark];

  switch (tag[0]) {
    case "p":
      const pubkey = data;
      const event = ReplaceableEventMap.kind0.getEvent(pubkey);
      const nprofilte = nip19.nprofileEncode({ pubkey: data });
      if (event) {
        const xx = parseMetadata(event);

        return ["p", `@${xx.name}`, nprofilte];
      }

      return ["p", `@${nprofilte}`, nprofilte];
    case "e":
      const nevent = nip19.neventEncode({ id: data });
      return ["e", `&${nevent}`, nevent];
    case "t":
      return ["t", `#${data}`, ""];
    default:
      return ["text", mark];
  }
}
</script>

<template>
  <div v-for="item in list">
    <div
      class="flex w-full items-center max-h-screen rounded-2xl overflow-hidden"
      v-if="item[0] === 'img'"
    >
      <n-image class="img w-full" :src="item[1]" />
    </div>

    <a class="break-words" v-else-if="item[0] === 'website'" :href="item[1]">{{
      item[1]
    }}</a>
    <a class="break-words" v-else-if="item[0] === 'url'" :href="item[2]">{{
      item[1]
    }}</a>
    <router-link
      v-if="item[0] === 'p'"
      :to="{ name: 'profile', params: { value: item[2] } }"
      >{{ item[1] }}</router-link
    >
    <router-link
      v-if="item[0] === 'e'"
      :to="{ name: 'short-text-note', params: { value: item[2] } }"
      >{{ item[1] }}</router-link
    >
    <a class="break-words" v-else-if="item[0] === 'url'" :href="item[2]">{{
      item[1]
    }}</a>
    <div
      class="flex"
      style="table-layout: fixed; word-break: break-all; word-wrap: break-word"
      v-else
    >
      {{ item[1] }}
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
