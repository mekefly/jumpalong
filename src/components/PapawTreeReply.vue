<script lang="ts" setup>
import { t } from "@/i18n";
import { deserializeTagR } from "@/nostr/tag";
import { Event } from "nostr-tools";
import MaybeTreePapawProvide from "./MaybeTreePapawProvide.vue";
import PostList from "./PostList.vue";

const props = defineProps<{ event: Event; noTree?: boolean }>();

const id = computed(() => props.event.id);
const relays = computed(() => deserializeTagR(props.event.tags));
const postListRef = ref<any>();
const limit = 5;
const postLength = computed(() => postListRef.value?.postEvents?.length ?? 0);
</script>

<template>
  <MaybeTreePapawProvide :useTree="!noTree">
    <PostList
      ref="postListRef"
      :limit="limit"
      disabledEmpty
      reverseSort
      :filter="{
        '#e': [id],
        kinds: [1, 30023],
      }"
      :urls="relays"
    ></PostList>
    <div
      v-if="postLength > 0"
      class="w-full flex justify-center items-center py-2"
    >
      <n-button class="w-full" text @click="postListRef?.load">
        {{ t("load_more") }}
      </n-button>
    </div>
  </MaybeTreePapawProvide>
</template>

<style scoped></style>
