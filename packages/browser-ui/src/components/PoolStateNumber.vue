<script lang="ts" setup>
import { t } from "@/i18n";
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
    {{ t(`current_number_of_subscriptions_including_temporary_subscriptions`) }}
  </n-tooltip>
  /
  <n-tooltip trigger="hover">
    <template #trigger>
      <span
        :style="{
          color: createDynamicColor(poolSize, 10, 80),
        }"
      >
        {{ poolSize }}
      </span>
    </template>
    {{ t("number_of_current_and_continued_connections") }}
  </n-tooltip>
</template>

<style scoped></style>
