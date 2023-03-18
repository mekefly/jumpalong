<script lang="ts" setup>
import {
  useRecommendEvent,
  useRecommendUser,
  useRecommendUserMetadata,
} from "@/state/nostr";
import { neventEncodeByEvent } from "@/utils/nostr";
import { clipboardText } from "@/utils/utils";
import { usePushShortTextNote } from "@/views/ShortTextNoteView";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { Event, nip19 } from "nostr-tools";
import { userKey } from "../nostr/user";
import { useBlackData } from "../views/ContentBlacklistView";

import MoreIconVue from "./icon/MoreIcon.vue";
import { useRichTextEditBoxOpt } from "./RichTextEditBox";
const richTextEditBoxOpt = useRichTextEditBoxOpt();

const { success, info, error } = useMessage();
const props = defineProps<{
  event: Event;
  deleteEvent: (id: string) => void;
}>();
const { event, deleteEvent } = toRefs(props);

const value = ref("");
const recommendEvent = useRecommendEvent();
const recommendUser = useRecommendUser();
const recommendUserMetadata = useRecommendUserMetadata();

const pushShortTextNote = usePushShortTextNote();
const handleMap = {
  deleteEvent: () => deleteEvent.value(event.value.id as any),
  joinTheBlacklist() {
    addRule({ title: "黑名单", ignoreContent: event.value.content });
  },
  copyNevent() {
    const text = neventEncodeByEvent(event.value);
    clipboardText(text);

    success(`复制成功:${text}`);
  },
  copyNote() {
    const text = nip19.noteEncode(event.value.id as string);
    clipboardText(text);

    success(`复制成功:${text}`);
  },
  copyHexPubkey() {
    success(`复制成功:${event.value.pubkey}`);
  },
  recommendUser() {
    recommendUser(event.value.pubkey);
  },
  recommendEvent() {
    recommendEvent(event.value);
  },
  recommendUserMetadata() {
    recommendUserMetadata(event.value.pubkey);
  },
  pushShortTextNote() {
    pushShortTextNote(event.value);
  },
  reply() {
    richTextEditBoxOpt.emitRichTextEditBox("reply", event.value);
  },
};
const runOperate = (key: string) => {
  (handleMap as any)[key]?.();
};

const { addRule } = useBlackData();

const options = ref<SelectMixedOption[]>([
  ...(event.value.pubkey === userKey.value.publicKey
    ? [
        {
          label: "删除消息",
          value: "deleteEvent",
        },
      ]
    : []),
  ...(event.value.pubkey !== userKey.value.publicKey
    ? [{ label: "屏蔽这条消息", value: "joinTheBlacklist" }]
    : []),
  {
    label: "详情",
    value: "pushShortTextNote",
  },
  {
    label: "回复",
    value: "reply",
  },
  {
    label: "复制Nevent",
    value: "copyNevent",
  },
  {
    label: "复制Note",
    value: "copyNote",
  },
  {
    label: "复制用户16进制公钥",
    value: "copyHexPubkey",
  },
  {
    label: "推荐用户",
    value: "recommendUser",
  },
  {
    label: "推荐消息",
    value: "recommendEvent",
  },
  {
    label: "推荐用户元数据",
    value: "recommendUserMetadata",
  },
]);
</script>

<template>
  <n-popselect
    @updateValue="runOperate"
    v-model:value="value"
    :options="options"
    trigger="click"
  >
    <n-button quaternary circle
      ><n-icon><MoreIconVue /></n-icon
    ></n-button>
  </n-popselect>
</template>

<style scoped></style>
