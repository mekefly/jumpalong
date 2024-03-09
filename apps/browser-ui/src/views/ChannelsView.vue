<script lang="ts" setup>
import { computed } from 'vue'
import ChannelListItemVue from '../components/ChannelListItem.vue'
import { useEventLine } from '../components/ProvideEventLine'
import { Synchronizer } from '@/nostr-runtime'
const router = useRouter()

let line = useEventLine(Synchronizer.ListSynchronizerManager.Staff)
const channelListSynchronizer =
  line.listSynchronizerManager.getInitStandardListSynchronizer(
    Synchronizer.ListEnum.PublicChats
  )

const list = computed(() => channelListSynchronizer.getList())
function handleCreate() {
  router.push({ name: 'create-channel' })
}
</script>

<template>
  <div>
    <n-button @click="handleCreate">{{ t('create') }}</n-button>
  </div>
  <n-list class="mt-4" hoverable clickable>
    <n-list-item v-for="value in list">
      <ChannelListItemVue :key="value.id" :tag="value" />
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
