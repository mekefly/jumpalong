<script lang="ts" setup>
import PapawVueList from '../components/PapawList.vue'
import { useElementIntoScreen } from '../utils/use'
import { Event, Filter } from 'nostr-tools'
import PapawByAddr from './PapawByAddr.vue'
import PapawById from './PapawById.vue'
import { useEventLine } from './ProvideEventLine'
import { EventApiStaff } from '@/nostr-runtime'
import { useLoad } from './Refresh'

logger.debug()

const props = withDefaults(
  defineProps<{
    urls?: Set<string>
    pubkeys?: string[]
    filter?: Filter
    filters?: Filter[]
    pushEvent?: (e: Event) => void
    active?: boolean
    disabledLoad?: boolean
    disabledEmpty?: boolean
    limit?: number
    reverseSort?: boolean
    disabledReply?: boolean
    tags?: string[][]
  }>(),
  {
    active: true,
    reverseSort: true,
  }
)
const emit = defineEmits<{
  (e: 'update:pushEvent', v: (e: Event) => void): void
}>()
const {
  pubkeys: pubkey,
  filter,
  filters,
  urls,
  active,
  reverseSort,
} = toRefs(props)
const message = useMessage()
let eventLine = useEventLine(EventApiStaff)

const mergeFilters = computed(() => {
  const _filters = filters?.value ? [...filters.value] : []

  filter?.value && _filters.push(filter.value)
  pubkey?.value &&
    _filters.push({
      kinds: [30023, 1],
      authors: pubkey.value,
      limit: 1,
    })

  return _filters
})

const allPubkeys = computed(() => [
  ...(pubkey?.value ?? []),
  ...mergeFilters.value.map(filter => filter.authors ?? []).flat(1),
])

const textEventbeltline = computed(() => {
  const opt: any = {}

  const line = eventLine.commonEventList({
    filters: mergeFilters.value,
    ...opt,
    urls: urls?.value,
    pubkeys: allPubkeys.value,
    limit: props.limit,
    reverseSort: true,
    sort: 'created-at',

    cache: true,
  })

  return line
})
watch(
  [reverseSort],
  () => {
    textEventbeltline.value?.setupSort({
      reverseSort: reverseSort.value,
      sort: 'created-at',
    })
  },
  { immediate: true }
)

useLoad(textEventbeltline, active)

const postEvents = computed(() => textEventbeltline.value?.getList())

const isLoading = computed(
  () => false
  // textEventbeltline.value?.feat.loadBufferOpt.isLoading ||
  // textEventbeltline.value?.feat.refreshBufferOpt.isLoaDing
)
// defineExpose({
//   postEvents,
//   ...loadOptions,
// })
// const divRef = ref(undefined)
// useElementIntoScreen(divRef, {
//   active: active ?? ref(true),
// })
</script>

<template>
  <div ref="divRef">
    <div
      class="py-20 flex items-center justify-center"
      v-if="postEvents && postEvents.length === 0"
    >
      <!-- v-if="!disabledLoad && isLoading && postEvents && postEvents.length === 0" -->
      <n-spin size="medium" />
    </div>

    <div
      v-else-if="
        !disabledEmpty && !isLoading && postEvents && postEvents.length === 0
      "
      class="h-40 flex justify-center items-center"
    >
      <n-empty :description="t('empty_text')" size="huge"> </n-empty>
    </div>

    <div v-if="tags" v-for="tag in tags">
      <PapawById
        v-if="tag[0] === 'e' && tag[1]"
        :id="tag[1]"
        :relays="tag[2] ? new Set([tag[2]]) : undefined"
      ></PapawById>

      <PapawByAddr
        v-else-if="tag[0] === 'a' && tag[1]"
        :a="tag[1]"
      ></PapawByAddr>
    </div>

    <PapawVueList
      v-if="postEvents"
      :eventList="postEvents"
      withPapawOptionsButtons
      :disabledReply="disabledReply"
    />
  </div>
</template>

<style scoped></style>
