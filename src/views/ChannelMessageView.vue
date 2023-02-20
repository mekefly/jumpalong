<script lang="ts" setup>
import { getChannelMessage } from "@/api/channel";
import { nip19 } from "nostr-tools";
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

const id = computed(() => useRoute().params.id);
watchEffect(() => {
  console.log("这里是channel", id);
});

const channelMessage = computed(() => getChannelMessage(id.value as string));


const messages = computed(() => {
  console.log(channelMessage.value.events);

  return channelMessage.value.events.value.map((item: any) => {
    return { content: item.content, id: item.id, pubkey: item.pubkey };
  });
});
</script>

<template>
  <div class="px-4 py-6" v-for="msg in messages">
    <h2 class="px-4 py-6">{{ msg.pubkey }}</h2>
    <div class="px-4 py-6 bg-[#ced6e0] rounded-md">
      {{ msg.content }}
    </div>
  </div>
</template>

<style scoped></style>
