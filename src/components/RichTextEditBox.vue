<script lang="ts" setup>
import { createEvent } from "@/nostr/event";
import { debounce } from "@/utils/utils";
import { Event, EventTemplate } from "nostr-tools";
import ContentVue from "./Content.vue";
import RichTextEditBoxInputVue from "./RichTextEditBoxInput.vue";
import ScrollbarVue from "./Scrollbar.vue";

const emit = defineEmits<{
  (e: "send", event: EventTemplate): void;
}>();

const event = ref<Event>(
  createEvent({
    kind: 1,
  })
);
const isEnter = ref(false);
const isEdit = ref(false);

const target = ref(null);
onClickOutside(target, (event) => {
  isEdit.value = false;
});

function handleChange(str: string, options: { tags: string[][] }) {
  event.value = createEvent({
    content: str,
    tags: options.tags,
  });
  console.log("event", event.value);
}

function handleSend() {
  emit("send", event.value);
}
const handelLeave = debounce(() => {
  isEnter.value = false;
}, 200);
const handleEnter = () => {
  handelLeave.clear?.();
  isEnter.value = true;
};
function handelBlur() {
  isEdit.value = false;
}
</script>

<template>
  <!-- <n-space vertical> -->
  <div
    class="w-full h-max box-border flex flex-col overflow-hidden"
    ref="target"
    :style="{
      maxHeight: isEnter ? '30em' : '10em',
      // minHeight: isEnter && !isEdit ? '20em' : '8em',
      transition: 'max-height 300ms,min-height 300ms',
    }"
    @dblclick="() => (isEdit = true)"
    @mouseenter="handleEnter"
    @mouseleave="handelLeave"
  >
    <n-divider
      class="flex-shrink-0"
      :style="{
        marginBottom: '0.5em',
        marginTop: '0.5em',
      }"
    />
    <div class="flex-1 flex-shrink relative h-0">
      <ScrollbarVue>
        <div v-show="!isEdit && event.content">
          <ContentVue :event="event" />
        </div>
        <RichTextEditBoxInputVue
          v-show="isEdit || !event.content"
          @blur="handelBlur"
          @change="handleChange"
        />
      </ScrollbarVue>
    </div>
    <div class="w-full flex-shrink-0 flex justify-end pt-2">
      <n-button type="primary" @click="handleSend">发送</n-button>
    </div>
  </div>
</template>

<style scoped></style>
