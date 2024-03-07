<script lang="ts" setup>
import ChannelMessageListVue from '../components/ChannelMessageList.vue'
// import { autoSetLoadBuffer } from '../components/LoadProgress'
import { useRichTextEditBoxOpt } from '../components/RichTextEditBox'
import RichTextEditBoxVue from '../components/RichTextEditBox.vue'
import ScrollbarVue from '../components/Scrollbar.vue'
import { useClipboardDialog } from '../utils/naiveUi'
import { useAsyncData, useHandleSendMessage } from '../utils/use'
import { EventTemplate, nip19 } from 'nostr-tools'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useJoinAndLeaveChannelHandle } from './ChannelMessageView'
import {
  ChannelMetadataApiStaff,
  EventApiStaff,
  toDeCodeNevent,
  Synchronizer,
  LoginStaff,
} from '@jumpalong/nostr-runtime'
import { useEventLine } from '../components/ProvideEventLine'
import { NPageHeader } from 'naive-ui'

const route = useRoute()
const router = useRouter()
const neventOpt = computed(() => toDeCodeNevent(route.params.value as string))
const channelId = computed<string | null | undefined>(() => neventOpt.value?.id)

const line = useEventLine(
  ChannelMetadataApiStaff,
  EventApiStaff,
  Synchronizer.ListSynchronizerManager.Staff,
  LoginStaff
)

//需要为显示区域和编辑区域架设一个隧道
watchEffect(() => {
  if (!channelId.value) return
})
useRichTextEditBoxOpt(channelId)
const metadataLine = computed(() =>
  channelId.value
    ? line.getChannelMetadataByChannelId(channelId.value, {
        ...(neventOpt.value?.relays
          ? {
              urls: new Set(neventOpt.value?.relays),
            }
          : {}),
      })
    : undefined
)

const messageBeltline = computed(() => {
  if (!channelId.value) return
  return line.commonEventList({
    filters: [
      {
        kinds: [42],
        ['#e']: [channelId.value],
        limit: 5,
      },
    ],
    reverseSort: true,
    ...(neventOpt.value?.relays
      ? {
          urls: new Set(neventOpt.value?.relays),
        }
      : {}),
  })
})
// autoSetLoadBuffer(messageBeltline)

const metadata = computed(
  () => metadataLine.value && metadataLine.value.feat.getMetadata()
)
const channelEvent = computed(() => {
  if (!channelId.value) return
  return metadataLine.value?.getLatestEvent()
})

const message = useMessage()
function handleLoad() {
  //频道这里消息的显示顺序向反
  messageBeltline.value?.feat.loadNew()
  message.info(t('refreshing'))
}
function handleRefresh() {
  messageBeltline.value?.feat.load()
  message.info(t('loading'))
}

const { handleJoinChannel, handleLeaveChannel } =
  useJoinAndLeaveChannelHandle(channelId)
function switchJoinChannel() {
  if (isJoin.value) {
    handleLeaveChannel()
  } else {
    handleJoinChannel()
  }
}
const send = useHandleSendMessage(42)

function handleSend(event: EventTemplate) {
  if (!channelId.value) return

  event.tags = [...event.tags, ['e', channelId.value, '', 'root']]

  // for (const url of relayUrls.value ?? []) {
  //   event.tags.push(['r', url])
  // }

  send(event)
}
const isJoin = computed(() => {
  if (!channelId.value) return false
  return line.listSynchronizerManager
    .getInitStandardListSynchronizer(Synchronizer.ListEnum.PublicChats)
    .has({ id: channelId.value, type: 'e' })
})

const clipboard = useClipboardDialog()
function createNevent() {
  if (!channelId.value) {
    return
  }
  return nip19.neventEncode({
    id: channelId.value,
    relays: [],
  })
}
function handleShareChannel() {
  const nevent = createNevent()
  if (!nevent) return
  clipboard(nevent)
}
function handleEditChannel() {
  const nevent = createNevent()
  if (!nevent) return
  router.push({ name: 'edit-channel', params: { value: nevent } })
}

const currentPubkey = useAsyncData(() => line.getPubkeyOrNull())
</script>

<template>
  <div v-if="channelId" class="flex flex-col h-full overflow-auto">
    <NPageHeader
      class="flex-shrink-0"
      :subtitle="metadata?.name ?? channelId.slice(0, 10)"
      @back="router.back()"
    >
      <template #extra>
        <div class="felx items-center justify-center">
          <n-button
            v-if="
              channelEvent && channelEvent.pubkey === currentPubkey?.toHex()
            "
            class="mr-2"
            round
            @click="handleEditChannel"
          >
            <n-icon>
              <Edit />
            </n-icon>
          </n-button>
          <n-button class="mr-2" round @click="handleShareChannel">
            <n-icon>
              <MdShare />
            </n-icon>
          </n-button>
          <n-button
            round
            :type="isJoin ? 'default' : 'primary'"
            @click="switchJoinChannel"
          >
            {{ isJoin ? t('leave') : t('join') }}
          </n-button>
        </div>
      </template>
    </NPageHeader>

    <ScrollbarVue
      class="flex-shrink flex-1"
      loadable
      refreshable
      @load="handleLoad"
      @auto-load="handleLoad"
      @refresh="handleRefresh"
      @auto-refresh="handleRefresh"
    >
      <ChannelMessageListVue
        v-if="messageBeltline"
        :eventList="messageBeltline.getList()"
      />
    </ScrollbarVue>
    <RichTextEditBoxVue @send="handleSend" />
  </div>
</template>

<style scoped></style>
