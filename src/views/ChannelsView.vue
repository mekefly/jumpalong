<script lang="ts" setup>
import { useNostrContainerGet } from "@/components/NostrContainerProvade";
import { t } from "@/i18n";
import { TYPES } from "@/nostr/nostr";
import router from "@/router";
import { computed } from "vue";
import ChannelListItemVue from "../components/ChannelListItem.vue";
const followChannel = useNostrContainerGet(TYPES.FollowChannel);

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
  <n-list class="mt-4" hoverable clickable>
    <n-list-item v-for="[key, value] in channelList">
      <ChannelListItemVue :channel-configuration-data="value" />
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
