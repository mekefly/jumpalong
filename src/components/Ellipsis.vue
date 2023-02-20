<script lang="ts" setup>
const { numOfRows = 1 } = defineProps<{ numOfRows?: number }>();
</script>

<template>
  <div
    class="overflow-hidden relative"
    :style="{
      height: `${numOfRows + 0.5}em`,
      fontSize: `${numOfRows}em`,
      tableLayout: 'fixed',
      wordBreak: 'break-all',
      wordWrap: 'break-word',
    }"
  >
    <span class="relative">
      <slot></slot>
      <n-tooltip trigger="hover">
        <template #trigger>
          <!-- 和上层文本一样大的 -->
          <div class="absolute top-0 left-0 bottom-0 right-0"></div>
        </template>
        <slot></slot>
      </n-tooltip>
    </span>
  </div>
</template>

<style scoped></style>
