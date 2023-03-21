<script lang="ts" setup>
import { relayConfigurator, relayPool } from "../nostr/nostr";
import AddButtonVue from "./AddButton.vue";
import ButtonCloseVue from "./ButtonClose.vue";
import RelayConnectListVue from "./RelayConnectList.vue";
const pool = computed(() => {
  return relayPool.getPool();
});
const keys = computed(() => {
  return [...pool.value.keys()];
});
</script>

<template>
  <RelayConnectListVue :urls="keys" title="活动中继">
    <template #right="{ url }">
      <span class="flex-shrink-0"> ({{ pool.get(url)?.subIds.size }}) </span>
      <AddButtonVue
        :disabled="
          relayConfigurator.hasReadByUrl(url) ||
          relayConfigurator.hasWriteByUrl(url)
        "
        class="ml-2"
        @click="() => relayConfigurator.addWriteRead(url as any)"
      />
      <ButtonCloseVue
        class="ml-2"
        @click="() => relayConfigurator.addWriteRead(url as any)"
        @close="() => pool.get(url)?.close()"
      />
    </template>
  </RelayConnectListVue>
</template>

<style scoped></style>
