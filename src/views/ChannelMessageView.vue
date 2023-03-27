<script lang="ts" setup>
import {
  getChannelMessageBeltline,
  getChannelMetadataBeltlineByChannelId,
} from "@/api/channel";
import contactConfiguration from "@/api/Contact";
import PapawVue from "@/components/Papaw.vue";
import { useRichTextEditBoxOpt } from "@/components/RichTextEditBox";
import RichTextEditBoxVue from "@/components/RichTextEditBox.vue";
import ScrollbarVue from "@/components/Scrollbar.vue";
import { t } from "@/i18n";
import { toDeCodeNevent } from "@/utils/nostr";
import { useHandleSendMessage } from "@/utils/use";
import { EventTemplate } from "nostr-tools";
import { computed } from "vue";
import { useRoute } from "vue-router";
import {
  useAutoScroll,
  useJoinAndLeaveChannelHandle,
} from "./ChannelMessageView";

const route = useRoute();
const neventOpt = computed(() => toDeCodeNevent(route.params.value as string));
const eventId = computed<string | null | undefined>(() => neventOpt.value?.id);
console.log("eventId", eventId.value);

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

useAutoScroll(messageList as any);
const autoloadMoreVueRef = ref<null | HTMLElement>(null);

const message = useMessage();
function handleLoad() {
  messageBeltline.value?.feat.load();
  message.info(t("loading"));
}
function handleRefresh() {
  messageBeltline.value?.feat.refresh();
  message.info(t("refreshing"));
}

// useUnlimitedLoad(handleAutoLoadMore);
const { handleJoinChannel, handleLeaveChannel } =
  useJoinAndLeaveChannelHandle(eventId);
const send = useHandleSendMessage(42, messageBeltline);

function handleSend(event: EventTemplate) {
  if (!eventId.value) return;

  event.tags = [...event.tags, ["e", eventId.value, "root"]];
  console.log("handleSend", event);
  send(event);
  console.log("handleSend", event);
}
</script>

<template>
  <div v-if="eventId" class="flex flex-col h-full overflow-auto">
    <n-page-header
      v-if="metadata"
      class="mb-8 flex-shrink-0"
      :subtitle="metadata.name"
      @back="$router.back"
    >
      <template #extra>
        <div class="felx items-center justify-center">
          <n-button
            v-if="!contactConfiguration.getChannelConfiguration().has(eventId)"
            quaternary
            round
            type="primary"
            @click="handleJoinChannel"
          >
            {{ t("join") }}
          </n-button>
          <n-button
            v-else
            quaternary
            round
            type="primary"
            @click="handleLeaveChannel"
          >
            {{ t("leave") }}
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
      <PapawVue
        v-if="messageBeltline"
        v-for="(event, index) in messageBeltline.getList()"
        :event="event"
        :key="event.id"
        :deleteEvent="() => {}"
      />
    </ScrollbarVue>
    <RichTextEditBoxVue @send="handleSend" />
  </div>
</template>

<style scoped></style>
