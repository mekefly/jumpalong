<script lang="ts" setup>
import Drawer from "@/components/Drawer.vue";
import DrawerProvide from "@/components/DrawerProvide.vue";
import Copy16Filled from "@/components/icon/Copy16Filled.vue";
import WindowHeaderHorizontal20Filled from "@/components/icon/WindowHeaderHorizontal20Filled.vue";
import {
  LongFormContentOptions,
  useMarkdownState,
} from "@/components/Markdown";
import MavonEditor from "@/components/MavonEditor.vue";
import { useUpload } from "@/components/Upload";
import UploadInput from "@/components/UploadInput.vue";
import { t } from "@/i18n";
import { useClipboardDialog } from "@/utils/naiveUi";
import { createEventTemplate } from "@/utils/nostr";
import { usePubkey } from "@/utils/nostrApiUse";
import { useHandleSendMessage } from "@/utils/use";
import { createId, nowSecondTimestamp } from "@/utils/utils";
import { nip19 } from "nostr-tools";
import { type AddressPointer } from "nostr-tools/lib/nip19";

const loadingBar = useLoadingBar();
const route = useRoute();
const router = useRouter();

loadingBar.start();
const value = computed(() => route.params.value as string);
const newArticle = computed(() => route.query.new);
watch(newArticle, () => {
  if (newArticle.value) {
    loadingBar.finish();
  }
});
const kind = ref(30023);
const {
  addressPointer,
  longFormContentOptions: remoteLongFormContentOptions,
  event: remoteEvent,
} = useMarkdownState(value);

const pubkey = usePubkey();
const addrPoint = computed<AddressPointer>(() => {
  if (Boolean(addressPointer.value)) {
    return addressPointer.value as AddressPointer;
  }
  const _addressPointer: AddressPointer = {
    identifier: createId(),
    pubkey: pubkey.value ?? "",
    kind: kind.value,
    relays: [],
  };

  setTimeout(() => {
    router.push({
      name: "markdown-editor",
      params: { value: nip19.naddrEncode(_addressPointer) },
      query: { ["new"]: "1" },
    });
  });
  return _addressPointer;
});
addrPoint.value;

const longFormContent = ref<LongFormContentOptions>({
  content: "",
  title: "",
  publishedAt: nowSecondTimestamp(),
  summary: "",
  image: "",
  hashtags: [],
});

watch(
  remoteLongFormContentOptions,
  () => {
    const _longFormContent = longFormContent.value as any;
    const _remoteLongFormContentOptions = remoteLongFormContentOptions.value;

    if (_remoteLongFormContentOptions) {
      loadingBar.finish();
      for (const [key, value] of Object.entries(
        _remoteLongFormContentOptions
      )) {
        _longFormContent[key] = value;
      }
    }
  },
  { deep: true }
);

const titleTag = computed(() => ["title", longFormContent.value.title]);
const publishedAtTag = computed(() => [
  "published_at",
  String(longFormContent.value.publishedAt),
]);
const summaryTag = computed(() => ["summary", longFormContent.value.summary]);
const imageTag = computed(() => ["image", longFormContent.value.image]);
const addrTag = computed(() => {
  return [
    "a",
    `${addrPoint.value.kind}:${addrPoint.value.pubkey}:${addrPoint.value.identifier}`,
  ];
});
const identifierTag = computed(() => ["d", addrPoint.value.identifier]);

const event = computed(() =>
  createEventTemplate({
    kind: kind.value,
    content: longFormContent.value.content,
    tags: [
      identifierTag.value,
      titleTag.value,
      publishedAtTag.value,
      summaryTag.value,
      imageTag.value,
      addrTag.value,
      ...longFormContent.value.hashtags.map((t) => ["t", t]),
    ],
  })
);

const md = ref<undefined | any>();
const _upload = useUpload();

const handelImgAdd = async (pos: number, file: File) => {
  const opt = await _upload(file);
  opt.url;
  md.value?.$img2Url(pos, opt.url);
};

const handleSendMessage = useHandleSendMessage(
  kind.value,
  undefined,
  undefined
);
function handelSave(value: string) {
  longFormContent.value.content = value;
  handleSendMessage(event.value);
}
const show = ref(false);
setTimeout(() => (show.value = true));
const clipboardDialog = useClipboardDialog();
function handleCopyNaddr() {
  const naddr = nip19.naddrEncode(addrPoint.value);
  clipboardDialog(naddr);
}
</script>
<template>
  <DrawerProvide v-slot="{ id }">
    <div class="h-full w-full" :id="id">
      <MavonEditor
        ref="md"
        class="h-full"
        @imgAdd="handelImgAdd"
        @save="handelSave"
        v-model="longFormContent.content"
      >
        <template #right-toolbar-after>
          <button
            type="button"
            @click="handleCopyNaddr"
            class="op-icon"
            aria-hidden="true"
            :title="`${t('copy')}naddr`"
          >
            <n-icon> <Copy16Filled /></n-icon>
          </button>
          <button
            type="button"
            @click="() => (show = !show)"
            class="op-icon"
            aria-hidden="true"
            :title="t('edit')"
          >
            <n-icon> <WindowHeaderHorizontal20Filled /></n-icon>
          </button>
        </template>
      </MavonEditor>

      <Drawer v-model:show="show" closable height="100%">
        <n-space vertical>
          <UploadInput
            class="w-full"
            :placeholder="t('banner')"
            v-model:value="longFormContent.image"
          ></UploadInput>

          <n-input
            :placeholder="t('title')"
            v-model:value="longFormContent.title"
            class="w-full"
          ></n-input>
          <n-input
            :placeholder="t('summary')"
            v-model:value="longFormContent.summary"
          ></n-input>
          <n-dynamic-tags v-model:value="longFormContent.hashtags" />
        </n-space>
      </Drawer>
    </div>
  </DrawerProvide>
</template>

<style scoped></style>
