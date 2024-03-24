<script lang="ts" setup>
import { type AddressPointer } from 'nostr-tools/nip19'
import Papaw from './Papaw.vue'
import { EventApiStaff, toDeCodeAddress } from '../nostr-runtime'
import { useEventLine } from './ProvideEventLine'

const props = defineProps<{
  naddr?: string
  a?: string
}>()
const { naddr, a } = toRefs(props)

const eventApi = useEventLine(EventApiStaff)

const addrPoint = computed<AddressPointer | null>(() => {
  if (naddr?.value) {
    return toDeCodeAddress(naddr.value)
  } else if (a?.value) {
    return toDeCodeAddress(a.value)
  }
  return null
})
const line = computed(
  () =>
    addrPoint.value &&
    eventApi.createGetEventLineByAddressPointer(addrPoint.value)
)
const event = computed(() => line.value && line.value.feat.getLatestEvent())
</script>

<template>
  <Papaw v-if="event" :event="event"></Papaw>
</template>

<style scoped></style>
