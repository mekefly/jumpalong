<script lang="ts" setup>
const props = defineProps<{
  active: boolean;
}>();
const active = toRef(props, "active");
</script>

<template>
  <n-icon
    class="mr-1"
    :color="active ? '#2ed573' : undefined"
    @click="() => $emit('switch')"
  >
    <ArrowUpload16Filled />
  </n-icon>
</template>

<style scoped></style>
