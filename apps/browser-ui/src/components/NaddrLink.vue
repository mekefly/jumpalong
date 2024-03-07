<script lang="ts" setup>
import { useMarkdownState } from "./Markdown";

const props = defineProps<{
  addr: string;
}>();
const addr = toRef(props, "addr");

const { event, longFormContentOptions } = useMarkdownState(addr);
</script>

<template>
  <RouterLink
    :to="{
      name: 'article',
      params: {
        value: addr,
      },
    }"
  >
    <slot>{{ longFormContentOptions?.title ?? addr }}</slot>
  </RouterLink>
</template>

<style scoped></style>
