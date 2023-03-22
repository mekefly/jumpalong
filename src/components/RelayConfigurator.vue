<script lang="ts" setup>
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
  message.success(
    "你的中继信息已保存到本地，正在准备上传，您可以继续您的其他操作"
  );
}
function handleSync() {
  relayConfigurator.sync();
  message.success(
    "同步已经开始了，将试图更新中继中的旧数据和，从中续中找到最新的配置"
  );
}
const updateTime = computed(() => {
  const updateAt = relayConfigurator.getUpdateAt();
  if (!updateAt) return null;
  return updateAt;
});
</script>

<template>
  <RelayConnectListVue :urls="urls" title="中继配置">
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
          添加
        </n-button>
        <TooltipVue
          :tooltip="
            !relayConfigurator.hasChange()
              ? '当前没有修改'
              : '保存是保存修改的意思，有修改行为需要保存，同步不会保存数据'
          "
        >
          <n-button
            @click="handleSave"
            type="primary"
            :disabled="!relayConfigurator.hasChange()"
          >
            保存
          </n-button>
        </TooltipVue>

        <TooltipVue
          :tooltip="
            relayConfigurator.hasChange()
              ? '当前已有数据更改，您应该点击保存，如果您不希望保存，您应该刷新'
              : '同步是从云端找到最新的配置信息，同时把云端比当前旧的记录更新为最新'
          "
        >
          <n-button
            @click="handleSync"
            type="primary"
            :disabled="relayConfigurator.hasChange()"
          >
            同步
          </n-button>
        </TooltipVue>
        <BroadcastVue />
      </n-space>
    </template>
  </RelayConnectListVue>
</template>

<style scoped></style>
