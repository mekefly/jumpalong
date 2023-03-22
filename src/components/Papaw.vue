<script lang="ts" setup>
import { Event } from "nostr-tools";

import Content from "./Content.vue";
import DateTimeVue from "./DateTime.vue";
import SMSButtonVue from "./SMSButton.vue";
import UserInfoVue from "./UserInfo.vue";

import vLongPress from "@/directive/LongPress";
import PapawFooterVue from "./PapawFooter.vue";

const props = defineProps<{
  event: Event;
  deleteEvent?: (id: string) => void;
}>();
const { event, deleteEvent } = toRefs(props);

function handelDeleteEvent(e: string) {
  deleteEvent?.value?.(e);
}
const showSMS = ref(false);
</script>

<template>
  <div
    class="w-max-full bg-[#dfe4ea55] rounded-2xl mt-4"
    v-Long-press="
      (e:MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        showSMS = !showSMS;
      }
    "
  >
    <div class="p-3 flex justify-between items-center">
      <UserInfoVue :pubkey="event.pubkey" :created_at="event.created_at">
        <template #bottom>
          <DateTimeVue :secondTimestamp="event.created_at" />
        </template>
        <template #right>
          <SMSButtonVue
            :show="showSMS"
            :event="event"
            :deleteEvent="handelDeleteEvent"
          />
        </template>
      </UserInfoVue>
    </div>
    <div class="p-5 font">
      <Content :event="event" />
    </div>
    <PapawFooterVue :event="event" />
  </div>
</template>

<style scoped></style>
