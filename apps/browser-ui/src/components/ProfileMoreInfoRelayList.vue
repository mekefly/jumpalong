<script lang="ts" setup>
import {
  UserApiStaff,
  RelayConfiguration,
  LoginUtilsStaff,
  RelayConfiguratorSynchronizer,
} from '../nostr-runtime'
import { useEventLine } from './ProvideEventLine'
import RelayAddButtonVue from './RelayAddButton.vue'
import RelayConnectListVue from './RelayConnectList.vue'
import RelayReadableButtonVue from './RelayReadableButton.vue'
import RelayWritableButtonVue from './RelayWritableButton.vue'

const props = defineProps<{
  pubkey: string
  active: boolean
}>()
const router = useRouter()

const { pubkey } = toRefs(props)
const l = useEventLine(
  UserApiStaff,
  LoginUtilsStaff,
  RelayConfiguratorSynchronizer.Staff
)

const line = computed(() => l.getUserRelayUrlConfigByPubkey(pubkey.value))
const configuration = computedAsync<RelayConfiguration | null>(async () => {
  const _pubkey = pubkey.value
  if (_pubkey === (await l.getPubkeyOrNull())?.toHex()) {
    return l.relayConfigurator.getConfiguration()
  }
  return line.value.getRelayConfiguration()
})
const urls = computed(() => {
  return configuration.value && Object.keys(configuration.value.config)
})

function handleSave() {
  router.push({
    name: 'relays',
  })
}
</script>

<template>
  <n-collapse-transition :show="l.relayConfigurator.hasChange()">
    <n-button @click="handleSave" type="primary">
      {{ t('save') }}
    </n-button>
  </n-collapse-transition>
  <RelayConnectListVue :urls="urls ?? []" title="">
    <template #right="{ url }">
      <RelayWritableButtonVue
        :active="configuration?.write.has(url) ?? false"
        class="mr-1"
      />
      <RelayReadableButtonVue
        :active="configuration?.read.has(url) ?? false"
        class="mr-2"
      />

      <RelayAddButtonVue :url="url" />
    </template>
  </RelayConnectListVue>
</template>

<style scoped></style>
