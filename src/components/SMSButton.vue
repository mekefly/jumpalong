<script lang="ts" setup>
import { deserializeTagR } from "@/nostr/tag";
import { clipboardText } from "@/utils/utils";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { Event, nip19 } from "nostr-tools";
import { userKey } from "../nostr/user";
import { useBlackData } from "../views/ContentBlacklistView";

import MoreIconVue from "./icon/MoreIcon.vue";

const { success } = useMessage();
const props = defineProps<{
  event: Event;
  deleteEvent: (id: string) => void;
}>();
const { event, deleteEvent } = toRefs(props);

const value = ref("");

const handleMap = {
  deleteEvent: () => deleteEvent.value(event.value.id as any),
  joinTheBlacklist() {
    addRule({ title: "黑名单", ignoreContent: event.value.content });
  },
  copyNevent() {
    const url = deserializeTagR(event.value.tags);
    const text = nip19.neventEncode({
      id: event.value.id as string,
      relays: [...url],
    });
    clipboardText(text);

    success(`复制成功:${text}`);
  },
  copyNote() {
    const text = nip19.noteEncode(event.value.id as string);
    clipboardText(text);

    success(`复制成功:${text}`);
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
    label: "复制Nevent",
    value: "copyNevent",
  },
  {
    label: "复制Note",
    value: "copyNote",
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
