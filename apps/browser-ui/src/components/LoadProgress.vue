<script lang="ts" setup>
import { t } from "@/i18n";
import { useNowSecondTimestamp } from "@/utils/use";
import { useLoadProgressState } from "./LoadProgress";

const progressState = useLoadProgressState();
const message = useMessage();

const isLoading = computed(() => progressState?.bufferOpt.value?.isLoading);
const now = useNowSecondTimestamp();
const max = computed(() => {
  const loadBufferOpt = progressState?.bufferOpt.value;
  if (!loadBufferOpt) {
    return;
  }

  return Math.floor(Math.log2(now.value - loadBufferOpt.minSince));
});
const reversal = computed(() => {
  const loadBufferOpt = progressState?.bufferOpt.value;
  if (!loadBufferOpt) {
    return;
  }

  return loadBufferOpt.minSince === loadBufferOpt.createTime;
});
const current = computed(() => {
  const loadBufferOpt = progressState?.bufferOpt.value;
  if (!loadBufferOpt) {
    return;
  }
  const value = loadBufferOpt.until - loadBufferOpt.since;
  if (value === 0) {
    return 1;
  }

  return Math.floor(Math.log2(value));
});
const percentage = computed(() => {
  if (!current.value || !max.value) return;
  return (current.value / max.value) * 100;
});
watch(isLoading, () => {
  if (
    isLoading.value ||
    !progressState ||
    progressState.bufferOpt.value === null
  )
    return;
  if (current.value && max.value && current.value >= max.value) {
    message.success(t("all_loading_completed"));
  }

  progressState.bufferOpt.value = null;
});
</script>

<template>
  <div
    v-if="isLoading && current"
    class="h-4 w-4 flex justify-center items-center"
  >
    {{ current }}

    <n-progress
      v-if="percentage"
      class="absolute h-1 w-full left-0 bottom-0"
      type="line"
      :percentage="reversal ? 100 - percentage : percentage"
      :show-indicator="false"
      :offset-degree="120"
      :height="2"
      :style="{}"
    />
  </div>
</template>

<style scoped></style>
