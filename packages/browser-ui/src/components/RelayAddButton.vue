<script lang="ts" setup>
import { relayConfigurator } from "@/nostr/nostr";
import AddButtonVue from "./AddButton.vue";
defineProps<{
  url: string;
}>();
</script>

<template>
  <AddButtonVue
    :disabled="
      relayConfigurator.hasReadByUrl(url) ||
      relayConfigurator.hasWriteByUrl(url)
    "
    @click="
      () => {
        relayConfigurator.addWriteRead(url);
        $emit('click');
      }
    "
  />
</template>

<style scoped></style>
