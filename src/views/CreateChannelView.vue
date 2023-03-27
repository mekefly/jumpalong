<script lang="ts" setup>
import UploadInputVue from "@/components/UploadInput.vue";
import { t } from "@/i18n";
import { getFollowChannelConfiguration } from "@/nostr/FollowChannel";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import { ChannelMetadata } from "@/nostr/staff/createUseChannelMetadata";

const followChannel = getFollowChannelConfiguration();

const message = useMessage();
const channelMetadata = ref<ChannelMetadata>({});
function handleCreate() {
  if (!channelMetadata.value.name) {
    message.warning("请输入channelName");
    return;
  }
  const event = rootEventBeltline.publish(
    {
      kind: 40,
      content: JSON.stringify(channelMetadata.value),
    },
    relayConfigurator.getWriteList()
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
    <n-input placeholder="name" v-model:value="channelMetadata.name"></n-input>
    <n-input
      placeholder="about"
      v-model:value="channelMetadata.about"
    ></n-input>
    <UploadInputVue
      placeholder="picture"
      v-model:value="channelMetadata.picture"
    ></UploadInputVue>
    <n-button @click="handleCreate">{{ t("create") }}</n-button>
  </n-space>
</template>

<style scoped></style>
