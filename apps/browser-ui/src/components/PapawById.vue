<script lang="ts" setup>
import { usePushShortTextNote } from '../views/ShortTextNoteView'
import { useNostrContainerGet } from './NostrContainerProvade'
import Papaw from './Papaw.vue'
import PapawTreeHierarchy from './PapawTreeHierarchy.vue'
import { EventApiStaff } from '@jumpalong/nostr-runtime'
import { useEventLine } from './ProvideEventLine'
import { NEmpty } from 'naive-ui'

const props = defineProps<{
  id: string
  relays?: Set<string>
  pubkey?: string
  disabledReply?: boolean
}>()

const eventApi = useEventLine(EventApiStaff)

const eventLine = computed(() =>
  eventApi.getEventById(props.id, {
    urls: props.relays,
    pubkeys: props.pubkey ? [props.pubkey] : undefined,
  })
)
const event = computed(() => eventLine.value.feat.getLatestEvent())
const pushToTextNote = usePushShortTextNote()
</script>

<template>
  <Papaw v-if="event" :event="event" disabledReply>
    <template v-if="$slots.reply" #reply>
      <slot name="reply" :event="event"></slot>
    </template>
  </Papaw>

  <div v-else>
    <NEmpty
      :description="t('not_found_post')"
      size="huge"
      :click="() => pushToTextNote(id)"
    />
    <PapawTreeHierarchy>
      <slot name="reply" :event="event" />
    </PapawTreeHierarchy>
  </div>
</template>

<style scoped></style>
