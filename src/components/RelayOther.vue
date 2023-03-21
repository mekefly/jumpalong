<script lang="ts" setup>
import { NSpace } from "naive-ui";
import { relayConfigurator } from "../nostr/nostr";
import AddButton from "./AddButton.vue";
import RelayConnectListVue from "./RelayConnectList.vue";

const other = computed(() => relayConfigurator.getOtherList());
</script>

<template>
  <RelayConnectListVue :urls="other" title="更多">
    <template #right="{ url }">
      <n-space justify="end" align="center">
        <AddButton
          :disabled="
            relayConfigurator.hasReadByUrl(url) ||
            relayConfigurator.hasWriteByUrl(url)
          "
          @click="() => relayConfigurator.addWriteRead(url)"
        />
      </n-space>
    </template>
  </RelayConnectListVue>
</template>

<style scoped></style>
