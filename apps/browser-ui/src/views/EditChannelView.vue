<script lang="ts" setup>
import ChannelMetadataEditVue from '@/components/ChannelMetadataEdit.vue'
import { useOnOK } from '../utils/use'
import {
  AddPublishStaff,
  ChannelMetadata,
  ChannelMetadataApiStaff,
  LoginStaff,
  RelayConfiguratorSynchronizerStaff,
  toDeCodeNevent,
} from '@jumpalong/nostr-runtime'
import { useEventLine } from '../components/ProvideEventLine'

const message = useMessage()
const route = useRoute()

const neventOpt = computed(() => toDeCodeNevent(route.params.value as string))
const eventId = computed(() => neventOpt.value?.id)
const line = useEventLine(ChannelMetadataApiStaff)

const metadataLine = computed(
  () =>
    eventId.value &&
    line.getChannelMetadataByChannelId(eventId.value, {
      ...(neventOpt.value?.relays
        ? {
            urls: new Set(neventOpt.value.relays),
          }
        : {}),
    })
)

const channelMetadata = ref<ChannelMetadata>({})
const metadata = computed(
  () => metadataLine.value && metadataLine.value.getMetadata()
)
watch(
  () => metadata.value,
  () => {
    Object.assign(channelMetadata.value, metadata.value)
  },
  { deep: true, immediate: true }
)
const onOK = useOnOK()
async function handleSave() {
  if (!eventId.value) {
    return
  }
  if (!channelMetadata.value.name) {
    message.warning('请输入channelName')
    return
  }
  if (!metadata.value) {
    return
  }
  const publishLine = line
    .createChild()
    .add(AddPublishStaff, LoginStaff, RelayConfiguratorSynchronizerStaff)

  const event = await publishLine.createEvent({
    kind: 41,
    content: JSON.stringify(channelMetadata.value),
    tags: [['e', eventId.value]],
  })
  publishLine.addPublish(event, { onOK })
  publishLine.initedAddWrite()
}
</script>

<template>
  <n-space vertical>
    <ChannelMetadataEditVue :channelMetadata="channelMetadata" />
    <n-button @click="handleSave">{{ t('save') }}</n-button>
  </n-space>
</template>

<style scoped></style>
