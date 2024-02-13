<script lang="ts" setup>
import RefreshVue from './Refresh.vue'
import { useProviteScrollbarInstRef } from './Scrollbar'

const containerRef = computed(
  () =>
    (scrollbarInst.value as any)?.scrollbarInstRef.containerRef as
      | HTMLElement
      | null
      | undefined
)
const { scrollbarInst } = useProviteScrollbarInstRef(containerRef)
const props = defineProps<{
  refreshable?: boolean
  loadable?: boolean
  triggerDistance?: number
  maxShifting?: number
}>()
const { refreshable, loadable } = toRefs(props)
const emit = defineEmits<{
  (e: 'refresh'): void
  (e: 'load'): void
}>()
</script>

<template>
  <div class="wraps flex flex-col h-full relative overflow-hidden">
    <RefreshVue
      :container-ref="containerRef"
      v-bind="props"
      @load="() => emit('load')"
      @refresh="() => emit('refresh')"
    >
      <n-scrollbar
        class="w-full flex-shrink flex-1"
        @scroll=""
        ref="scrollbarInst"
      >
        <slot></slot>
      </n-scrollbar>
    </RefreshVue>
  </div>
</template>

<style scoped>
.wraps {
  mask-image: -webkit-linear-gradient(
    rgba(0, 0, 0, 0) 0em,
    rgba(0, 0, 0, 1) 0.5em,
    rgba(0, 0, 0, 1) calc(100% - 0.5em),
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
