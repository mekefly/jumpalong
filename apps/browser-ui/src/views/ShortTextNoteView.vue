<script lang="ts" setup>
import Article from '../components/Article.vue'
import { proviteArticeSetting } from '../components/Markdown'
import { providePapawFocus } from '../components/Papaw'
import { useRichTextEditBoxOpt } from '../components/RichTextEditBox'
import { useEvent } from './ShortTextNoteView'
import { deserializeTagR } from '../nostr-runtime'

//需要为显示区域和编辑区域架设一个隧道

const event = useEvent()
const eventId = computed(() => event.value?.id ?? 'default')

const richTextEditBoxOpt = useRichTextEditBoxOpt(eventId)
watch(
  event,
  async () => {
    if (!event.value) return

    await nextTick()
    // richTextEditBoxOpt.emitRichTextEditBox('reply', event.value)
  },
  {
    immediate: true,
  }
)

const urls = computed<Set<string>>(() => {
  if (!event.value) return new Set()
  return deserializeTagR(event.value?.tags)
})

providePapawFocus(event)
proviteArticeSetting({ showArticleDetails: true })
</script>

<template>
  <Article v-if="event" :event="event" :urls="urls"></Article>
</template>

<style scoped></style>
