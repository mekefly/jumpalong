<script lang="ts" setup>
import { type EventApi } from "@/api/event";
import { TYPES } from "@/nostr/nostr";
import { toDeCodeAddress } from "@/utils/nostr";
import { type AddressPointer } from "nostr-tools/lib/nip19";
import { useNostrContainerGet } from "./NostrContainerProvade";
import Papaw from "./Papaw.vue";

const props = defineProps<{
  naddr?: string;
  a?: string;
}>();
const { naddr, a } = toRefs(props);

const eventApi = useNostrContainerGet<EventApi>(TYPES.EventApi);

const addrPoint = computed<AddressPointer | null>(() => {
  if (naddr?.value) {
    return toDeCodeAddress(naddr.value);
  } else if (a?.value) {
    return toDeCodeAddress(a.value);
  }
  return null;
});
const line = computed(
  () =>
    addrPoint.value &&
    eventApi.createGetEventLineByAddressPointer(addrPoint.value)
);
const event = computed(() => line.value && line.value.feat.getLatestEvent());
</script>

<template>
  <Papaw v-if="event" :event="event"></Papaw>
</template>

<style scoped></style>
