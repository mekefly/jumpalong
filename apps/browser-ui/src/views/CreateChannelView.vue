<script lang="ts" setup>
import { useOnOK } from '../utils/use'
import ChannelMetadataEditVue from '../components/ChannelMetadataEdit.vue'
import { useEventLine } from '../components/ProvideEventLine'
import {
  AddPublishStaff,
  ChannelMetadata,
  LoginStaff,
  Synchronizer,
  RelayConfiguratorSynchronizerAddUrlsStaff,
  EventUtilsStaff,
} from '../nostr-runtime'

const message = useMessage()
const onOK = useOnOK()
let line = useEventLine(
  Synchronizer.ListSynchronizerManager.Staff,
  RelayConfiguratorSynchronizerAddUrlsStaff
)

const channelMetadata = ref<ChannelMetadata>({})
async function handleCreate() {
  if (!channelMetadata.value.name) {
    message.warning('请输入channelName')
    return
  }
  const publishLine = line
    .createChild()
    .add(AddPublishStaff, LoginStaff, EventUtilsStaff)

  let event = await publishLine.createEvent({
    kind: 40,
    content: JSON.stringify(channelMetadata.value),
  })
  publishLine.addPublish(event, { onOK })
  publishLine.initedAddWrite()
  if (event) {
    line.listSynchronizerManager
      .getInitStandardListSynchronizer(Synchronizer.ListEnum.PublicChats)
      .add({
        type: 'e',
        id: event.id,
        relay: undefined,
      })
    message.success('创建成功')
  } else {
    message.warning('没有创建成功')
  }
}
</script>

<template>
  <n-space vertical>
    <ChannelMetadataEditVue :channelMetadata="channelMetadata" />
    <n-button @click="handleCreate">{{ t('create') }}</n-button>
  </n-space>
</template>

<style scoped></style>
