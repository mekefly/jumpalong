<script lang="ts" setup>
const props = defineProps<{
  tooltip?: string;
}>();
const show = ref(false);
</script>

<template>
  <div>
    <n-tooltip trigger="manual" :show="show">
      <template #trigger>
        <div
          @mouseenter="() => (show = true)"
          @mouseleave="() => (show = false)"
        >
          <slot></slot>
        </div>
      </template>
      <slot name="tooltip">{{ props.tooltip }}</slot>
    </n-tooltip>
  </div>
</template>

<style scoped></style>
