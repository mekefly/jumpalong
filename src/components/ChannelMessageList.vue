<script lang="ts" setup>
import PapawVueList from "@/components/PapawList.vue";
import { useAutoScroll } from "@/views/ChannelMessageView";
import { Event } from "nostr-tools";

const props = defineProps<{
  eventList: Event[];
}>();
const { eventList } = toRefs(props);
const emits = defineEmits<{
  (e: "eventDeletion", id: string): void;
}>();

useAutoScroll(eventList);
</script>

<template>
  <PapawVueList
    :eventList="eventList"
    @eventDeletion="(id) => emits('eventDeletion', id)"
  />
</template>

<style scoped></style>
