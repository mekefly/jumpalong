<script lang="ts" setup>
import Drawer from '@/components/Drawer.vue'
import DrawerProvide from '@/components/DrawerProvide.vue'
import Copy16Filled from '@/components/icon/Copy16Filled.vue'
import WindowHeaderHorizontal20Filled from '@/components/icon/WindowHeaderHorizontal20Filled.vue'
import { nip19 } from 'nostr-tools'
import {
  markdownDataToEvent,
  useIsNewMarkdown,
  useMarkdownState,
  useNewMarkdown,
} from '../components/Markdown'
import MavonEditor from '../components/MavonEditor.vue'
import { usePubkey } from '../components/ProvideEventLine'
import { useUpload } from '../components/Upload'
import UploadInput from '../components/UploadInput.vue'
import { t } from '../i18n'
import { useClipboardDialog } from '../utils/naiveUi'
import { useHandleSendMessage } from '../utils/use'
import { createId } from '../utils/utils'

import { type AddressPointer } from 'nostr-tools/nip19'

const route = useRoute()
const router = useRouter()
const pubkey = usePubkey()
const loadingBar = useLoadingBar()

const value = computed(() => route.params.value as string)
useIsNewMarkdown()
const kind = ref(30023)
const { addressPointer, markdownData: remoteMarkdownData } =
  useMarkdownState(value)

const addrPoint = computed<AddressPointer>(() => {
  if (Boolean(addressPointer.value)) {
    return addressPointer.value as AddressPointer
  }
  const _addressPointer: AddressPointer = {
    identifier: createId(),
    pubkey:
      typeof pubkey.value === 'string'
        ? pubkey.value
        : pubkey.value?.toHex() ?? '',
    kind: kind.value,
    relays: [],
  }

  setTimeout(() => {
    router.push({
      name: 'markdown-editor',
      params: { value: nip19.naddrEncode(_addressPointer) },
      query: { ['new']: '1' },
    })
  })
  return _addressPointer
})
addrPoint.value

const markdownData = useNewMarkdown()

//当remoteMarkdown存在内容后，写入正在编辑的文档
watch(
  remoteMarkdownData,
  () => {
    const _remoteMarkdownData = remoteMarkdownData.value

    if (_remoteMarkdownData) {
      setTimeout(() => {
        loadingBar.finish()
      })
      for (const [key, value] of Object.entries(_remoteMarkdownData)) {
        if (value) {
          ;(markdownData.value as any)[key] = value
        }
      }
    }
  },
  { deep: true }
)

const md = ref<undefined | any>()
const _upload = useUpload()

const handelImgAdd = async (pos: number, file: File) => {
  const opt = await _upload(file)
  opt.url
  md.value?.$img2Url(pos, opt.url)
}

const handleSendMessage = useHandleSendMessage(kind.value, undefined)

const event = markdownDataToEvent(markdownData, addrPoint)
function handelSave(value: string) {
  markdownData.value.content = value
  handleSendMessage(event.value)
}

const show = ref(false)
setTimeout(() => (show.value = true))
const clipboardDialog = useClipboardDialog()
function handleCopyNaddr() {
  const naddr = nip19.naddrEncode(addrPoint.value)
  clipboardDialog(naddr)
}
</script>
<template>
  <DrawerProvide v-slot="{ id }">
    <div class="h-full w-full" :id="id">
      <MavonEditor
        ref="md"
        @imgAdd="handelImgAdd"
        @save="handelSave"
        v-model="markdownData.content"
      >
        <!-- class="h-full" -->
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
            v-model:value="markdownData.image"
          ></UploadInput>

          <n-input
            :placeholder="t('title')"
            v-model:value="markdownData.title"
            class="w-full"
          ></n-input>
          <n-input
            :placeholder="t('summary')"
            v-model:value="markdownData.summary"
          ></n-input>
          <n-dynamic-tags v-model:value="markdownData.hashtags" />
        </n-space>
      </Drawer>
    </div>
  </DrawerProvide>
</template>

<style scoped></style>
