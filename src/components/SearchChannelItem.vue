<script lang="ts" setup>
import { parseMetadata } from "@/nostr/staff/createUseChannelMetadata";
import { getTagEOfFirst } from "@/nostr/tag";
import { Event } from "nostr-tools";
import EllipsisVue from "./Ellipsis.vue";

const props = defineProps<{
  event: Event;
}>();
const { event } = toRefs(props);
const metadata = computed(() => event.value && parseMetadata(event.value));
const eventId = computed(() => {
  if (event.value.kind === 40) {
    return event.value.id;
  } else if (event.value.kind === 41) {
    const tag = getTagEOfFirst(event.value.tags);
    if (!tag) return;
    const id = tag[1];
    return id;
  }
});
</script>

<template>
  <div
    class="flex flex-col"
    @click="
      () =>
        eventId &&
        $router.push({
          name: 'channel-message',
          params: { eventId: eventId },
        })
    "
  >
    <div class="font-bold">
      <EllipsisVue>
        {{ metadata.name ?? (eventId && eventId.slice(0, 10)) }}
      </EllipsisVue>
    </div>
    <div v-if="metadata.about" class="w-full">
      <EllipsisVue class="w-full">
        <small>
          {{ metadata.about }}
        </small>
      </EllipsisVue>
    </div>
  </div>
</template>

<style scoped></style>
