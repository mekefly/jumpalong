<script lang="ts" setup>
import ChannelMessageListVue from "@/components/ChannelMessageList.vue";
import { autoSetLoadBuffer } from "@/components/LoadProgress";
import { useNostrContainerGet } from "@/components/NostrContainerProvade";
import { useRichTextEditBoxOpt } from "@/components/RichTextEditBox";
import RichTextEditBoxVue from "@/components/RichTextEditBox.vue";
import ScrollbarVue from "@/components/Scrollbar.vue";
import { t } from "@/i18n";
import { TYPES } from "@/nostr/nostr";
import router from "@/router";
import { useClipboardDialog } from "@/utils/naiveUi";
import { toDeCodeNevent } from "@/utils/nostr";
import { usePubkey } from "@/utils/nostrApiUse";
import { useHandleSendMessage } from "@/utils/use";
import { EventTemplate, nip19 } from "nostr-tools";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useJoinAndLeaveChannelHandle } from "./ChannelMessageView";

const route = useRoute();
const neventOpt = computed(() => toDeCodeNevent(route.params.value as string));
const channelId = computed<string | null | undefined>(
  () => neventOpt.value?.id
);

const followChannelConfiguration = useNostrContainerGet(
  TYPES.FollowChannelSynchronizer
);

//需要为显示区域和编辑区域架设一个隧道
watchEffect(() => {
  if (!channelId.value) return;
  useRichTextEditBoxOpt(channelId.value);
});
const channelConfigurationData = computed(() =>
  channelId.value
    ? followChannelConfiguration.getData().get(channelId.value)
    : undefined
);

const cahnnelMessageBeltline = useNostrContainerGet(
  TYPES.CahnnelMessageBeltline
);

const relayUrls = computed(() => channelConfigurationData.value?.relayUrls);
const messageBeltline = computed(() => {
  if (!channelId.value) return;
  return cahnnelMessageBeltline.getChannelMessageBeltline(channelId.value, {
    urls: relayUrls.value,
  });
});
autoSetLoadBuffer(messageBeltline);

const messageList = computed(
  () => messageBeltline.value && messageBeltline.value.getList()
);

const metadataLine = computed(
  () =>
    channelId.value &&
    cahnnelMessageBeltline.getChannelMetadataBeltlineByChannelId(
      channelId.value
    )
);
const metadata = computed(
  () => metadataLine.value && metadataLine.value.feat.useMetadata()
);
const channelEvent = computed(() => {
  if (!channelId.value) return;
  return channelConfigurationData.value?.event;
});

const message = useMessage();
function handleLoad() {
  //频道这里消息的显示顺序向反
  messageBeltline.value?.feat.refresh();
  message.info(t("refreshing"));
}
function handleRefresh() {
  messageBeltline.value?.feat.load();
  message.info(t("loading"));
}

//轮寻新消息
setInterval(() => {
  messageBeltline.value?.feat.refresh();
}, 15000);

const { handleJoinChannel, handleLeaveChannel } =
  useJoinAndLeaveChannelHandle(channelId);
function switchJoinChannel() {
  if (isJoin.value) {
    handleLeaveChannel();
  } else {
    handleJoinChannel();
  }
}
const send = useHandleSendMessage(42, messageBeltline);

function handleSend(event: EventTemplate) {
  if (!channelId.value) return;

  event.tags = [...event.tags, ["e", channelId.value, "root"]];

  for (const url of relayUrls.value ?? []) {
    event.tags.push(["r", url]);
  }

  send(event);
}
const isJoin = computed(() => {
  if (!channelId.value) return false;
  return followChannelConfiguration.hasJoin(channelId.value);
});

const clipboard = useClipboardDialog();
function createNevent() {
  if (!channelId.value) {
    return;
  }
  return nip19.neventEncode({
    id: channelId.value,
    relays: [...(relayUrls.value ?? [])],
  });
}
function handleShareChannel() {
  const nevent = createNevent();
  if (!nevent) return;
  clipboard(nevent);
}
function handleEditChannel() {
  const nevent = createNevent();
  if (!nevent) return;
  router.push({ name: "edit-channel", params: { value: nevent } });
}
const currentPubkey = usePubkey();
</script>

<template>
  <div v-if="channelId" class="flex flex-col h-full overflow-auto">
    <n-page-header
      v-if="metadata"
      class="flex-shrink-0"
      :subtitle="metadata.name"
      @back="$router.back"
    >
      <template #extra>
        <div class="felx items-center justify-center">
          <n-button
            v-if="channelEvent && channelEvent.pubkey === currentPubkey"
            class="mr-2"
            round
            @click="handleEditChannel"
          >
            <n-icon>
              <Edit />
            </n-icon>
          </n-button>
          <n-button class="mr-2" round @click="handleShareChannel">
            <n-icon>
              <MdShare />
            </n-icon>
          </n-button>
          <n-button
            round
            :type="isJoin ? 'default' : 'primary'"
            @click="switchJoinChannel"
          >
            {{ isJoin ? t("leave") : t("join") }}
          </n-button>
        </div>
      </template>
    </n-page-header>

    <ScrollbarVue
      class="flex-shrink flex-1"
      loadable
      refreshable
      @load="handleLoad"
      @refresh="handleRefresh"
    >
      <ChannelMessageListVue
        v-if="messageBeltline"
        :eventList="messageBeltline.getList()"
      />
    </ScrollbarVue>
    <RichTextEditBoxVue @send="handleSend" />
  </div>
</template>

<style scoped></style>
