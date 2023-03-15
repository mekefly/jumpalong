<script lang="ts" setup>
import {
  ChannelMetadata,
  parseMetadata,
} from "@/nostr/staff/createUseChannelMetadata";
import { MentionOption } from "naive-ui";
import { Event } from "nostr-tools";
import { getLocalKind0 } from "../api/user";

const emit = defineEmits<{
  (e: "send", str: string, options: { tags: string[][] }): void;
}>();

const localUser = getLocalKind0();

const value = ref("");
const userMap = new Map<string, { event: Event; metadata: ChannelMetadata }>();
const eventMap = new Map<string, { event: Event }>();

const userRef: MentionOption[] = reactive([]);
localUser.addStaff({
  push(event) {
    console.log("3434387");

    const metadata = parseMetadata(event);

    const name = metadata.name ?? (event.pubkey?.slice(8) as string);
    userMap.set(name, {
      event,
      metadata: metadata,
    });

    userRef.push({ label: name, value: name, key: event.pubkey });
  },
});
watch(value, () => {
  console.log(value.value);
});
const options = ref<MentionOption[]>([]);
function handleSearch(value: string, prefix: string) {
  console.log("handleSearch", value);

  if (prefix === "@") {
    options.value = userRef;
  } else {
  }
}
function handleSend() {
  const v = value.value;
  const tags: string[][] = [];

  const postMessage = v.replace(/@\S+|#\S+|&\S+/g, (str) => {
    const prefix = str[0];
    const name = str.slice(1);
    switch (prefix) {
      case "@":
        //人
        const data = userMap.get(name);
        if (!data) return str;
        tags.push(["p", data.event.pubkey]);
        return `#[${tags.length - 1}]`;
      case "#":
        tags.push(["t", name]);
        return `#[${tags.length - 1}]`;
      case "&":
        const data1 = eventMap.get(name);
        if (!data1) return str;
        tags.push(["e", data1.event.id as string]);
        return `#[${tags.length - 1}]`;
      default:
        return str;
    }
  });

  emit("send", postMessage, { tags });
}
</script>

<template>
  <div class="flex mt-4">
    <n-mention
      v-model:value="value"
      :options="userRef"
      :prefix="['@', '&']"
      @search="handleSearch"
    />
    <n-button type="primary" @click="handleSend">发送</n-button>
  </div>
</template>

<style scoped></style>
