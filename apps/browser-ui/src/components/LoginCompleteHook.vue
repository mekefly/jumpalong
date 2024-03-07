<script lang="ts" setup>
import { provideLoginCompleteHook } from "./LoginCompleteHook";
const props = defineProps<{ mapKey: string }>();
const key = computed(() => props.mapKey);

provideLoginCompleteHook(key);
</script>

<template>
  <slot></slot>
</template>

<style scoped></style>
