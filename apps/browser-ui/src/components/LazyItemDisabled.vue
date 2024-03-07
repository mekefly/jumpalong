<script lang="ts" setup>
import LazyItemVue from "./LazyItem.vue";

const props = withDefaults(
  defineProps<{
    show?: null | boolean | undefined;
    minHeight?: number | string;
    transitionDuration?: number;
    disabled?: boolean;
    delay?: number;
  }>(),
  { show: null, minHeight: 0, transitionDuration: 500, delay: 500 }
);
</script>

<template>
  <slot v-if="disabled"></slot>
  <LazyItemVue v-else v-bind="props"><slot></slot></LazyItemVue>
</template>

<style scoped></style>
