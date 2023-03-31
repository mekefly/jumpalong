<script lang="ts" setup>
const props = defineProps<{
  active: boolean;
}>();
const active = toRef(props, "active");
</script>

<template>
  <n-icon
    class="mr-2"
    :color="active ? '#2ed573' : undefined"
    @click="() => $emit('click')"
  >
    <ArrowDownload16Filled />
  </n-icon>
</template>

<style scoped></style>
