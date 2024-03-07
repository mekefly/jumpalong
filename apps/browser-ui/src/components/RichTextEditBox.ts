import { createId } from '@/utils/utils'
import { MaybeRef } from '@vueuse/core'
import { EventEmitter } from 'events'
import { Event } from 'nostr-tools'

import { Marker } from './RichTextEditBoxInput'
type EmitType = {
  (e: Marker, event: Event): void
  (e: 'clear'): void
}
type OnType = {
  (e: Marker, callback: (event: Event) => void): void
  (e: 'clear', callback: () => void): void
}
type Opt = {
  emitRichTextEditBox: EmitType
  onRichTextEditBox: OnType
  id: string
}
const richTextEditBoxEmiterKey: InjectionKey<Opt> = Symbol()

export function useRichTextEditBoxOpt(
  id: MaybeRef<string> | ComputedRef<string | null | undefined> = createId()
) {
  if (!unref(id)) {
    id = createId()
  }
  return inject(
    richTextEditBoxEmiterKey,
    () => {
      const eventEmiter = new EventEmitter()
      const emit: EmitType = function (e, ...rest: any) {
        eventEmiter.emit(e, ...rest)
      }

      const on: OnType = function on(e, callback) {
        eventEmiter.on(e, callback)
      }
      const opt: Opt = reactive({
        emitRichTextEditBox: emit,
        onRichTextEditBox: on,
        id: id,
      })

      provide(richTextEditBoxEmiterKey, opt)

      return opt
    },
    true
  )
}
export function useDragFileUpload(
  target: MaybeRef<HTMLElement | null>,
  upload: (file: File) => void,
  opt?: {}
) {
  const message = useMessage()

  useEventListener(target, 'dragenter', (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
  })
  useEventListener(target, 'dragover', (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
  })

  useEventListener(target, 'dragleave', (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
  })
  useEventListener(target, 'drop', (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!e.dataTransfer) return
    dealWithFile(e.dataTransfer?.files)
  })

  function dealWithFile(items: FileList) {
    if (items.length > 1) {
      return message.info('一次只允许上传一个文件')
    }
    var file = items[0]
    upload(file)
  }
}
type Upload = (file: File) => void
export function usePasteFile(target: Ref<HTMLElement | null>, upload: Upload) {
  function handelPaste(event: ClipboardEvent) {
    var items = event.clipboardData && event.clipboardData.items
    var file = null
    if (items && items.length) {
      // 检索剪切板items
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          file = items[i].getAsFile()
          break
        }
      }
    }
    if (!file) return
    upload(file)
    // 此时file就是剪切板中的图片文件
  }
  useEventListener(target, 'paste', handelPaste)
}
