<script lang="ts" setup>
import { Event } from "nostr-tools";
import CloudLightning from "./icon/CloudLightning.vue";
import { useZaps } from "./ZapsPrivider";

const props = defineProps<{
  size: number;
  event: Event;
}>();

const zaps = useZaps();
const event = computed(() => props.event);

async function handleRequestProvider() {
  zaps?.rewardByEvent(event.value);
}
</script>

<template>
  <n-button text @click="() => handleRequestProvider()">
    <n-icon :size="size">
      <CloudLightning />
    </n-icon>
  </n-button>
</template>

<style scoped></style>
