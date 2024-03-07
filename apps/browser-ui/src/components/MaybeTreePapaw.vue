<script lang="ts" setup>
import { Event } from 'nostr-tools'
import { useMaybeTreePapaw } from './MaybeTreePapaw'
import PapawVue from './Papaw.vue'
import PapawTreeVue from './PapawTree.vue'
const props = defineProps<{
  event: Event
  withPapawOptionsButtons?: boolean
  disabledReply?: boolean
}>()
const { useTree } = useMaybeTreePapaw() ?? {}
</script>

<template>
  <PapawTreeVue
    :event="event"
    v-if="useTree"
    :withPapawOptionsButtons="withPapawOptionsButtons"
  ></PapawTreeVue>
  <PapawVue
    v-else
    :withPapawOptionsButtons="withPapawOptionsButtons"
    :event="event"
    :disabledReply="disabledReply"
  />
</template>

<style scoped></style>
