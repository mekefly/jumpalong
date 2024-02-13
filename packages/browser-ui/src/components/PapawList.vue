<script lang="ts" setup>
import { Event } from 'nostr-tools'
import NewMessage from './NewMessage.vue'
import MaybeTreePapaw from './MaybeTreePapaw.vue'
const props = defineProps<{
  eventList: Event[]
  withPapawOptionsButtons?: boolean
  disabledReply?: boolean
}>()
const emits = defineEmits<{
  (e: 'eventDeletion', id: string): void
}>()
</script>

<template>
  <NewMessage>
    <div v-for="event in eventList" :key="event.id">
      <MaybeTreePapaw
        :event="event"
        :withPapawOptionsButtons="withPapawOptionsButtons"
        :disabledReply="disabledReply"
      >
      </MaybeTreePapaw>
    </div>
  </NewMessage>
</template>

<style scoped></style>
