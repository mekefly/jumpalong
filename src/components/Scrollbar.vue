<script lang="ts" setup>
import { useProviteScrollbarInstRef } from "./Scrollbar";
const { scrollbarInstRef, handleOnScroll } = useProviteScrollbarInstRef();
</script>

<template>
  <div class="wraps flex flex-col h-full">
    <n-scrollbar
      class="w-full flex-shrink flex-1"
      @scroll="handleOnScroll"
      ref="scrollbarInstRef"
    >
      <slot></slot>
    </n-scrollbar>
  </div>
</template>

<style scoped>
.wraps {
  mask-image: -webkit-linear-gradient(
    rgba(0, 0, 0, 0) 0em,
    rgba(0, 0, 0, 1) 0.5em,
    rgba(0, 0, 0, 1) calc(100% - 0.5em),
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
