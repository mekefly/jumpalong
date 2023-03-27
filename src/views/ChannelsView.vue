<script lang="ts" setup>
import { t } from "@/i18n";
import { getFollowChannelConfiguration } from "@/nostr/FollowChannel";
import router from "@/router";
import { computed } from "vue";
import ChannelListItemVue from "../components/ChannelListItem.vue";
const followChannel = getFollowChannelConfiguration();

const reouter = useRouter();
const channelMap = computed(() => followChannel.getData());
const channelList = computed(() => channelMap.value.entries());
function handleCreate() {
  router.push({ name: "create-channel" });
}
</script>

<template>
  <div>
    <n-button @click="handleCreate">{{ t("create") }}</n-button>
  </div>
  <n-list hoverable clickable>
    <n-list-item v-for="[key, value] in channelList">
      <ChannelListItemVue :channel-configuration-data="value" />
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
