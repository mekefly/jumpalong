<script lang="ts" setup>
import {
  getChannelMessageBeltline,
  getChannelMetadataBeltlineByChannelId,
} from "@/api/channel";
import contactConfiguration from "@/api/Contact";
import AutoloadMoreVue from "@/components/AutoloadMore.vue";
import PapawVue from "@/components/Papaw.vue";
import { useRichTextEditBoxOpt } from "@/components/RichTextEditBox";
import RichTextEditBoxVue from "@/components/RichTextEditBox.vue";
import ScrollbarVue from "@/components/Scrollbar.vue";
import { useHandleSendMessage } from "@/utils/use";
import { EventTemplate } from "nostr-tools";
import { computed } from "vue";
import { useRoute } from "vue-router";
import {
  useAutoScroll,
  useJoinAndLeaveChannelHandle,
  useUnlimitedLoad,
} from "./ChannelMessageView";

const route = useRoute();
const eventId = computed<string>(() => route.params.eventId as string);

//需要为显示区域和编辑区域架设一个隧道
watchEffect(() => {
  useRichTextEditBoxOpt(eventId.value);
});

const messageBeltline = computed(() => {
  return getChannelMessageBeltline(eventId.value as string);
});
const messageList = computed(() => messageBeltline.value.getList());

const metadataLine = getChannelMetadataBeltlineByChannelId(eventId.value);
const metadata = metadataLine.feat.useMetadata();

useAutoScroll(messageList as any);
const autoloadMoreVueRef = ref<null | HTMLElement>(null);

const message = useMessage();
function handleAutoLoadMore() {
  messageBeltline.value.feat.getMore();
}

useUnlimitedLoad(handleAutoLoadMore);
const { handleJoinChannel, handleLeaveChannel } =
  useJoinAndLeaveChannelHandle(eventId);
const send = useHandleSendMessage(42, messageBeltline);

function handleSend(event: EventTemplate) {
  event.tags = [...event.tags, ["e", eventId.value, "root"]];
  send(event);
}
</script>

<template>
  <div class="flex flex-col h-full overflow-auto">
    <n-page-header
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
            加入
          </n-button>
          <n-button
            v-if="!contactConfiguration.getChannelConfiguration().has(eventId)"
            quaternary
            round
            type="primary"
            @click="handleJoinChannel"
          >
            加入
          </n-button>
          <n-button
            v-else
            quaternary
            round
            type="primary"
            @click="handleLeaveChannel"
          >
            离开
          </n-button>
        </div>
      </template>
    </n-page-header>

    <ScrollbarVue class="flex-shrink flex-1">
      <div ref="autoloadMoreVueRef">
        <AutoloadMoreVue @loadMore="handleAutoLoadMore" />
      </div>
      <PapawVue
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
