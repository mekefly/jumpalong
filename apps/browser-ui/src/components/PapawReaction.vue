<script lang="ts" setup>
import { Event } from 'nostr-tools'

import { useLazyComponent, useOnOK } from '../utils/use'
import DrawerVue from './Drawer.vue'
import SmileBeamRegularVue from './icon/SmileBeamRegular.vue'
// import { useNostrContainerAsyncGet } from './NostrContainerProvade'
import PapawReactionItemVue from './PapawReactionItem.vue'
import { useEventLine, usePubkey } from './ProvideEventLine'
import { ReactionStaff } from '@jumpalong/nostr-runtime'

const props = defineProps<{
  event: Event
  size: number
}>()

const line = useEventLine(ReactionStaff)
const event = toRef(props, 'event')

const onOK = useOnOK()
const pubkey = usePubkey()

// const limit = 20
const [reactiveLine, target] = useLazyComponent(() => {
  return line.getReactionByEvent(event.value, {})
})
const reactionMap = computed(() => reactiveLine.value?.getReactiveMap() ?? {})

const noSelfMap = computed(() => {
  return Object.fromEntries(
    Object.entries(reactionMap.value).map(([key, value]) => {
      return [
        key,
        value.filter(event => {
          if (event.pubkey === pubkey.value?.toHex()) {
            activeMap.value[key] = true
            selfReactiveIdMap.value[key] = event.id
          }
        }),
      ]
    })
  ) as typeof reactionMap.value
})
const activeMap = ref({} as Record<string, boolean>)
const selfReactiveIdMap = ref({} as Record<string, string>)
const reactions = computed(
  () =>
    new Set([
      '+',
      '-',
      '👍',
      '❓',
      '🚀',
      '👀',
      '😁',
      '😧',
      '🤣',
      ...Object.keys(reactionMap.value),
      ...line.reactionsKeyList.getKeys(),
    ])
)

//找到自己所有的reactive
watchEffect(() => {})
reactions.value.forEach(type => {
  activeMap.value[type] = line.hasReactions(type as any, event.value.id)
})
function handelSwitchActive(type: string) {
  let typeV = activeMap.value[type]
  let reactiveId = selfReactiveIdMap.value[type]
  if (typeV) {
    if (typeof reactiveId === 'string') {
      line.deleteReactions(type as any, {
        likeId: reactiveId,
        onOK,
        cue: { tags: event.value.tags, pubkeys: [event.value.pubkey] },
      })
    } else {
      line.deleteReactions(type as any, {
        eventId: event.value.id,
        onOK,
        cue: { tags: event.value.tags, pubkeys: [event.value.pubkey] },
      })
    }
  } else {
    line.sendReactions(type as any, event.value, { onOK })
  }
  activeMap.value[type] = !activeMap.value[type]
}
const active = ref(false)
const recommendReactionKey = computed(() =>
  [
    ...Object.entries(reactionMap.value).map(
      ([key, value]) => [key, value] as const
    ),
    ...Object.entries(activeMap.value)
      .filter(([k, v]) => v && !reactionMap.value[k])
      .map(([k, v]) => [k as string, [] as Event[]] as const),
  ]
    .sort(([k, v], [k1, v1]) => v.length - v1.length)
    .slice(0, 2)
)
</script>

<template>
  <div ref="target">
    <n-space class="flex items-center justify-center">
      <PapawReactionItemVue
        @handelSwitchActive="handelSwitchActive"
        v-for="[reaction, events] of recommendReactionKey"
        :size="size"
        :events="noSelfMap[reaction] ?? []"
        :reaction="reaction"
        :active="activeMap[reaction]"
      />

      <n-button circle quaternary @click="() => (active = !active)">
        <n-icon :size="size">
          <SmileBeamRegularVue />
        </n-icon>
      </n-button>

      <DrawerVue v-model:show="active">
        <n-space class="h-full w-full flex items-center flex-wrap">
          <PapawReactionItemVue
            @handelSwitchActive="handelSwitchActive"
            v-for="reaction of reactions"
            :size="size"
            :events="noSelfMap[reaction] ?? []"
            :reaction="reaction"
            :active="activeMap[reaction]"
          />
        </n-space>
      </DrawerVue>
    </n-space>
  </div>
</template>

<style scoped></style>
