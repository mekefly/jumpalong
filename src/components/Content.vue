<script lang="ts" setup>
import { computed } from "vue";

const { content } = defineProps<{ content: string }>();
const list = computed(() => {
  return content.split("\n").map((row) => {
    if (["http://", "https://"].some((v) => row.startsWith(v))) {
      if ([".jpg", ".png", ".gif"].some((v) => row.endsWith(v))) {
        return ["img", row];
      } else {
        // https://xxx.com 这种不应该预览
        if (!(row.split(" ").length > 1)) {
          return ["website", row];
        }
      }
    }
    return ["text", row];
  });
});
</script>

<template>
  <div v-for="item in list">
    <div
      class="flex w-full items-center max-h-screen rounded-2xl overflow-hidden"
      v-if="item[0] === 'img'"
    >
      <n-image class="img w-full" :src="item[1]" />
    </div>

    <a v-else-if="item[0] === 'website'" :href="item[1]">{{ item[1] }}</a>
    <div
      class="flex"
      style="table-layout: fixed; word-break: break-all; word-wrap: break-word"
      v-else
    >
      {{ item[1] }}
    </div>
  </div>
</template>

<style scoped>
.img >>> img {
  width: 100%;
}
</style>
