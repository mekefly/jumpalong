<script lang="ts" setup>
import { createId, debounce } from '@jumpalong/shared'
import { EventTemplate } from 'nostr-tools'
import ContentVue from './Content.vue'
import EmojiBoxVue from './EmojiBox.vue'
import ArrowExportUp20Filled from './icon/ArrowExportUp20Filled.vue'
import CloseVue from './icon/Close.vue'
import Edit16FilledVue from './icon/Edit16Filled.vue'
import ReadOutlinedVue from './icon/ReadOutlined.vue'
import RelayContent from './RelayContent.vue'
import {
  useDragFileUpload,
  usePasteFile,
  useRichTextEditBoxOpt,
} from './RichTextEditBox'
import RichTextEditBoxInputVue from './RichTextEditBoxInput.vue'
import ScrollbarVue from './Scrollbar.vue'
import { useUpload } from './Upload'
import UploadButtonVue from './UploadButton.vue'
import { useEventLine } from './ProvideEventLine'
import { LoginStaff } from '@jumpalong/nostr-runtime'
import { ref } from 'vue'

let line = useEventLine(LoginStaff)
const richTextEditBoxOpt = useRichTextEditBoxOpt()

const emit = defineEmits<{
  (e: 'send', event: EventTemplate): void
}>()

const rawValue = ref('')
const event = ref<EventTemplate>(line.createEventTemplate({}))

const isEnter = ref(false)
const isEdit = ref(false)

const target: Ref<HTMLElement | null> = ref(null)
onClickOutside(target as any, event => {
  isEnter.value = false
  isEdit.value = false
})

function handleChange(str: string, options: { tags: string[][] }) {
  event.value = line.createEventTemplate({
    content: str,
    tags: options.tags,
  })
}

function handleSend() {
  emit('send', event.value)
}
const handelLeave = debounce(() => {
  isEnter.value = false
}, 2000)
const handleEnter = () => {
  handelLeave.clear?.()
  isEnter.value = true
}
function handelBlur() {
  isEdit.value = false
}
function handelClick(emoji: string) {
  rawValue.value += emoji
}
const isShowEmojiBox = ref(false)
const upload = useUpload()
async function uploadFile(file: File) {
  const key = `$$${createId()}$$`
  if (rawValue.value.length === 0) {
    rawValue.value += `${key}\n`
  } else {
    rawValue.value += `\n${key}\n`
  }

  const opt = await upload(file)

  rawValue.value = rawValue.value.replace(key, opt.url)
}

usePasteFile(target, uploadFile)

useDragFileUpload(target, uploadFile, {})
function handelClear() {
  richTextEditBoxOpt.emitRichTextEditBox('clear')
}

enum SizeMode {
  Maximize = 0,
  Common = 1,
  Minsize = 2,
}
const sizeMode = useLocalStorage('__rich_size_mode', 2)
function handleChangeSize() {
  sizeMode.value = (1 + sizeMode.value) % 3
}
</script>

<template>
  <div
    class="w-full h-max box-border flex flex-col overflow-hidden flex-shrink-1"
    ref="target"
    :style="{
      minHeight: SizeMode.Maximize === sizeMode ? '100%' : '0%',
      maxHeight:
        isShowEmojiBox || SizeMode.Maximize === sizeMode
          ? '100%'
          : isEnter || isShowEmojiBox
          ? '30em'
          : '10em',
      transition: 'max-height 300ms,min-height 300ms',
    }"
    @dblclick="() => (isEdit = true)"
    @mouseleave="handelLeave"
  >
    <div class="w-full flex-shrink-0 flex flex-col justify-between">
      <EmojiBoxVue :show="isShowEmojiBox" @click="handelClick" />
      <n-divider
        class="flex-shrink-0"
        :style="{
          marginBottom: '0.5em',
          marginTop: '0.5em',
        }"
      />
      <div class="flex justify-between">
        <div>
          <n-space>
            <n-button
              class="text-xl"
              quaternary
              @click="() => (isShowEmojiBox = !isShowEmojiBox)"
            >
              😁
            </n-button>

            <UploadButtonVue :upload="uploadFile" />
          </n-space>
        </div>

        <div>
          <n-button class="mr-2" @click="handleChangeSize">
            <div
              :style="{
                transform:
                  SizeMode.Minsize === sizeMode
                    ? `rotateX(0turn)`
                    : `rotateX(0.5turn)`,
                transition: 'transform 0.5s ease',
              }"
            >
              <n-icon>
                <ArrowExportUp20Filled />
              </n-icon>
            </div>
          </n-button>
          <n-button
            class="mr-2"
            @click="handelClear"
            :disabled="!rawValue && !event.tags.length"
          >
            <n-icon>
              <CloseVue />
            </n-icon>
          </n-button>
          <n-button
            class="mr-2"
            :disabled="!event.content"
            @click="() => (isEdit = !isEdit)"
          >
            <n-icon>
              <ReadOutlinedVue v-if="isEdit" />
              <Edit16FilledVue v-else />
            </n-icon>
          </n-button>
          <n-button
            :disabled="!event.content"
            type="primary"
            @click="handleSend"
          >
            {{ t('send') }}
          </n-button>
        </div>
      </div>
    </div>
    <n-divider
      v-show="!(SizeMode.Minsize === sizeMode)"
      class="flex-shrink-0"
      :style="{
        marginBottom: '0.5em',
        marginTop: '0.5em',
      }"
    />
    <div
      class="flex-1 flex-shrink relative h-0"
      :style="{}"
      @mouseenter="handleEnter"
    >
      <n-collapse-transition
        class="flex-1 flex-shrink relative h-full"
        :show="!(SizeMode.Minsize === sizeMode)"
      >
        <ScrollbarVue
          class="h-full box-border"
          :class="{
            'py-2': event.tags.length > 0 || SizeMode.Maximize === sizeMode,
          }"
        >
          <div
            class="px-3 py-2"
            v-show="!isEdit && event.content"
            @click="() => (isEdit = true)"
          >
            <ContentVue :event="(event as any)" disabledReply />
          </div>
          <RichTextEditBoxInputVue
            class="transition"
            v-model:rawValue="rawValue"
            v-show="isEdit || !event.content"
            @blur="handelBlur"
            @focus="() => (isEdit = true)"
            @change="handleChange"
          />
          <RelayContent :event="(event as any)" />
        </ScrollbarVue>
      </n-collapse-transition>
    </div>
  </div>
</template>

<style scoped></style>
