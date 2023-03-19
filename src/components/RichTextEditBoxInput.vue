<script lang="ts" setup>
import { useModelBind } from "@/utils/use";
import { MentionOption } from "naive-ui";
import { useRichTextEditBoxOpt } from "./RichTextEditBox";
import {
  SourceOptions,
  useCacheTextValue,
  useEventRef,
  useParseTagsFunction,
  useUserOpt,
} from "./RichTextEditBoxInput";

const props = defineProps<{
  rawValue: string;
}>();
const { rawValue } = toRefs(props);
let lastChange = "";

const richTextEditBoxOpt = useRichTextEditBoxOpt();

console.log("RichTextEditBoxInput:隧道编号", richTextEditBoxOpt.id);

const emit = defineEmits<{
  (
    e: "change",
    str: string,
    options: { tags: string[][]; sourceOptions: SourceOptions }
  ): void;
  (e: "blur"): void;
  (e: "update:rawValue", v: string): void;
}>();

const value = useModelBind(props, "rawValue");

const { userRefMentionOption, userMap } = useUserOpt();
const { eventMap, eventMentionOption, addEvent, replyEvent } =
  useEventRef(value);
const parseTags = useParseTagsFunction(userMap, eventMap);

watch(
  rawValue,
  () => {
    handleChange();
  },
  {
    immediate: true,
  }
);

richTextEditBoxOpt.onRichTextEditBox("reply", (e) => {
  replyEvent(e);
});

const options = ref<MentionOption[]>([]);
function handleSearch(value: string, prefix: string) {
  console.log("prefix", prefix);
  if (prefix === "@") {
    options.value = userRefMentionOption;
  } else if (prefix === "&") {
    console.log("eventMentionOption", eventMentionOption);

    options.value = eventMentionOption;
  }
}
const { changeSourceCache } = useCacheTextValue(userMap, eventMap, value);
function handleChange() {
  const v = value.value;
  if (lastChange === v) return;
  lastChange = v;

  const [postMessage, tags, sourceOptions] = parseTags(v);
  changeSourceCache(sourceOptions);

  emit("change", postMessage, { tags, sourceOptions });
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
    :options="options"
    :prefix="['@', '&']"
    @search="handleSearch"
  />
</template>

<style scoped></style>
