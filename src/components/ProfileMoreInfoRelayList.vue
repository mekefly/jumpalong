<script lang="ts" setup>
import { getUserRelayUrlConfigByPubkey } from "@/api/user";
import { t } from "@/i18n";
import { relayConfigurator } from "@/nostr/nostr";
import { WritableReadableList } from "@/nostr/tag";
import { userKey } from "@/nostr/user";
import router from "@/router";
import RelayAddButtonVue from "./RelayAddButton.vue";
import RelayConnectListVue from "./RelayConnectList.vue";
import RelayReadableButtonVue from "./RelayReadableButton.vue";
import RelayWritableButtonVue from "./RelayWritableButton.vue";
const props = defineProps<{
  pubkey: string;
}>();
const { pubkey } = toRefs(props);

const line = computed(() => getUserRelayUrlConfigByPubkey(pubkey.value));
const readWriteList = computed<WritableReadableList | undefined>(() => {
  if (pubkey.value === userKey.value.publicKey) {
    return {
      readUrl: relayConfigurator.getReadList(),
      writeUrl: relayConfigurator.getWriteList(),
      urls: new Set(Object.keys(relayConfigurator.getData())),
    };
  }
  return line.value.feat.getReadWriteList();
});
const urls = computed(() => {
  return readWriteList.value?.urls;
});

function handleSave() {
  router.push({
    name: "relays",
  });
}
</script>

<template>
  <n-collapse-transition :show="relayConfigurator.hasChange()">
    <n-button @click="handleSave" type="primary">
      {{ t("save") }}
    </n-button>
  </n-collapse-transition>
  <RelayConnectListVue :urls="urls ?? []" title="">
    <template #right="{ url }">
      <RelayWritableButtonVue
        :active="readWriteList?.writeUrl.has(url) ?? false"
        class="mr-1"
      />
      <RelayReadableButtonVue
        :active="readWriteList?.readUrl.has(url) ?? false"
        class="mr-2"
      />

      <RelayAddButtonVue :url="url" />
    </template>
  </RelayConnectListVue>
</template>

<style scoped></style>
