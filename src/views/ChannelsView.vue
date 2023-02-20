<script lang="ts" setup>
import {
  getChannelEvent,
  getChannelMetadata,
  joinChannel,
} from "@/api/channel";
import { nip19 } from "nostr-tools";
import { computed, ref } from "vue";

const { events: channelEvent, pushEvent } = getChannelEvent();
const channelId = computed(() => {
  const ids = [] as string[];
  channelEvent.value.forEach((event) => {
    event.tags.forEach((tag) => {
      const t = tag[0];
      if (t === "e") {
        ids.push(tag[1]);
      }
    });
  });

  return ids;
});

const channelMetadatas = computed(() => {
  console.log(channelId.value);

  return channelId.value.map((id) => getChannelMetadata(id));
});

const channelNoteId = ref(
  "note1kntfymwsg28sh5mqztc8yxnsknpczsx3gxl6tm7zzea42xsdnleqpsg4ul"
);
const channelEventId = computed(
  () => nip19.decode(channelNoteId.value).data as string
);
function _joinChannel() {
  if (!channelEventId.value) return;
  console.log("channelEventId", channelEventId.value);

  joinChannel(channelEventId.value);
}
</script>

<template>
  <div>
    <input type="text" v-model="channelNoteId" /><button
      @click="_joinChannel()"
    >
      加入
    </button>
  </div>
  <div
    class="px-5 py-10"
    v-for="channelMetadata in channelMetadatas"
    @click="() => $router.push(`/channel/message/${channelMetadata.value.id}`)"
  >
    <h2>{{ channelMetadata.value.name }}</h2>
    <div>{{ channelMetadata.value.about }}</div>
  </div>
</template>

<style scoped></style>
