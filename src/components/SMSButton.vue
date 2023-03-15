<script lang="ts" setup>
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { Event } from "nostr-tools";
import { userKey } from "../nostr/user";
import { useBlackData } from "../views/ContentBlacklistView";

import MoreIconVue from "./icon/MoreIcon.vue";

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
