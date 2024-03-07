<script lang="ts" setup>
import { useThemeVars } from "naive-ui";

const props = defineProps<{
  k: string;
  v?: string;
}>();
const theme = useThemeVars();
</script>

<template>
  <div class="flex flex-wrap">
    <div
      :style="{
        color: theme.primaryColor,
      }"
    >
      {{ k }}:
    </div>
    &nbsp;
    <div>{{ v }}</div>
  </div>
</template>

<style scoped></style>
