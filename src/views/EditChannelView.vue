<script lang="ts" setup>
import { getChannelMetadataBeltlineByChannelId } from "@/api/channel";
import ChannelMetadataEditVue from "@/components/ChannelMetadataEdit.vue";
import { t } from "@/i18n";
import { getFollowChannelConfiguration } from "@/nostr/FollowChannel";
import { relayConfigurator } from "@/nostr/nostr";
import { ChannelMetadata } from "@/nostr/staff/createUseChannelMetadata";
import { toDeCodeNevent } from "@/utils/nostr";
import { useOnOK } from "@/utils/use";

const message = useMessage();
const route = useRoute();
const neventOpt = computed(() => toDeCodeNevent(route.params.value as string));
const eventId = computed(() => neventOpt.value?.id);

const followChannelConfiguration = getFollowChannelConfiguration();

const channelMetadata = ref<ChannelMetadata>({});

const channelLine = computed(() => {
  if (!eventId.value) {
    return;
  }
  return getChannelMetadataBeltlineByChannelId(eventId.value);
});

const metadata = computed(() => channelLine.value?.feat.useMetadata());
watch(
  () => metadata.value,
  () => {
    Object.assign(channelMetadata.value, metadata.value);
  },
  { deep: true, immediate: true }
);
const onOK = useOnOK();
function handleSave() {
  if (!eventId.value) {
    return;
  }
  if (!channelMetadata.value.name) {
    message.warning("请输入channelName");
    return;
  }
  if (!channelLine.value) {
    return;
  }

  const relay = [...relayConfigurator.getWriteList()][0];

  channelMetadata.value.relayUrls = [
    ...new Set([
      ...relayConfigurator.getReadList(),
      ...relayConfigurator.getWriteList(),
    ]),
  ];
  const event = channelLine.value.publish(
    {
      kind: 41,
      content: JSON.stringify(channelMetadata.value),
      tags: [["e", eventId.value, relay]],
    },

    relayConfigurator.getWriteList(),
    { onOK }
  );
  followChannelConfiguration.setChannelmetadata(
    eventId.value,
    channelMetadata.value
  );
}
</script>

<template>
  <n-space vertical>
    <ChannelMetadataEditVue :channelMetadata="channelMetadata" />
    <n-button @click="handleSave">{{ t("save") }}</n-button>
  </n-space>
</template>

<style scoped></style>
