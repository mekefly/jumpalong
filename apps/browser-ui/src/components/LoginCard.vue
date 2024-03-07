<script lang="ts" setup>
import { useFlexibleRange } from "@/utils/use";
import FaviconVue from "./icon/Favicon.vue";
import ScrollbarVue from "./Scrollbar.vue";
const flexibleRange = useFlexibleRange(0, 480);
const scale = flexibleRange(0, 3);
const isSmallScreen = computed(() => scale.value < 3);
const { height, width } = useWindowSize();
</script>

<template>
  <n-card
    :class="{
      'absolute left-[50%] top-[50%] max-w-sm overflow-auto': !isSmallScreen,
      'h-full w-full flex flex-col': isSmallScreen,
    }"
    :style="{
      transform: !isSmallScreen ? 'translate(-50%,-50%)' : '',
    }"
  >
    <div class="flex-shrink-0">
      <slot name="header"></slot>
    </div>
    <div
      :class="{
        'h-full w-full flex flex-col flex-grow flex-shrink': isSmallScreen,
      }"
    >
      <div
        v-if="isSmallScreen && height * 0.7 > width"
        class="w-full flex flex-col justify-center items-center flex-shrink flex-grow h-0"
      >
        <n-icon :size="scale * 50">
          <FaviconVue />
        </n-icon>
        <h1>Jumpalong</h1>
      </div>
      <div
        :class="{
          'w-full flex flex-col justify-center flex-grow flex-shrink h-40':
            isSmallScreen,
        }"
      >
        <ScrollbarVue class="h-full">
          <div class="py-2">
            <slot></slot>
          </div>
        </ScrollbarVue>
      </div>
    </div>
  </n-card>
</template>

<style scoped></style>
