<script lang="ts" setup>
import { Event, EventTemplate } from 'nostr-tools'
import Papaw from './Papaw.vue'
import PapawTreeAutoFindRoot from './PapawTreeAutoFindRoot.vue'
import PostList from './PostList.vue'
import RichTextEditBox from './RichTextEditBox.vue'
import Scrollbar from './Scrollbar.vue'
import { useHandleSendMessage } from '../utils/use'
import { useEventLine } from './ProvideEventLine'
import { ConfigStaff } from '@jumpalong/nostr-runtime'

const props = defineProps<{
  event: Event
  urls: Set<string>
}>()

const emits = defineEmits<{
  (e: 'pushEvent', v: Event): void
}>()
const message = useMessage()
const urls = toRef(props, 'urls')
const line = useEventLine(ConfigStaff)
const config = line.config

const pushEvent = ref<any>(undefined)
const handleSendEvent = useHandleSendMessage(
  1,
  undefined,
  // ref((e: Event) => {
  //   pushEvent.value?.(e)
  //   emits('pushEvent', e)
  // }),
  {
    urls: urls,
  }
)
async function handleSend(e: EventTemplate) {
  await handleSendEvent(e)
  message.info('send')
}
</script>

<template>
  <div v-if="event" class="flex flex-col w-full h-full overflow-auto">
    <Scrollbar class="w-full h-0 flex-shrink flex-1" loadable refreshable>
      <PapawTreeAutoFindRoot v-if="config.enablePapawTree" :event="event" />
      <Papaw v-else :event="event">
        <template #reply>
          <PostList
            v-model:pushEvent="pushEvent"
            :urls="urls"
            :filter="{ '#e': [event.id], kinds: [1, 30023] }"
            active
            disabledReply
          />
        </template>
      </Papaw>
    </Scrollbar>
    <RichTextEditBox @send="handleSend" />
  </div>
</template>

<style scoped></style>
