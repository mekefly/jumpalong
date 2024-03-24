<script lang="ts" setup>
import UploadInputVue from '@/components/UploadInput.vue'
import { ChannelMetadata } from '../nostr-runtime'
const props = defineProps<{
  channelMetadata: ChannelMetadata
}>()
const { channelMetadata } = toRefs(props)
</script>

<template>
  <n-space vertical>
    <n-input placeholder="name" v-model:value="channelMetadata.name" />
    <n-input placeholder="about" v-model:value="channelMetadata.about" />
    <UploadInputVue
      placeholder="picture"
      v-model:value="channelMetadata.picture"
    />
  </n-space>
</template>

<style scoped></style>
