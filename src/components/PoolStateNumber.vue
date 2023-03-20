<script lang="ts" setup>
import { relayPool } from "@/nostr/nostr";
import { createDynamicColor } from "@/utils/utils";

const poolSize = computed(() => relayPool.getPool().size);
const subIdSize = computed(() => relayPool.allSubIds.size);
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <span
        :style="{
          color: createDynamicColor(subIdSize, 20, 400),
        }"
      >
        {{ subIdSize }}
      </span>
    </template>
    当前订阅数，包括临时订阅
  </n-tooltip>
  /
  <n-tooltip trigger="hover">
    <template #trigger>
      <span
        :style="{
          color: createDynamicColor(poolSize, 5, 30),
        }"
      >
        {{ poolSize }}
      </span>
    </template>
    当前与中续的连接数量
  </n-tooltip>
</template>

<style scoped></style>
