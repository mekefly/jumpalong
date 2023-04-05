<script lang="ts" setup>
import PostList from "@/components/PostList.vue";
import Scrollbar from "@/components/Scrollbar.vue";
import { userKey } from "@/nostr/user";
</script>

<template>
  <Scrollbar loadable refreshable>
    <PostList
      active
      :filter="{
        ['#p']: [userKey.publicKey],
      }"
    ></PostList>
  </Scrollbar>
</template>

<style scoped></style>
