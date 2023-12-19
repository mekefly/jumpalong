<script lang="ts" setup>
import { t } from "@/i18n";
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

const emit = defineEmits<{
  (
    e: "change",
    str: string,
    options: { tags: string[][]; sourceOptions: SourceOptions }
  ): void;
  (e: "blur"): void;
  (e: "focus"): void;
  (e: "update:rawValue", v: string): void;
}>();

const value = useModelBind(props, "rawValue");

const { userRefMentionOption, userMap } = useUserOpt();
const {
  eventMap,
  eventMentionOption,
  addEvent,
  replyEvent,
  mentionEvent,
  relaysTags: replyTags,
} = useEventRef(value);
const parseTags = useParseTagsFunction(userMap, eventMap, replyTags);

watch(
  rawValue,
  async () => {
    await nextTick();
    handleChange();
  },
  {
    immediate: true,
  }
);

richTextEditBoxOpt.onRichTextEditBox("reply", (e) => {
  replyEvent(e);
  change();
});
richTextEditBoxOpt.onRichTextEditBox("mention", (e) => {
  mentionEvent(e);
  change();
});
richTextEditBoxOpt.onRichTextEditBox("clear", clear);

const options = ref<MentionOption[]>([]);
function handleSearch(value: string, prefix: string) {
  if (prefix === "@") {
    options.value = userRefMentionOption;
  } else if (prefix === "&") {
    options.value = eventMentionOption;
  }
}
const { changeSourceCache, clearCache } = useCacheTextValue(
  userMap,
  eventMap,
  value,
  replyTags
);
function handleChange() {
  const v = value.value;
  if (lastChange === v) return;
  lastChange = v;
  change();
}
function change() {
  const v = value.value;
  const [postMessage, tags, sourceOptions] = parseTags(v);
  changeSourceCache(sourceOptions);

  emit("change", postMessage, { tags, sourceOptions });
}
function clear() {
  clearCache();
  replyTags.value = [];
  value.value = "";
  change();
}
</script>

<template>
  <n-mention
    type="textarea"
    autosize
    class="w-full"
    @blur="() => $emit('blur')"
    @focus="() => $emit('focus')"
    :placeholder="t('rich_text_edit_box_input_placeholder')"
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
