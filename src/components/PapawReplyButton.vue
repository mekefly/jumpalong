<script lang="ts" setup>
import { createTextEventBeltline } from "@/api/shortTextEventBeltline";
import { getSourceUrls } from "@/nostr/staff/createEventSourceTracers";
import { useLazyComponent } from "@/utils/use";
import { usePushShortTextNote } from "@/views/ShortTextNoteView";
import { Event } from "nostr-tools";
import MessageOutlinedVue from "./icon/MessageOutlined.vue";

const props = defineProps<{
  event: Event;
  size: number;
}>();

const { event } = toRefs(props);
const pushShortTextNote = usePushShortTextNote();
function handelPushShortTextNote() {
  pushShortTextNote(event.value);
}
const limit = 20;
const urls = computed(() => getSourceUrls(event.value.id));
const [textEventbeltline, target] = useLazyComponent(() => {
  return createTextEventBeltline({
    filters: [
      {
        "#e": [event.value.id],
        kinds: [1, 30023],
      },
    ],
    addUrls: new Set(urls.value),
    limit,
  });
});
const length = computed(() => {
  return textEventbeltline.value?.getList().length ?? 0;
});
</script>

<template>
  <div ref="target">
    <n-button text @click="handelPushShortTextNote">
      <n-icon :size="size">
        <MessageOutlinedVue />
      </n-icon>
      <span class="ml-2">
        {{ length }}
        <span v-if="length >= limit">+</span>
      </span>
    </n-button>
  </div>
</template>

<style scoped></style>
