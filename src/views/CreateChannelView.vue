<script lang="ts" setup>
import { t } from "@/i18n";
import { getFollowChannelConfiguration } from "@/nostr/FollowChannel";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import { ChannelMetadata } from "@/nostr/staff/createUseChannelMetadata";
import { useOnOK } from "@/utils/use";
import ChannelMetadataEditVue from "../components/ChannelMetadataEdit.vue";

const followChannel = getFollowChannelConfiguration();

const message = useMessage();
const onOK = useOnOK();

const channelMetadata = ref<ChannelMetadata>({});
async function handleCreate() {
  if (!channelMetadata.value.name) {
    message.warning("请输入channelName");
    return;
  }
  const event = await rootEventBeltline.publish(
    {
      kind: 40,
      content: JSON.stringify(channelMetadata.value),
    },
    relayConfigurator.getWriteList(),
    { onOK }
  );
  if (event) {
    followChannel.joinChannel(event.id, {
      channelMetadata: channelMetadata.value,
    });
    message.success("创建成功");
  } else {
    message.warning("没有创建成功");
  }
}
</script>

<template>
  <n-space vertical>
    <ChannelMetadataEditVue :channelMetadata="channelMetadata" />
    <n-button @click="handleCreate">{{ t("create") }}</n-button>
  </n-space>
</template>

<style scoped></style>
