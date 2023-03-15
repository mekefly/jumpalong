<script lang="ts" setup>
import ContentVue from "@/components/Content.vue";
import DateTimeVue from "@/components/DateTime.vue";
import PostListVue from "@/components/PostList.vue";
import SMSButtonVue from "@/components/SMSButton.vue";
import UserInfoVue from "@/components/UserInfo.vue";
import { toDeCodeNevent } from "@/utils/nostr";
const route = useRoute();
const neventObj = computed(() => {
  return toDeCodeNevent(route.params["eventId"] as string);
});

const eventId = computed(() => {
  return neventObj.value?.id;
});
console.log("ShortTextNoteView");

const line = computed(() => {
  if (!eventId.value) return null;

  return null;
  // return getEventLineById(eventId.value);
});
const event = computed(() => line.value?.feat.useEvent());
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
      <ContentVue :content="event.content" />
    </div>
    <div>
      <PostListVue :filter="{ '#e': [event.id as string] }" />
    </div>
  </div>
</template>

<style scoped></style>
