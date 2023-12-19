<script lang="ts" setup>
import { t } from "@/i18n";
import { relayConfigurator, TYPES } from "@/nostr/nostr";
import { WritableReadableList } from "@/nostr/tag";
import router from "@/router";
import { getPubkeyOrNull } from "@/utils/nostrApi";
import { useNostrContainerGet } from "./NostrContainerProvade";
import RelayAddButtonVue from "./RelayAddButton.vue";
import RelayConnectListVue from "./RelayConnectList.vue";
import RelayReadableButtonVue from "./RelayReadableButton.vue";
import RelayWritableButtonVue from "./RelayWritableButton.vue";
const props = defineProps<{
  pubkey: string;
  active: boolean;
}>();
const { pubkey } = toRefs(props);
const userApi = useNostrContainerGet(TYPES.UserApi);

const line = computed(() =>
  userApi.getUserRelayUrlConfigByPubkey(pubkey.value)
);
const readWriteList = computedAsync<WritableReadableList | undefined>(
  async () => {
    if (pubkey.value === ((await getPubkeyOrNull()) ?? "")) {
      return {
        readUrl: relayConfigurator.getReadList(),
        writeUrl: relayConfigurator.getWriteList(),
        urls: new Set(Object.keys(relayConfigurator.getData())),
      };
    }
    return line.value.feat.getReadWriteList();
  },
  undefined
);
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
