<script lang="ts" setup>
import { type AddressPointer } from "nostr-tools/lib/nip19";
import {
  useArticeSetting,
  useLongFormContentOptions,
  useMarkdownState,
} from "./Markdown";

import { t } from "@/i18n";
import router from "@/router";
import { Event } from "nostr-tools";
import DateTime from "./DateTime.vue";
import MavonEditor from "./MavonEditor.vue";

const props = defineProps<{
  identifier?: string;
  pubkey?: string;
  event?: Event;
}>();
const event = toRef(props, "event");

const addressPointer = computed<AddressPointer | undefined>(() => {
  if (!props.pubkey) return;
  if (!props.identifier) return;
  return { identifier: props.identifier, pubkey: props.pubkey, kind: 30023 };
});
const { longFormContentOptions: remoteLongFormContentOptions } =
  useMarkdownState(addressPointer);

const longFormContentOptions = useLongFormContentOptions(event);
const { showArticleDetails } = useArticeSetting() ?? {};

const toolbars = ref({
  bold: false, // 粗体
  italic: false, // 斜体
  header: false, // 标题
  underline: false, // 下划线
  strikethrough: false, // 中划线
  mark: false, // 标记
  superscript: false, // 上角标
  subscript: false, // 下角标
  quote: false, // 引用
  ol: false, // 有序列表
  ul: false, // 无序列表
  link: false, // 链接
  imagelink: false, // 图片链接
  code: false, // code
  table: false, // 表格
  fullscreen: true, // 全屏编辑
  readmodel: true, // 沉浸式阅读
  htmlcode: false, // 展示html源码
  help: false, // 帮助
  /* 1.3.5 */
  undo: false, // 上一步
  redo: false, // 下一步
  trash: false, // 清空
  save: false, // 保存（触发events中的save事件）
  /* 1.4.2 */
  navigation: false, // 导航目录
  /* 2.1.8 */
  alignleft: false, // 左对齐
  aligncenter: false, // 居中
  alignright: false, // 右对齐
  /* 2.2.1 */
  subfield: false, // 单双栏模式
  preview: false, // 预览
});
const longFormContent = computed(
  () => remoteLongFormContentOptions.value ?? longFormContentOptions.value
);
function handelClick(tag: string) {
  router.push({ name: "tag", params: { value: tag } });
}
</script>

<template>
  <div class="flex flex-col">
    <div>
      <n-image
        class="w-full rounded-md"
        :imgProps="{ style: { width: '100%' } }"
        v-if="longFormContent?.image"
        :src="longFormContent?.image"
      />
    </div>
    <div>
      <div v-if="longFormContent?.publishedAt">
        {{ t("published_at") }}:
        <DateTime :secondTimestamp="longFormContent?.publishedAt" />
      </div>
      <h3
        v-if="longFormContent?.title"
        :style="{
          'word-break': 'break-all',
          'text-overflow': 'ellipsis',
          'word-wrap': 'break-word',
        }"
      >
        {{ longFormContent?.title }}
      </h3>

      <p>
        {{
          longFormContent?.summary ?? longFormContent?.content?.slice(0, 100)
        }}
      </p>
    </div>

    <div @click.stop v-if="longFormContent && showArticleDetails">
      <n-space>
        <n-tag
          type="info"
          v-for="hashTag in longFormContent.hashtags"
          @click="handelClick(hashTag)"
        >
          {{ hashTag }}
        </n-tag>
      </n-space>
      <MavonEditor
        ref="md"
        class="h-full mt-4 md"
        :style="{}"
        :autofocus="false"
        :editable="false"
        :subfield="false"
        :defaultOpen="'preview'"
        :toolbars="toolbars"
        :model-value="longFormContent.content"
      />
    </div>
  </div>
</template>

<style scoped></style>
