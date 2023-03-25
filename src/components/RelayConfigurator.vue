<script lang="ts" setup>
import { t } from "@/i18n";
import { NIcon, NSpace } from "naive-ui";
import { relayConfigurator } from "../nostr/nostr";
import BroadcastVue from "./Broadcast.vue";
import ButtonCloseVue from "./ButtonClose.vue";
import DateTimeVue from "./DateTime.vue";
import RelayConnectListVue from "./RelayConnectList.vue";
import TooltipVue from "./Tooltip.vue";

const urls = computed(() => Object.keys(relayConfigurator.getConfiguration()));

function switchWrite(url: string) {
  relayConfigurator.hasWriteByUrl(url)
    ? relayConfigurator.remoteWrite(url)
    : relayConfigurator.addWrite(url);
}
function switchRead(url: string) {
  relayConfigurator.hasReadByUrl(url)
    ? relayConfigurator.remoteRead(url)
    : relayConfigurator.addRead(url);
}
const value = ref("");
function addRelay() {
  if (!value.value) {
    return;
  }
  relayConfigurator.addWriteRead(value.value);
}

const message = useMessage();
function handleSave() {
  relayConfigurator.save();
  message.success(t("message.relay_configurator_save_message"));
}
function handleSync() {
  relayConfigurator.sync();
  message.success(t("message.relay_configurator_sync_message"));
}
const updateTime = computed(() => {
  const updateAt = relayConfigurator.getUpdateAt();
  if (!updateAt) return null;
  return updateAt;
});
</script>

<template>
  <RelayConnectListVue :urls="urls" :title="t('relay_configuration')">
    <template #header-extra>
      <n-icon class="mr-1"><EditCalendarRound /></n-icon>
      <DateTimeVue v-if="updateTime" :secondTimestamp="updateTime" />
      <span v-else>null</span>
    </template>
    <template #right="{ url }">
      <n-icon
        class="mr-1"
        :color="relayConfigurator.hasWriteByUrl(url) ? '#2ed573' : undefined"
        @click="() => switchWrite(url)"
      >
        <ArrowUpload16Filled />
      </n-icon>
      <n-icon
        class="mr-2"
        :color="relayConfigurator.hasReadByUrl(url) ? '#2ed573' : undefined"
        @click="() => switchRead(url)"
      >
        <ArrowDownload16Filled />
      </n-icon>
      <ButtonCloseVue text @click="() => relayConfigurator.remove(url)" />
    </template>
    <template #action>
      <n-space>
        <n-input
          v-model:value="value"
          type="text"
          placeholder="eg: wss://nostr.wine"
        />
        <n-button @click="addRelay" type="primary" :disabled="!value">
          {{ t("add") }}
        </n-button>
        <TooltipVue
          :tooltip="
            !relayConfigurator.hasChange()
              ? t('tips.currently_not_modified')
              : t('tips.save_changes')
          "
        >
          <n-button
            @click="handleSave"
            type="primary"
            :disabled="!relayConfigurator.hasChange()"
          >
            {{ t("save") }}
          </n-button>
        </TooltipVue>

        <TooltipVue
          :tooltip="
            relayConfigurator.hasChange()
              ? t('tips.relay_configurator_sync_has_change_tip')
              : t('tips.relay_configurator_sync_no_change_tip')
          "
        >
          <n-button
            @click="handleSync"
            type="primary"
            :disabled="relayConfigurator.hasChange()"
          >
            {{ t("sync") }}
          </n-button>
        </TooltipVue>
        <BroadcastVue />
      </n-space>
    </template>
  </RelayConnectListVue>
</template>

<style scoped></style>
