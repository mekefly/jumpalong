<script lang="ts" setup>
import SyncAltVue from "./icon/SyncAlt.vue";
import { useSyncState } from "./SyncButton";
import Tooltip from "./Tooltip.vue";

const props = defineProps<{
  url: string;
}>();

const { handelSync, status, isLoading, color } = useSyncState(
  toRef(props, "url")
);
</script>

<template>
  <Tooltip :tooltip="t('sync_tooltip')">
    <n-button
      text
      @click="handelSync"
      :class="{
        turn: isLoading,
      }"
    >
      <n-icon :color="color">
        <SyncAltVue />
      </n-icon>
    </n-button>
  </Tooltip>
</template>

<style scoped>
.turn {
  animation: turn 0.5s infinite linear;
}
@keyframes turn {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
