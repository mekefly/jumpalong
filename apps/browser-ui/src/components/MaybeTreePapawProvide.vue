<script lang="ts" setup>
import { provideMaybeTreePapaw } from "./MaybeTreePapaw";
const props = defineProps<{
  useTree: boolean;
}>();
provideMaybeTreePapaw(toRef(props, "useTree"));
</script>

<template>
  <slot></slot>
</template>

<style scoped></style>
