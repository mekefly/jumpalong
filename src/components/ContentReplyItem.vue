<script lang="ts" setup>
import { TYPES } from "@/nostr/nostr";
import { getSourceUrls } from "@/nostr/staff/createEventSourceTracers";
import { toDeCodeNevent } from "@/utils/nostr";
import { setAdds } from "@/utils/utils";
import { Event } from "nostr-tools";
import { useNostrContainerGet } from "./NostrContainerProvade";
import PapawVue from "./Papaw.vue";

const props = defineProps<{
  value: string;
  tag?: string[];
  event: Event;
}>();
const { value, tag, event } = toRefs(props);

const eventApi = useNostrContainerGet(TYPES.EventApi);

const relayUrls = computed(() => {
  const urls = new Set<string>();
  if (tag?.value) {
    const r = tag.value[2];
    r && urls.add(r);
  }

  const sourceUrls = getSourceUrls(event.value.id);
  setAdds(urls, sourceUrls);

  return urls;
});
const marker = computed<"reply" | "root" | "mention">(
  () => (tag?.value ? tag.value[3] ?? "reply" : "mention") as any
);
const neventOpt = computed(() => toDeCodeNevent(value.value));
const line = computed(() => {
  if (!neventOpt.value) return;
  if (marker.value !== "reply" && marker.value !== "mention") return;
  return eventApi.getEventLineById(neventOpt.value.id, {
    urls: relayUrls.value,
  });
});
const replyEvent = computed(() => line.value?.feat.useEvent());
</script>

<template>
  <PapawVue
    class="w-full"
    disabledReply
    v-if="replyEvent"
    :event="replyEvent"
    :deleteEvent="() => {}"
  />
  <router-link
    v-else-if="marker === 'mention' || marker === 'reply'"
    :to="{ name: 'short-text-note', params: { value: value } }"
  >
    &{{ value }}
  </router-link>
</template>

<style scoped></style>
