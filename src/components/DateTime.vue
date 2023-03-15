<script lang="ts" setup>
import { nowSecondTimestamp } from "../utils/utils";

const props = defineProps<{ secondTimestamp: number }>();
const { secondTimestamp } = toRefs(props);
const comeFromBefore = computed(() => {
  return nowSecondTimestamp() - secondTimestamp.value;
});
</script>

<template>
  <span v-if="comeFromBefore < 60"> {{ comeFromBefore }}秒前 </span>
  <span v-else-if="comeFromBefore < 3600">
    {{ Math.floor(comeFromBefore / 60) }}分钟前
  </span>
  <span v-else-if="comeFromBefore < 60 * 60 * 24">
    {{ Math.floor(comeFromBefore / 60 / 60) }}小时前
  </span>
  <span v-else>
    {{
      `${new Date(secondTimestamp * 1000).getFullYear()}-` +
      `${new Date(secondTimestamp * 1000).getMonth()}-` +
      `${new Date(secondTimestamp * 1000).getDay()}`
    }}
  </span>
</template>

<style scoped></style>
