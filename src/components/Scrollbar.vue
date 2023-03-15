<script lang="ts" setup>
import { useProviteScrollbarInstRef } from "./Scrollbar";
const { scrollbarInstRef, handleOnScroll } = useProviteScrollbarInstRef();
</script>

<template>
  <n-scrollbar @scroll="handleOnScroll" ref="scrollbarInstRef">
    <slot></slot>
  </n-scrollbar>
</template>

<style scoped></style>
