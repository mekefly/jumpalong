<script lang="ts" setup>
import Article from "@/components/Article.vue";
import { proviteArticeSetting, useMarkdownState } from "@/components/Markdown";
import { deserializeTagR } from "@/nostr/tag";

const route = useRoute();
const value = computed(() => route.params.value as string);

const { event } = useMarkdownState(value);

const loadingBar = useLoadingBar();
loadingBar.start();

watch(
  event,
  () => {
    if (event.value) {
      setTimeout(() => {
        loadingBar.finish();
      });
    }
  },
  { deep: true, immediate: true }
);

//显示完整消息
proviteArticeSetting({ showArticleDetails: true });

const urls = computed<Set<string>>(() => {
  if (!event.value) return new Set();
  return deserializeTagR(event.value?.tags);
});
</script>

<template>
  <Article v-if="event" :event="event" :urls="urls"></Article>
</template>

<style scoped></style>
