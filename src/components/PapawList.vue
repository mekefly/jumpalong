<script lang="ts" setup>
import { Event } from "nostr-tools";
import NewMessageVue from "./NewMessage.vue";
import PapawVue from "./Papaw.vue";
const props = defineProps<{
  eventList: Event[];
}>();
const { eventList } = toRefs(props);
const emits = defineEmits<{
  (e: "eventDeletion", id: string): void;
}>();
</script>

<template>
  <NewMessageVue>
    <PapawVue
      v-for="event in eventList"
      :key="event.id"
      :event="event"
      :deleteEvent="(id) => emits"
    />
  </NewMessageVue>
</template>

<style scoped></style>
