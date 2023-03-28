<script lang="ts" setup>
import {
  getChannelMessageBeltline,
  getChannelMetadataBeltlineByChannelId,
} from "@/api/channel";
import { getEventLineById } from "@/api/event";
import ChannelMessageListVue from "@/components/ChannelMessageList.vue";
import { useRichTextEditBoxOpt } from "@/components/RichTextEditBox";
import RichTextEditBoxVue from "@/components/RichTextEditBox.vue";
import ScrollbarVue from "@/components/Scrollbar.vue";
import { t } from "@/i18n";
import { getFollowChannelConfiguration } from "@/nostr/FollowChannel";
import { userKey } from "@/nostr/user";
import router from "@/router";
import { useClipboard } from "@/utils/naiveUi";
import { toDeCodeNevent } from "@/utils/nostr";
import { useHandleSendMessage } from "@/utils/use";
import { EventTemplate, nip19 } from "nostr-tools";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useJoinAndLeaveChannelHandle } from "./ChannelMessageView";

const route = useRoute();
const neventOpt = computed(() => toDeCodeNevent(route.params.value as string));
const eventId = computed<string | null | undefined>(() => neventOpt.value?.id);
console.log("eventId", eventId.value);
const followChannelConfiguration = getFollowChannelConfiguration();

//需要为显示区域和编辑区域架设一个隧道
watchEffect(() => {
  if (!eventId.value) return;
  useRichTextEditBoxOpt(eventId.value);
});

const messageBeltline = computed(() => {
  if (!eventId.value) return;
  return getChannelMessageBeltline(eventId.value);
});
const messageList = computed(
  () => messageBeltline.value && messageBeltline.value.getList()
);

const metadataLine = computed(
  () => eventId.value && getChannelMetadataBeltlineByChannelId(eventId.value)
);
const metadata = computed(
  () => metadataLine.value && metadataLine.value.feat.useMetadata()
);
const channelEvent = computed(() => {
  if (!eventId.value) return;
  const line = getEventLineById(eventId.value);
  metadataLine.value && line.addExtends(metadataLine.value);
  return line.feat.useEvent();
});

const message = useMessage();
function handleLoad() {
  //频道这里消息的显示顺序向反
  messageBeltline.value?.feat.refresh();
  message.info(t("refreshing"));
}
//轮寻的去订阅新消息
setInterval(() => {
  messageBeltline.value?.feat.refresh();
}, 8 * 1000);
function handleRefresh() {
  messageBeltline.value?.feat.load();
  message.info(t("loading"));
}

const { handleJoinChannel, handleLeaveChannel } =
  useJoinAndLeaveChannelHandle(eventId);
function switchJoinChannel() {
  if (isJoin.value) {
    handleLeaveChannel();
  } else {
    handleJoinChannel();
  }
}
const send = useHandleSendMessage(42, messageBeltline);

function handleSend(event: EventTemplate) {
  if (!eventId.value) return;

  event.tags = [...event.tags, ["e", eventId.value, "root"]];
  send(event);
}
const isJoin = computed(() => {
  if (!eventId.value) return false;
  return followChannelConfiguration.hasJoin(eventId.value);
});

const clipboard = useClipboard();
function createNevent() {
  if (!eventId.value) {
    return;
  }
  return nip19.neventEncode({
    id: eventId.value,
    relays: [...(messageBeltline.value?.getRelayUrls() ?? [])],
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
</script>

<template>
  <div v-if="eventId" class="flex flex-col h-full overflow-auto">
    <n-page-header
      v-if="metadata"
      class="flex-shrink-0"
      :subtitle="metadata.name"
      @back="$router.back"
    >
      <template #extra>
        <div class="felx items-center justify-center">
          <n-button
            v-if="channelEvent && channelEvent.pubkey === userKey.publicKey"
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
