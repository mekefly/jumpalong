<script lang="ts" setup>
import ReplaceableEventMap from "@/nostr/ReplaceableEventMap";
import {
  ChannelMetadata,
  parseMetadata,
} from "@/nostr/staff/createUseChannelMetadata";
import { MentionOption } from "naive-ui";
import { Event } from "nostr-tools";
const props = defineProps<{
  rawValue: string;
}>();
const { rawValue } = toRefs(props);

const emit = defineEmits<{
  (e: "change", str: string, options: { tags: string[][] }): void;
  (e: "blur"): void;
  (e: "update:rawValue", v: string): void;
}>();

const value = computed({
  get() {
    return rawValue.value;
  },
  set(v) {
    emit("update:rawValue", v);
  },
});

const userMap = new Map<string, { event: Event; metadata: ChannelMetadata }>();
const eventMap = new Map<string, { event: Event }>();

const Kind0eventMap = ReplaceableEventMap.kind0.getAll();
const userRef: MentionOption[] = reactive([]);

for (const pubkey in Kind0eventMap) {
  const event = Kind0eventMap[pubkey];
  const metadata = parseMetadata(event);

  const name = metadata.name ?? (event.pubkey?.slice(8) as string);
  userMap.set(name, {
    event,
    metadata: metadata,
  });
  userRef.push({ label: name, value: name, key: event.pubkey });
}

const options = ref<MentionOption[]>([]);
function handleSearch(value: string, prefix: string) {
  if (prefix === "@") {
    options.value = userRef;
  } else {
  }
}
const tags = computed(() => {});
function parseTags(text: string) {
  const tags: string[][] = [];
  const postMessage = text.replace(/@\S+|#\S+|&\S+/g, (str) => {
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
  return [postMessage, tags] as const;
}
let lastChange = "";
function handleChange() {
  const v = value.value;
  if (lastChange === v) return;
  lastChange = v;

  const [postMessage, tags] = parseTags(v);

  emit("change", postMessage, { tags });
}
</script>

<template>
  <n-mention
    type="textarea"
    autosize
    class="w-full"
    @blur="() => $emit('blur')"
    placeholder="你可以输入一些内容"
    @change="handleChange"
    show-count
    :maxlength="3000"
    v-model:value="value"
    :options="userRef"
    :prefix="['@', '&']"
    @search="handleSearch"
  />
</template>

<style scoped></style>
