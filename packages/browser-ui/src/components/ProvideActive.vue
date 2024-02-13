<script lang="ts" setup>
import { provideActiveComponent } from './ProvideActive'
import { defineProps } from 'vue'
const props = defineProps<{
  active?: boolean
  name?:string
}>()
const { active } = toRefs(props)
provideActiveComponent(active)
</script>

<template>
  <slot></slot>
</template>

<style scoped></style>
