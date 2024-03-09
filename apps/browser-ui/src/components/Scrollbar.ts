import { EventEmitter } from '@jumpalong/shared'
import { ScrollbarInst } from 'naive-ui'
import { InjectionKey } from 'vue'

export const scrollbarInstKey: InjectionKey<{
  scrollbarInst: Ref<ScrollbarInst | null>
  onScroll: (handle: (e: Event) => void) => void
  removeScrollListener: (handle: (e: Event) => void) => void
  containerRef: ComputedRef<HTMLElement | undefined | null>
}> = Symbol('scrollbarInstKey')

const eventEmitter = new EventEmitter()
export const useProviteScrollbarInstRef = (
  containerRef: ComputedRef<HTMLElement | undefined | null>
) => {
  const opt = {
    scrollbarInst: ref<ScrollbarInst | null>(null),
    onScroll(e: (e: Event) => void) {
      eventEmitter.on('scroll', e)
    },
    removeScrollListener(e: (e: Event) => void) {
      eventEmitter.removeListener('scroll', e)
    },
    containerRef,
  }

  provide(scrollbarInstKey, opt)
  return opt
}
export const useInjectScrollbarInstRef = () => {
  return inject(scrollbarInstKey, () => undefined, true)
}
