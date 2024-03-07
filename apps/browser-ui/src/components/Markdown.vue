<script lang="ts" setup>
import router from '../router'
import { Event } from 'nostr-tools'
import { AddressPointer } from 'nostr-tools/nip19'
import DateTime from './DateTime.vue'
import {
  useMarkdownSetting,
  useMarkdownData,
  useMarkdownState,
  useToolbars,
} from './Markdown'
import MavonEditor from './MavonEditor.vue'
import { computed } from 'vue'

const props = defineProps<{
  identifier?: string
  pubkey?: string
  relays?: Set<string>
  event?: Event
}>()
const localEvent = toRef(props, 'event')

const addressPointer = computed<AddressPointer | undefined>(() => {
  if (!props.pubkey) return
  if (!props.identifier) return
  return {
    identifier: props.identifier,
    pubkey: props.pubkey,
    relays: props.relays && [...props.relays],
    kind: 30023,
  }
})
const { markdownData: remoteMarkdownDate } = useMarkdownState(addressPointer)
const localMarkdownData = useMarkdownData(localEvent)

const toolbars = useToolbars()

const { showArticleDetails } = useMarkdownSetting() ?? {}

const longFormContent = computed(
  () => remoteMarkdownDate.value ?? localMarkdownData.value
)

function handelClick(tag: string) {
  router.push({ name: 'tag', params: { value: tag } })
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
        {{ t('published_at') }}:
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
