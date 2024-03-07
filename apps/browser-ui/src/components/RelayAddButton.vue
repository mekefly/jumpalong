<script lang="ts" setup>
import AddButtonVue from './AddButton.vue'
import { useEventLine } from './ProvideEventLine'
import { RelayConfiguratorSynchronizerStaff } from '@jumpalong/nostr-runtime'

let line = useEventLine(RelayConfiguratorSynchronizerStaff)
let relayConfigurator = line.relayConfigurator
let prop = defineProps<{
  url: string
}>()
useMessage()
let disabled = computed(
  () =>
    relayConfigurator.hasReadByUrl(prop.url) ||
    relayConfigurator.hasWriteByUrl(prop.url)
)
</script>

<template>
  <AddButtonVue
    :disabled="disabled"
    @click="
      () => {
        relayConfigurator.addWriteRead(url)

        $emit('click')
      }
    "
  />
</template>

<style scoped></style>
