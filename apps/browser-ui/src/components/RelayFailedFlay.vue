<script lang="ts" setup>
import { failedUrl } from "../api/relays";
const { url } = defineProps<{ url: string }>();
</script>

<template>
  <div
    class="h-4 w-4 rounded-full"
    :style="{
      border: '1px solid #747d8c',
      backgroundColor: failedUrl.has(url) ? 'red' : 'white',
    }"
  ></div>
</template>

<style scoped></style>
