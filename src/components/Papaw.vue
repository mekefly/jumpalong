<script lang="ts" setup>
import { usePushShortTextNote } from "@/views/ShortTextNoteView";
import { Event } from "nostr-tools";

import Content from "./Content.vue";
import DateTimeVue from "./DateTime.vue";
import SMSButtonVue from "./SMSButton.vue";
import UserInfoVue from "./UserInfo.vue";

const props = defineProps<{
  event: Event;
  deleteEvent: (id: string) => void;
}>();
const { event, deleteEvent } = toRefs(props);
const pushShortTextNote = usePushShortTextNote();
</script>

<template>
  <div class="w-max-full bg-[#dfe4ea55] rounded-2xl mt-4">
    <div class="p-3 flex justify-between items-center">
      <UserInfoVue :pubkey="event.pubkey" :created_at="event.created_at">
        <template #bottom>
          <DateTimeVue :secondTimestamp="event.created_at" />
        </template>
        <template #right>
          <SMSButtonVue :event="event" :deleteEvent="deleteEvent" />
        </template>
      </UserInfoVue>
    </div>
    <div class="p-5 font" @click="() => pushShortTextNote(event)">
      <Content :event="event" />
    </div>
  </div>
</template>

<style scoped></style>
