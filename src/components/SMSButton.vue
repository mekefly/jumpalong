<script lang="ts" setup>
import { t } from "@/i18n";
import { getOnlyTag } from "@/nostr/tag";
import router from "@/router";
import {
  useRecommendEvent,
  useRecommendUser,
  useRecommendUserMetadata,
} from "@/state/nostr";
import { useClipboardDialog } from "@/utils/naiveUi";
import { neventEncodeByEvent } from "@/utils/nostr";
import { autoHidden, useModelBind } from "@/utils/use";
import { usePushShortTextNote } from "@/views/ShortTextNoteView";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { Event, nip19 } from "nostr-tools";
import { userKey } from "../nostr/user";
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
    const identifierTag = getOnlyTag("d", event.value.tags);
    if (!(identifierTag && identifierTag[1])) {
      message.info("Identifier not found");
      return;
    }
    router.push({
      name: "markdown-editor",
      params: {
        value: nip19.naddrEncode({
          identifier: identifierTag[1],
          pubkey: event.value.pubkey,
          kind: event.value.kind,
        }),
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
  (handleMap as any)[key]?.();
};

const { addRule } = useBlackData();

const options = ref<SelectMixedOption[]>([
  {
    label: t("close"),
    value: "close",
  },
  ...(event.value.pubkey === userKey.value.publicKey
    ? [
        ...(event.value.kind === 30023
          ? [
              {
                label: t("edit"),
                value: "editArticle",
              },
            ]
          : []),

        {
          label: t("delete_event"),
          value: "deleteEvent",
        },
      ]
    : []),

  ...(event.value.pubkey !== userKey.value.publicKey
    ? [{ label: t("hide"), value: "joinTheBlacklist" }]
    : []),
  {
    label: t("open"),
    value: "pushShortTextNote",
  },
  {
    label: t("reply"),
    value: "reply",
  },
  {
    label: t("mention"),
    value: "mention",
  },
  {
    label: `${t("copy")} Nevent`,
    value: "copyNevent",
  },
  {
    label: `${t("copy")} Note`,
    value: "copyNote",
  },
  {
    label: `${t("copy")} Hex pubkey`,
    value: "copyHexPubkey",
  },
  {
    label: t("recommend_user"),
    value: "recommendUser",
  },
  {
    label: t("recommend_event"),
    value: "recommendEvent",
  },
  {
    label: t("recommend_metadata"),
    value: "recommendUserMetadata",
  },
]);
const target = ref(null);
autoHidden(show);
</script>

<template>
  <n-popselect
    ref="target"
    @updateValue="runOperate"
    v-model:value="value"
    :options="options"
    trigger="manual"
    :show="show"
  >
    <n-button quaternary circle @click.stop="() => (show = !show)">
      <n-icon> <MoreIconVue /> </n-icon>
    </n-button>
  </n-popselect>
</template>

<style scoped></style>
