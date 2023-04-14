<script lang="ts" setup>
import { t } from "@/i18n";
import { createAddress } from "@/nostr/event";
import router from "@/router";
import {
  useRecommendEvent,
  useRecommendUser,
  useRecommendUserMetadata,
} from "@/state/nostr";
import { useClipboardDialog } from "@/utils/naiveUi";
import { neventEncodeByEvent } from "@/utils/nostr";
import { usePubkey } from "@/utils/nostrApiUse";
import { autoHidden, useModelBind } from "@/utils/use";
import { usePushShortTextNote } from "@/views/ShortTextNoteView";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { Event, nip19 } from "nostr-tools";
import { useBlackData } from "../views/ContentBlacklistView";
import MoreIconVue from "./icon/MoreIcon.vue";
import { useRichTextEditBoxOpt } from "./RichTextEditBox";
const message = useMessage();

const richTextEditBoxOpt = useRichTextEditBoxOpt();

const props = withDefaults(
  defineProps<{
    event: Event;
    deleteEvent: (id: string) => void;
    show?: boolean;
  }>(),
  {}
);

const { event, deleteEvent } = toRefs(props);

const value = ref("");

const { info } = useMessage();
const clipboard = useClipboardDialog();
const show = useModelBind(props, "show");
const recommendEvent = useRecommendEvent();
const recommendUser = useRecommendUser();
const recommendUserMetadata = useRecommendUserMetadata();
const pushShortTextNote = usePushShortTextNote();

const handleMap = {
  close: () => {
    show.value = false;
  },
  editArticle: () => {
    const naddr = createAddress(event.value);
    if (!naddr) {
      message.info("Identifier not found");
      return;
    }
    router.push({
      name: "markdown-editor",
      params: {
        value: naddr,
      },
    });
  },
  deleteEvent: () => {
    deleteEvent.value(event.value.id as any);
    info(t("message.you_have_sent_a_delete_request"));
  },
  joinTheBlacklist() {
    addRule({ title: t("hide_list"), ignoreContent: event.value.content });
  },
  copyNevent() {
    const text = neventEncodeByEvent(event.value);
    clipboard(text);
  },
  copyNote() {
    const text = nip19.noteEncode(event.value.id as string);
    clipboard(text);
  },
  copyNaddr() {
    const naddr = createAddress(event.value);
    if (!naddr) {
      message.info("Identifier not found");
      return;
    }
    clipboard(naddr);
  },
  copyHexPubkey() {
    clipboard(event.value.pubkey);
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
  mention() {
    richTextEditBoxOpt.emitRichTextEditBox("mention", event.value);
  },
};
const runOperate = (key: string) => {
  const fn = (handleMap as any)[key];
  if (!fn) {
    message.error("Not found");
  }

  fn();
};

const { addRule } = useBlackData();
const currentPubkey = usePubkey();

const options = computed<SelectMixedOption[]>(() => [
  {
    label: t("close"),
    value: "close",
    key: "close",
  },
  ...(event.value.pubkey === currentPubkey.value
    ? [
        ...(event.value.kind === 30023
          ? [
              {
                label: t("edit"),
                value: "editArticle",
                key: "editArticle",
              },
            ]
          : []),
        {
          label: t("delete_event"),
          value: "deleteEvent",
          key: "deleteEvent",
        },
      ]
    : [
        {
          label: t("hide"),
          value: "joinTheBlacklist",
          key: "joinTheBlacklist",
        },
      ]),

  {
    label: t("open"),
    value: "pushShortTextNote",
    key: "pushShortTextNote",
  },
  {
    label: t("reply"),
    value: "reply",
    key: "reply",
  },
  {
    label: t("mention"),
    value: "mention",
    key: "mention",
  },
  {
    label: `${t("copy")} Nevent`,
    value: "copyNevent",
    key: "copyNevent",
  },
  {
    label: `${t("copy")} Note`,
    value: "copyNote",
    key: "copyNote",
  },
  ...(event.value.kind >= 30000 && event.value.kind < 40000
    ? [
        {
          label: `${t("copy")} Naddr`,
          value: "copyNaddr",
          key: "copyNaddr",
        },
      ]
    : []),
  {
    label: `${t("copy")} Hex pubkey`,
    value: "copyHexPubkey",
    key: "copyHexPubkey",
  },
  {
    label: t("recommend_user"),
    value: "recommendUser",
    key: "recommendUser",
  },
  {
    label: t("recommend_event"),
    value: "recommendEvent",
    key: "recommendEvent",
  },
  {
    label: t("recommend_metadata"),
    value: "recommendUserMetadata",
    key: "recommendUserMetadata",
  },
]);
const target = ref(null);
autoHidden(show);
</script>

<template>
  <div>
    <n-popselect
      ref="target"
      @updateValue="runOperate"
      v-model:value="value"
      :options="options"
      trigger="manual"
      :show="show"
    >
      <n-button quaternary circle @click="() => (show = !show)">
        <n-icon> <MoreIconVue /> </n-icon>
      </n-button>
    </n-popselect>
  </div>
</template>

<style scoped></style>
