import { createInjection } from '../utils/useUtils'
import { MaybeRef } from '@vueuse/core'
// import { autoSetLoadBuffer } from './LoadProgress'
import { EventLine, LoadStaffConfigType } from '../nostr-runtime'
import { EventEmitter } from '@jumpalong/shared'

export const [provideRefreshState, useRefreshState] = createInjection(
  'refresh-state',
  () => {
    const eventEmiter = new EventEmitter()
    type Type = 'refresh' | 'load' | 'auto-load' | 'auto-refresh'
    const listenerList: any[] = []
    onUnmounted(() => {
      eventEmiter.removeAllListeners()
    })
    return {
      on(type: Type, listener: () => void) {
        listenerList.push(listener)
        eventEmiter.on(type, listener)

        return () => this.removeListener(type, listener)
      },
      emit(type: Type) {
        eventEmiter.emit(type)
      },
      removeListener(type: Type, listener: () => void) {
        eventEmiter.removeListener(type, listener)
      },
    }
  }
)
export function useLoad(
  line: ComputedRef<undefined | null | EventLine<LoadStaffConfigType>>,
  active: MaybeRef<boolean | undefined>
) {
  const message = useMessage()

  //加载进度条
  // autoSetLoadBuffer(line)
  //监听加载事件
  const refreshState = useRefreshState()
  ;(['load', 'auto-load'] as const).forEach(key => {
    refreshState?.on(key, () => {
      if (!unref(active)) {
        return
      }
      console.log('auto-load')

      load()
    })
  })
  refreshState?.on('refresh', () => {
    if (!unref(active)) {
      return
    }
    refresh()
  })
  function load() {
    line.value?.load()
    // beltline.value?.feat.load()
    message.info(t('loading'))
  }
  function refresh() {
    line.value?.loadNew()
    // beltline.value?.feat.refresh()
    message.info(t('refreshing'))
  }
  return { load, refresh }
}
