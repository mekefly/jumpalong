<script lang="ts" setup>
import { provideLoginCompleteHooks } from '../components/LoginCompleteHook'
provideLoginCompleteHooks()
</script>

<template>
  <slot></slot>
</template>

<style scoped></style>
