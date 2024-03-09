<script lang="ts" setup>
import { createDynamicColor } from '@jumpalong/shared'
import { t } from '../i18n'
import { PoolStaff } from '@/nostr-runtime'
import { useEventLine } from './ProvideEventLine'
let line = useEventLine(PoolStaff)

const poolSize = computed(() => line.relayPool.getPool().size)
const subIdSize = computed(() => line.relayPool.allSubIds.size)
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
    {{ t('number_of_current_and_continued_connections') }}
  </n-tooltip>
</template>

<style scoped></style>
