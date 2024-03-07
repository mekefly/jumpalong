<script lang="ts" setup>
import PostList from "@/components/PostList.vue";
import { getCategorizedBookmarksSynchronizer } from "@/nostr/Synchronizer/CategorizedBookmarksSynchronizer";
const collectSynchronizer = getCategorizedBookmarksSynchronizer();
const list = computed(() => collectSynchronizer.getList());
</script>

<template>
  <Scrollbar class="flex-shrink flex-1">
    <n-collapse v-for="item in list">
      <n-collapse-item :title="`${item.name}(${item.size})`" :name="item.name">
        <div v-for="[type, set] in item.map">
          <PostList
            :tags="Array.from(set, (item) => [String(type), item])"
          ></PostList>
        </div>
      </n-collapse-item>
    </n-collapse>
  </Scrollbar>
</template>

<style scoped></style>
