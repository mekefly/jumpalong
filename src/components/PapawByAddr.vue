<script lang="ts" setup>
import { createGetEventLineByAddressPointer } from "@/api/event";
import { toDeCodeAddress } from "@/utils/nostr";
import { AddressPointer } from "nostr-tools/lib/nip19";
import Papaw from "./Papaw.vue";

const props = defineProps<{
  naddr?: string;
  a?: string;
}>();
const { naddr, a } = toRefs(props);
const addrPoint = computed<AddressPointer | null>(() => {
  if (naddr?.value) {
    return toDeCodeAddress(naddr.value);
  } else if (a?.value) {
    return toDeCodeAddress(a.value);
  }
  return null;
});
const line = computed(
  () => addrPoint.value && createGetEventLineByAddressPointer(addrPoint.value)
);
const event = computed(() => line.value && line.value.feat.getLatestEvent());
</script>

<template>
  <Papaw v-if="event" :event="event"></Papaw>
</template>

<style scoped></style>
