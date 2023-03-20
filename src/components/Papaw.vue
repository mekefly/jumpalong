<script lang="ts" setup>
import { Event } from "nostr-tools";

import Content from "./Content.vue";
import DateTimeVue from "./DateTime.vue";
import SMSButtonVue from "./SMSButton.vue";
import UserInfoVue from "./UserInfo.vue";

const props = defineProps<{
  event: Event;
  deleteEvent?: (id: string) => void;
}>();
const { event, deleteEvent } = toRefs(props);
function handelDeleteEvent(e: string) {
  deleteEvent?.value?.(e);
}
</script>

<template>
  <div class="w-max-full bg-[#dfe4ea55] rounded-2xl mt-4">
    <div class="p-3 flex justify-between items-center">
      <UserInfoVue :pubkey="event.pubkey" :created_at="event.created_at">
        <template #bottom>
          <DateTimeVue :secondTimestamp="event.created_at" />
        </template>
        <template #right>
          <SMSButtonVue :event="event" :deleteEvent="handelDeleteEvent" />
        </template>
      </UserInfoVue>
    </div>
    <div class="p-5 font">
      <Content :event="event" />
    </div>
  </div>
</template>

<style scoped></style>
