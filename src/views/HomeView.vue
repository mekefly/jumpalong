<script lang="ts" setup>
import { localContacts } from "../api/Contact";
import EditNewMessage from "../components/EditNewMessage.vue";
import PostList from "../components/PostList.vue";
</script>

<template>
  <n-tabs
    default-value="MyFeed"
    justify-content="space-evenly"
    type="line"
    animated
  >
    <n-tab-pane name="MyFeed" tab="我关注的" display-directive="show:lazy">
      <PostList :pubkey="Object.keys(localContacts?.contacts ?? {})" />
    </n-tab-pane>
    <n-tab-pane name="GlobalFeed" tab="全局" display-directive="show:lazy">
      <PostList />
    </n-tab-pane>
  </n-tabs>
  <EditNewMessage />
</template>

<style scoped></style>
