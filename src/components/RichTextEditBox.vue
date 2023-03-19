<script lang="ts" setup>
import { createEvent } from "@/nostr/event";
import { createId, debounce } from "@/utils/utils";
import { Event, EventTemplate } from "nostr-tools";
import ContentVue from "./Content.vue";
import EmojiBoxVue from "./EmojiBox.vue";
import {
  useDragFileUpload,
  usePasteFile,
  useRichTextEditBoxOpt,
} from "./RichTextEditBox";
import RichTextEditBoxInputVue from "./RichTextEditBoxInput.vue";
import ScrollbarVue from "./Scrollbar.vue";
import { useUpload } from "./Upload";
import UploadButtonVue from "./UploadButton.vue";

const richTextEditBoxOpt = useRichTextEditBoxOpt();

console.debug("RichTextEditBox:隧道编号", richTextEditBoxOpt.id);

const emit = defineEmits<{
  (e: "send", event: EventTemplate): void;
}>();

const rawValue = ref("");
const event = ref<Event>(createEvent({}));

const isEnter = ref(false);
const isEdit = ref(false);

const target = ref(null as HTMLElement | null);
onClickOutside(target, (event) => {
  isEnter.value = false;
  isEdit.value = false;
});

function handleChange(str: string, options: { tags: string[][] }) {
  event.value = createEvent({
    content: str,
    tags: options.tags,
  });
}

function handleSend() {
  emit("send", event.value);
}
const handelLeave = debounce(() => {
  isEnter.value = false;
}, 5000);
const handleEnter = () => {
  handelLeave.clear?.();
  isEnter.value = true;
};
function handelBlur() {
  isEdit.value = false;
}
function handelClick(emoji: string) {
  rawValue.value += emoji;
}
const isShowEmojiBox = ref(false);
const upload = useUpload();
async function uploadFile(file: File) {
  const key = `$$${createId()}$$`;
  if (rawValue.value.length === 0) {
    rawValue.value += `${key}\n`;
  } else {
    rawValue.value += `\n${key}\n`;
  }

  const opt = await upload(file);

  rawValue.value = rawValue.value.replace(key, opt.url);
}

usePasteFile(target, uploadFile);

useDragFileUpload(target, uploadFile, {});
</script>

<template>
  <div
    class="w-full h-max box-border flex flex-col overflow-hidden flex-shrink-1"
    ref="target"
    :style="{
      maxHeight: isShowEmojiBox
        ? '100%'
        : isEnter || isShowEmojiBox
        ? '30em'
        : '10em',
      transition: 'max-height 300ms,min-height 300ms',
    }"
    @dblclick="() => (isEdit = true)"
    @mouseleave="handelLeave"
  >
    <div class="w-full flex-shrink-0 flex flex-col justify-between">
      <EmojiBoxVue :show="isShowEmojiBox" @click="handelClick" />
      <n-divider
        class="flex-shrink-0"
        :style="{
          marginBottom: '0.5em',
          marginTop: '0.5em',
        }"
      />
      <div class="flex justify-between">
        <div>
          <n-space>
            <n-button
              class="text-xl"
              quaternary
              @click="() => (isShowEmojiBox = !isShowEmojiBox)"
            >
              😁
            </n-button>

            <UploadButtonVue :upload="uploadFile" />
          </n-space>
        </div>

        <n-button :disabled="!event.content" type="primary" @click="handleSend">
          发送
        </n-button>
      </div>
    </div>
    <n-divider
      class="flex-shrink-0"
      :style="{
        marginBottom: '0.5em',
        marginTop: '0.5em',
      }"
    />
    <div class="flex-1 flex-shrink relative h-0" @mouseenter="handleEnter">
      <ScrollbarVue>
        <div v-show="!isEdit && event.content">
          <ContentVue :event="event" />
        </div>
        <RichTextEditBoxInputVue
          v-model:rawValue="rawValue"
          v-show="isEdit || !event.content"
          @blur="handelBlur"
          @change="handleChange"
        />
      </ScrollbarVue>
    </div>
  </div>
</template>

<style scoped></style>
