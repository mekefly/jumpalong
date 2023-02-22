<script lang="ts" setup>
import { Delete28Regular } from "@vicons/fluent";
import { NSkeleton, NSpace } from "naive-ui";
import { ref } from "vue";
import { getGlobalShortTextEvent } from "../api/event";
import {
  getUserMetadataByPubkey,
  userKey,
  type UserMetaData,
} from "../api/user";
import profile from "../assets/profile-2-400x400.png";
import Content from "./Content.vue";

const { pubkey } = defineProps<{ pubkey?: string[] }>();

const {
  events: posts,
  pushEvent,
  deleteEvent,
  on,
} = getGlobalShortTextEvent(pubkey);

const v = ref({} as Record<string, UserMetaData>);
on("push", async (e) => {
  v.value[e.pubkey] = { name: e.pubkey.slice(0, 10) };
  const data = await getUserMetadataByPubkey(e.pubkey);

  if (!data) return;
  v.value[e.pubkey] = data;
});
</script>

<template>
  <div>
    <div class="p-6" v-if="!posts.length">
      <n-space vertical>
        <n-card class="" v-for="_ in Array(10)">
          <n-space vertical class="p-8">
            <n-space class="flex" align="center">
              <NSkeleton circle class="w-12 h-12"></NSkeleton>
              <NSkeleton text class="w-80 h-6" :sharp="false"></NSkeleton>
            </n-space>
            <n-skeleton text :repeat="4" round />
          </n-space>
        </n-card>
      </n-space>
    </div>
    <n-empty v-if="!posts.length" description="你什么也找不到"> </n-empty>

    <div
      class="w-max-full bg-[#dfe4ea] rounded-2xl mb-6 mr-6 ml-6"
      v-for="post in posts"
    >
      <div class="p-3 flex justify-between items-center">
        <div
          class="flex items-center cursor-pointer"
          @click="$router.push(`/profile/${post.pubkey}`)"
        >
          <img
            class="h-12 w-12 bg-white rounded-full"
            :src="v?.[post.pubkey]?.picture ?? profile"
          />
          <div class="font-bold ml-2">
            {{ v?.[post.pubkey]?.name }}
          </div>
          <span class="ml-4">
            {{
              `${new Date(post.created_at * 1000).getFullYear()}.` +
              `${new Date(post.created_at * 1000).getMonth()}.` +
              `${new Date(post.created_at * 1000).getDay()}`
            }}
          </span>
        </div>
        <n-button
          quaternary
          circle
          type="error"
          v-if="post.pubkey === userKey.publicKey"
          @click="() => deleteEvent(post.id as any)"
        >
          <template #icon>
            <Delete28Regular />
          </template>
        </n-button>
      </div>
      <div class="p-5 font">
        <Content :content="post.content" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
