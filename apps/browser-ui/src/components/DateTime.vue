<script lang="ts" setup>
import i18n, { t } from '../i18n'
import { useNowSecondTimestamp } from '../utils/use'
const props = defineProps<{ secondTimestamp: number }>()
const { secondTimestamp } = toRefs(props)
const nowSecondTimestamp = useNowSecondTimestamp()
const comeFromBefore = computed(() => {
  return nowSecondTimestamp.value - secondTimestamp.value
})
const dataString = computed(() =>
  i18n.global.d(new Date(secondTimestamp.value * 1000), 'short')
)
</script>

<template>
  <span v-if="comeFromBefore >= 60 * 60 * 24">
    {{ dataString }}
  </span>
  <span v-else-if="comeFromBefore < 60">
    {{ t('x_seconds_ago', { x: comeFromBefore }) }}
  </span>
  <span v-else-if="comeFromBefore < 3600">
    {{ t('x_minutes_ago', { x: Math.floor(comeFromBefore / 60) }) }}
  </span>
  <span v-else-if="comeFromBefore < 60 * 60 * 24">
    {{ t('x_hours_ago', { x: Math.floor(comeFromBefore / 60 / 60) }) }}
  </span>
  <span v-else>
    {{ dataString }}
  </span>
</template>

<style scoped></style>
