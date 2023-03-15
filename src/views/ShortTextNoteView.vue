<script lang="ts" setup>
import ContentVue from "@/components/Content.vue";
import DateTimeVue from "@/components/DateTime.vue";
import PostListVue from "@/components/PostList.vue";
import SMSButtonVue from "@/components/SMSButton.vue";
import UserInfoVue from "@/components/UserInfo.vue";
import { deserializeTagR } from "@/nostr/tag";
import { useEvent } from "./ShortTextNoteView";
const event = useEvent();
const url = computed<Set<string>>(() => {
  if (!event.value) return new Set();
  return deserializeTagR(event.value?.tags);
});
</script>

<template>
  <div v-if="event">
    <UserInfoVue :pubkey="event.pubkey" :created_at="event.created_at">
      <template #bottom>
        <DateTimeVue :secondTimestamp="event.created_at" />
      </template>
      <template #right>
        <SMSButtonVue :event="event" :deleteEvent="() => {}" />
      </template>
    </UserInfoVue>
    <div class="p-5 font">
      <ContentVue :event="event" />
    </div>
    <div>
      <PostListVue :url="url" :filter="{ '#e': [event.id as string] }" />
    </div>
  </div>
</template>

<style scoped></style>
