<script lang="ts" setup>
import ContentVue from "@/components/Content.vue";
import DateTimeVue from "@/components/DateTime.vue";
import PostListVue from "@/components/PostList.vue";
import { useRichTextEditBoxOpt } from "@/components/RichTextEditBox";
import RichTextEditBoxVue from "@/components/RichTextEditBox.vue";
import ScrollbarVue from "@/components/Scrollbar.vue";
import SMSButtonVue from "@/components/SMSButton.vue";
import UserInfoVue from "@/components/UserInfo.vue";
import { deserializeTagR } from "@/nostr/tag";
import { useHandleSendMessage } from "@/utils/use";
import { Event, EventTemplate } from "nostr-tools";
import { useEvent } from "./ShortTextNoteView";

//需要为显示区域和编辑区域架设一个隧道

const event = useEvent();
const eventId = computed(() => event.value?.id ?? "default");

useRichTextEditBoxOpt(eventId);

const urls = computed<Set<string>>(() => {
  if (!event.value) return new Set();
  return deserializeTagR(event.value?.tags);
});
const pushEvent = ref<undefined | ((e: Event) => void)>(undefined);

const handleSendEvent = useHandleSendMessage(1, undefined, pushEvent, {
  urls: urls,
});
function handleSend(e: EventTemplate) {
  //引用了父标签
  e.tags.push(["e", eventId.value, "reply"]);

  handleSendEvent(e);
}
</script>

<template>
  <div v-if="event" class="flex flex-col w-full h-full overflow-auto">
    <ScrollbarVue class="w-full h-0 flex-shrink flex-1">
      <UserInfoVue :pubkey="event.pubkey" :created_at="event.created_at">
        <template #bottom>
          <DateTimeVue :secondTimestamp="event.created_at" />
        </template>
        <template #right>
          <SMSButtonVue :event="event" :deleteEvent="() => {}" />
        </template>
      </UserInfoVue>
      <div class="p-5 font">
        <ContentVue :event="event" />
      </div>
      <div>
        <PostListVue
          v-model:pushEvent="pushEvent"
          :urls="urls"
          :filter="{ '#e': [event.id], kinds: [1, 30023] }"
        />
      </div>
    </ScrollbarVue>
    <RichTextEditBoxVue @send="handleSend" />
  </div>
</template>

<style scoped></style>
