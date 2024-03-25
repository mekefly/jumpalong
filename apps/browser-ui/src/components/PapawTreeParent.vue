<script lang="ts" setup>
import { Event } from 'nostr-tools'
import { EventByIdApiStaff, PapawTreeLazyModeStaff } from '../nostr-runtime'
import PapawTree from './PapawTree.vue'
import PapawTreeAutoFindParent from './PapawTreeAutoFindRoot.vue'
import PapawTreeHierarchyVue from './PapawTreeHierarchy.vue'
import { useConfig, useEventLine } from './ProvideEventLine'
import { useRefreshState } from './Refresh'

const props = defineProps<{
  id: string
  relays: Set<string>
  chindEvent: Event
}>()

const line = useEventLine(EventByIdApiStaff)
const config = useConfig(PapawTreeLazyModeStaff)

const idLine = computed(() =>
  line.getEventById(props.id, { urls: props.relays })
)
const parentEvent = computed(() => idLine.value.getLatestEvent())

const isFindParent = ref(false)
const loadingbar = useLoadingBar()
function handelLoadParent() {
  isFindParent.value = true
  loadingbar.start()
  setTimeout(() => {
    loadingbar.finish()
  }, 1000)
}

const message = useMessage()

const refreshState = useRefreshState()
if (refreshState) {
  const removeListener = refreshState.on('refresh', () => {
    if (!isFindParent.value) {
      removeListener()
      setTimeout(() => {
        handelLoadParent()
        message.success(t('load_parent_success'))
      })
    } else {
      message.success(t('non_existent'))
    }
  })
  onUnmounted(removeListener)
}
!config.enableLazyLoadPapawTree && handelLoadParent()
</script>

<template>
  <PapawTreeAutoFindParent
    v-if="parentEvent && isFindParent"
    :event="parentEvent"
    :relays="relays"
  ></PapawTreeAutoFindParent>

  <div v-else>
    <div
      class="w-full flex justify-center items-center"
      v-if="!isFindParent && parentEvent"
    >
      <n-button text @click="handelLoadParent">
        {{ t('load_parent') }}
      </n-button>
    </div>
    <n-empty v-else :description="t('not_found_post')" size="huge"> </n-empty>
    <PapawTreeHierarchyVue>
      <PapawTree :event="chindEvent"></PapawTree>
    </PapawTreeHierarchyVue>
  </div>
</template>

<style scoped></style>
