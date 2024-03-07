<script lang="ts" setup>
import { NCheckbox } from 'naive-ui'
let checked = defineModel<boolean>('absentPrompt')
defineProps<{
  message?: string
}>()
</script>

<template>
  <n-space>
    <span v-if="message"> {{ message }} </span>
    <slot></slot>
    <n-checkbox v-if="checked !== undefined" v-model:checked="checked">
      七日内不再提示
    </n-checkbox>
  </n-space>
</template>

<style scoped></style>
