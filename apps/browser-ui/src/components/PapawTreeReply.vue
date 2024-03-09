<script lang="ts" setup>
import { Event } from 'nostr-tools'
import { useNostrContainerGet } from './NostrContainerProvade'
import { usePapawFocusState } from './Papaw'
import PapawTree from './PapawTree.vue'
import { useEventLine } from './ProvideEventLine'
import { EventApiStaff } from '@/nostr-runtime'
logger.debug()

const props = defineProps<{ event: Event; noTree?: boolean }>()

const id = computed(() => props.event.id)
const limit = 5

const generalEventEventBeltline = useEventLine(EventApiStaff)
const line = computed(() =>
  generalEventEventBeltline.textEventBeltline({
    limit,
    filters: [
      {
        '#e': [id.value],
        kinds: [1, 30023],
      },
    ],
  })
)
const eventList = computed(() => line.value.getList())
const state = usePapawFocusState()
watchEffect(() => {
  if (state?.parents.value.has(id.value)) {
    if (state.focusEvent.value) {
      line.value.pushEvent(state.focusEvent.value)
    }
  }
})
const postLength = computed(() => eventList.value.length ?? 0)
</script>

<template>
  <PapawTree v-for="event in eventList" :event="event"></PapawTree>
  <div
    v-if="postLength > 0"
    class="w-full flex justify-center items-center py-2"
  >
    <n-button class="w-full" text @click="() => line.feat.load()">
      {{ t('load_more') }}
    </n-button>
  </div>
</template>

<style scoped></style>
