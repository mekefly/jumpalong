<script lang="ts" setup>
import ArrowDownload16Filled from "./icon/ArrowDownload16Filled.vue";

const props = defineProps<{
  active: boolean;
}>();
const active = toRef(props, "active");
</script>

<template>
  <n-icon
    class="mr-2"
    :color="active ? '#2ed573' : undefined"
    @click="() => $emit('switch')"
  >
    <ArrowDownload16Filled />
  </n-icon>
</template>

<style scoped></style>
