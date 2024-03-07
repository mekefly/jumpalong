<script lang="ts" setup>
const props = withDefaults(defineProps<{ numOfRows?: number }>(), {
  numOfRows: 1,
});
const { numOfRows } = toRefs(props);
</script>

<template>
  <div
    class="overflow-hidden relative wraps flex flex-shrink"
    :style="{
      height: `${numOfRows + 0.5}em`,
      fontSize: `${numOfRows}em`,
    }"
  >
    <span
      :style="{
        'word-break': 'break-all',
        'text-overflow': 'ellipsis',
        'word-wrap': 'break-word',
      }"
    >
      <slot></slot>
      <n-tooltip trigger="hover">
        <template #trigger>
          <!-- 和上层文本一样大的 -->
          <div class="absolute top-0 left-0 bottom-0 right-0"></div>
        </template>
        <slot></slot>
      </n-tooltip>
    </span>
    <div class="w-4 flex-shrink-[999]"></div>
  </div>
</template>

<style scoped>
.wraps {
  mask-image: -webkit-linear-gradient(
    left,
    rgba(0, 0, 0, 1) calc(100% - 1em),
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
