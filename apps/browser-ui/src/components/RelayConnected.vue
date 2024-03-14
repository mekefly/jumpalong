<script lang="ts" setup>
import { RelayConfiguratorSynchronizer } from '@/nostr-runtime'
import AddButtonVue from './AddButton.vue'
import ButtonCloseVue from './ButtonClose.vue'
import { useEventLine } from './ProvideEventLine'
import RelayConnectListVue from './RelayConnectListCard.vue'
import AccountTreeRoundVue from './icon/AccountTreeRound.vue'

let line = useEventLine(RelayConfiguratorSynchronizer.Staff)
let relayPoolLine = useEventLine()
let relayPool = relayPoolLine.relayPool

let relayConfigurator = line.relayConfigurator

const pool = computed(() => {
  return relayPool.getPool()
})
const keys = computed(() => {
  return [...pool.value.keys()]
})
function getSubNumber(url: string) {
  const relay = relayPool.getRelayFromPool(url)
  if (!relay) {
    return 0
  }
  return relay.subIds.size
}
function getPublishNumber(url: string) {
  const relay = relayPool.getRelayFromPool(url)
  if (!relay) {
    return 0
  }
  return relay.publishIds.size
}
</script>

<template>
  <RelayConnectListVue :urls="keys" :title="t('active_relay')">
    <template #header-extra>
      <n-icon class="mr-1">
        <AccountTreeRoundVue />
      </n-icon>
      {{ keys.length }}
    </template>
    <template #right="{ url }">
      <span class="flex-shrink-0">
        ({{ getSubNumber(url) }},{{ getPublishNumber(url) }})
      </span>
      <AddButtonVue
        :disabled="
          relayConfigurator.hasReadByUrl(url) ||
          relayConfigurator.hasWriteByUrl(url)
        "
        class="ml-2"
        @click="() => relayConfigurator.addWriteRead(url as any)"
      />
      <ButtonCloseVue
        class="ml-2"
        @click="() => relayPool.closeRelay(url)"
        @close="() => pool.get(url)?.close()"
      />
    </template>
  </RelayConnectListVue>
</template>

<style scoped></style>
