<script lang="ts" setup>
import { getEventLineById } from "@/api/event";
import { toDeCodeNevent } from "@/utils/nostr";
import { Event } from "nostr-tools";
import PapawVue from "./Papaw.vue";

const props = defineProps<{
  nevent: string;
  tag: string[];
  event: Event;
}>();
const { nevent, tag, event } = toRefs(props);
const relayUrls = computed(() => {
  const urls = new Set<string>();
  const r = tag.value[2];
  r && urls.add(r);
  return urls;
});
const marker = computed<"reply" | "root" | "mention">(
  () => (tag.value[3] ?? "reply") as any
);
const neventOpt = computed(() => toDeCodeNevent(nevent.value));
const line = computed(() => {
  if (!neventOpt.value) return;
  if (marker.value !== "reply" && marker.value !== "mention") return;
  return getEventLineById(neventOpt.value.id, { url: relayUrls.value });
});
const replyEvent = computed(() => line.value?.feat.useEvent());
</script>

<template>
  <PapawVue
    class="w-full"
    v-if="replyEvent"
    :event="replyEvent"
    :deleteEvent="() => {}"
  />
  <router-link
    v-else-if="marker === 'mention' || marker === 'reply'"
    :to="{ name: 'short-text-note', params: { value: nevent } }"
  >
    &{{ nevent }}
  </router-link>
</template>

<style scoped></style>
