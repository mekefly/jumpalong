<script lang="ts" setup>
import contactConfiguration from "@/api/Contact";
import { computed } from "vue";
import ChannelListItemVue from "../components/ChannelListItem.vue";

const channelList = computed(() => contactConfiguration.getChannelList());
</script>

<template>
  <n-list hoverable clickable>
    <n-list-item v-for="metadata in channelList">
      <ChannelListItemVue :metadata="metadata" />
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
