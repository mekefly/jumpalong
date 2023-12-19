<script lang="ts" setup>
import { Event } from "nostr-tools";
import MayBeTreePapawVue from "./MayBeTreePapaw.vue";
import NewMessageVue from "./NewMessage.vue";
const props = defineProps<{
  eventList: Event[];
  withPapawOptionsButtons?: boolean;
  disabledReply?: boolean;
}>();
const emits = defineEmits<{
  (e: "eventDeletion", id: string): void;
}>();
</script>

<template>
  <NewMessageVue>
    <div v-for="event in eventList" :key="event.id">
      <MayBeTreePapawVue
        :event="event"
        :withPapawOptionsButtons="withPapawOptionsButtons"
        :disabledReply="disabledReply"
      >
      </MayBeTreePapawVue>
    </div>
  </NewMessageVue>
</template>

<style scoped></style>
