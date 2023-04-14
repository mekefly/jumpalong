<script lang="ts" setup>
import PostList from "@/components/PostList.vue";
import Scrollbar from "@/components/Scrollbar.vue";
import { usePubkey } from "@/utils/nostrApiUse";
const pubkey = usePubkey({ intercept: true });
</script>

<template>
  <Scrollbar v-if="pubkey" loadable refreshable>
    <PostList
      active
      :filter="{
        ['#p']: [pubkey],
      }"
    ></PostList>
  </Scrollbar>
</template>

<style scoped></style>
