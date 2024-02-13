<script lang="ts" setup>
// import { useOnOK } from "@/utils/use";
import { useThemeVars } from 'naive-ui'
import { Event } from 'nostr-tools'
import PapawReactionVue from './PapawReaction.vue'
import PapawReplyButtonVue from './PapawReplyButton.vue'
import ZapsButton from './ZapsButton.vue'

const props = defineProps<{
  event: Event
  deleteEvent?: (id: string) => void
}>()

const { event, deleteEvent } = toRefs(props)

// const onOK = useOnOK();
const theme = useThemeVars()

const size = ref(18)

const limit = 20
</script>

<template>
  <div class="flex items-center justify-between">
    <n-space class="flex justify-around py-4 box-border">
      <PapawReplyButtonVue :size="size" :event="event" />
      <ZapsButton :size="size" :event="event" />
    </n-space>
    <PapawReactionVue :size="size" :event="event" />
  </div>
</template>

<style scoped></style>
