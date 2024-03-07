<script lang="ts" setup>
const router = useRouter();
const route = useRoute();
const exclude = ref(["MarkdownEditorView"]);
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="exclude">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
