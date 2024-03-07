<script lang="ts" setup>
import {
  ChannelMetadata,
  ChannelMetadataApiStaff,
  Synchronizer,
} from '@jumpalong/nostr-runtime'
import EllipsisVue from './Ellipsis.vue'
import { useEventLine } from './ProvideEventLine'
const router = useRouter()
const line = useEventLine(ChannelMetadataApiStaff)

const props = defineProps<{
  tag: Synchronizer.TagMapType[Synchronizer.ListEnum.PublicChats]
}>()
const { tag } = toRefs(props)

const metadataLine = computed(() =>
  line.getChannelMetadataByChannelId(tag.value.id, {
    ...(tag.value.relay
      ? {
          urls: new Set([tag.value.relay]),
        }
      : {}),
  })
)

const metadata = computed(() =>
  metadataLine.value.getMetadata<ChannelMetadata>()
)
</script>

<template>
  <div
    class="flex flex-col"
    @click="
      () =>
        router.push({
          name: 'channel-message',
          params: { value: tag.id },
        })
    "
  >
    <div class="font-bold">
      <EllipsisVue>
        {{ metadata?.name ?? tag.id.slice(0, 10) }}
      </EllipsisVue>
    </div>
    <div v-if="metadata?.about" class="w-full">
      <EllipsisVue class="w-full">
        <small>
          {{ metadata.about }}
        </small>
      </EllipsisVue>
    </div>
  </div>
</template>

<style scoped></style>
