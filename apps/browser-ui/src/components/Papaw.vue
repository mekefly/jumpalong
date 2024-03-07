<script lang="ts" setup>
import { Event } from 'nostr-tools'
import Content from './Content.vue'
import PapawWarp from './PapawWarp.vue'
import PapawReactionItem from './PapawReactionItem.vue'
import RelayContent from './RelayContent.vue'
import Markdown from './Markdown.vue'
// import Markdown from './Markdown.vue'
// import PapawReactionItem from './PapawReactionItem.vue'
// import PapawWarp from './PapawWarp.vue'
// import RelayContent from './RelayContent.vue'

const props = withDefaults(
  defineProps<{
    event: Event
    deleteEvent?: (id: string) => void
    withPapawOptionsButtons?: boolean
    disabledReply?: boolean
  }>(),
  {
    withPapawOptionsButtons: true,
  }
)
const { event, deleteEvent } = toRefs(props)

function handelDeleteEvent(e: string) {
  deleteEvent?.value?.(e)
}

const contentRef = ref()
const kind = computed(() => event.value.kind)
const content = computed(() => event.value.content)
</script>

<template>
  <PapawWarp
    :contentRef="contentRef"
    @handelDeleteEvent="handelDeleteEvent"
    v-bind="$props"
    :withPapawOptionsButtons="
      withPapawOptionsButtons && (kind === 1 || kind === 42)
    "
  >
    <template #default>
      <Content
        v-if="kind === 1 || kind === 42"
        :event="event"
        :disabledReply="disabledReply"
      />

      <span v-else-if="kind === 3"> {{ t('the_user_has_followed_you') }} </span>
      <span v-else-if="kind === 7">
        <PapawReactionItem
          :events="[]"
          :size="20"
          :reaction="content"
          :active="true"
        />
        <RelayContent v-if="!disabledReply" :event="event" />
      </span>

      <span v-else-if="kind === 30023">
        <Markdown :event="event"></Markdown>
      </span>
      <span v-else>{{ event.content }}</span>
    </template>
    <template #reply><slot name="reply"></slot></template>
  </PapawWarp>
</template>

<style scoped>
.twinkle {
  animation: twinkle 2s ease;
}
@keyframes twinkle {
  0% {
    background-color: #dfe4eaaa;
  }
  25% {
    background-color: #dfe4ea11;
  }
  50% {
    background-color: #dfe4eaff;
  }
  75% {
    background-color: #dfe4ea11;
  }
  100% {
    background-color: #dfe4eaaa;
  }
}
</style>
