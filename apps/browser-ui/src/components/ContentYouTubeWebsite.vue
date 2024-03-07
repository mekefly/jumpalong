<script lang="ts" setup>
import { useScale } from "@/utils/use";

const props = defineProps<{ v: string }>();
const { v } = toRefs(props);

const url = computed(
  () => `https://www.youtube.com/embed/${v.value}?controls=0`
);

const [target] = useScale();
</script>

<template>
  <div ref="target" class="w-full rounded-xl overflow-hidden relative">
    <n-card class="h-full w-full">
      <iframe
        class="w-full h-full"
        :src="url"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </n-card>
  </div>
</template>

<style scoped></style>
