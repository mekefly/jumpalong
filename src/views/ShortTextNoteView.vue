<script lang="ts" setup>
import { providePapawFocus } from "@/components/Papaw";
import Papaw from "@/components/Papaw.vue";
import PapawTreeAutoFindParent from "@/components/PapawTreeAutoFindRoot.vue";
import PostList from "@/components/PostList.vue";
import { useRichTextEditBoxOpt } from "@/components/RichTextEditBox";
import RichTextEditBoxVue from "@/components/RichTextEditBox.vue";
import ScrollbarVue from "@/components/Scrollbar.vue";
import { config } from "@/nostr/nostr";
import { deserializeTagR } from "@/nostr/tag";
import { useHandleSendMessage } from "@/utils/use";
import { Event, EventTemplate } from "nostr-tools";
import { useEvent } from "./ShortTextNoteView";

//需要为显示区域和编辑区域架设一个隧道

const event = useEvent();
const eventId = computed(() => event.value?.id ?? "default");

const richTextEditBoxOpt = useRichTextEditBoxOpt(eventId);
watch(
  event,
  async () => {
    if (!event.value) return;

    await nextTick();
    richTextEditBoxOpt.emitRichTextEditBox("reply", event.value);
  },
  {
    immediate: true,
  }
);

const urls = computed<Set<string>>(() => {
  if (!event.value) return new Set();
  return deserializeTagR(event.value?.tags);
});
const pushEvent = ref<undefined | ((e: Event) => void)>(undefined);

const handleSendEvent = useHandleSendMessage(1, undefined, pushEvent, {
  urls: urls,
});
function handleSend(e: EventTemplate) {
  handleSendEvent(e);
}
watchEffect(() => {
  if (event.value) {
    providePapawFocus(event.value);
  }
});
</script>

<template>
  <div v-if="event" class="flex flex-col w-full h-full overflow-auto">
    <ScrollbarVue class="w-full h-0 flex-shrink flex-1" loadable refreshable>
      <PapawTreeAutoFindParent
        v-if="config.enablePapawTree"
        :event="event"
      ></PapawTreeAutoFindParent>
      <Papaw v-else :event="event">
        <template #reply>
          <PostList
            v-model:pushEvent="pushEvent"
            :urls="urls"
            :filter="{ '#e': [event.id], kinds: [1, 30023] }"
            active
            disabledReply
          />
        </template>
      </Papaw>
    </ScrollbarVue>
    <RichTextEditBoxVue @send="handleSend" />
  </div>
</template>

<style scoped></style>
