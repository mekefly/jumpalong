<script lang="ts" setup>
import contactConfiguration from "@/api/Contact";
import { computed, ref } from "vue";
import ChannelListItemVue from "../components/ChannelListItem.vue";

// const chinnelsBeltline = getLikeChannelBeltline();
const channelList = computed(() => contactConfiguration.getChannelList());
watchEffect(() => {
  console.log(
    "contactConfiguration.getChannelConfiguration()",
    contactConfiguration.getChannelConfiguration()
  );
});
// setInterval(() => {
//   console.log(
//     "getChannelList.value",
//     contactConfiguration.getChannelConfiguration()
//   );
// }, 1000);

const channelNoteId = ref(
  "note1kntfymwsg28sh5mqztc8yxnsknpczsx3gxl6tm7zzea42xsdnleqpsg4ul"
);
</script>

<template>
  <n-list hoverable clickable>
    <n-list-item
      v-for="metadata in channelList"
      @click="
        () =>
          $router.push({
            name: 'channel-message',
            params: { eventId: metadata.eventId },
          })
      "
    >
      <ChannelListItemVue :metadata="metadata" />
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
