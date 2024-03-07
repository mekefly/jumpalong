<script lang="ts" setup>
import { lightTheme } from 'naive-ui'

import { switchTheme, theme } from '../App'

const nextThemeColor = computed(() =>
  theme.value?.name === lightTheme?.name ? t('dark') : t('bright')
)
</script>

<template>
  <n-button quaternary @click="switchTheme">
    {{ nextThemeColor }}
  </n-button>
</template>

<style scoped></style>
