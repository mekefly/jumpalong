<script lang="ts" setup>
import { Event } from "nostr-tools";
import NewMessageVue from "./NewMessage.vue";
import PapawVue from "./Papaw.vue";
const props = defineProps<{
  eventList: Event[];
  withPapawOptionsButtons?: boolean;
}>();
const emits = defineEmits<{
  (e: "eventDeletion", id: string): void;
}>();
</script>

<template>
  <NewMessageVue>
    <PapawVue
      :withPapawOptionsButtons="withPapawOptionsButtons"
      v-for="event in eventList"
      :key="event.id"
      :event="event"
      :deleteEvent="(id) => emits('eventDeletion', id)"
    />
  </NewMessageVue>
</template>

<style scoped></style>
