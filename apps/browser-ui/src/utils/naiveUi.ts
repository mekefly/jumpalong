import { NIcon, NInput, useMessage } from 'naive-ui'
import { Component, h } from 'vue'
import { clipboardText } from './utils'
import { DialogOptions } from 'naive-ui'
import AbsentPrompt from '../components/AbsentPrompt.vue'
import { CacheOptions, getCacheOrNull, setCache } from '@jumpalong/shared'

export function useClipboardDialog() {
  const message = useMessage()
  const dialog = useDialog()
  return function clipboard(msg: string) {
    let type: 'success' | 'error' = 'success'
    try {
      if (!msg) {
        message.error(t('empty_text'))
        return
      }
      clipboardText(msg)
      type = 'success'
    } catch (error) {
      type = 'error'
    }
    dialog[type]({
      title: t(type),
      content: () => h(NInput, { value: msg, type: 'textarea' }),
      positiveText: t('yes'),
      negativeText: t('no'),
      onPositiveClick: () => {},
      onNegativeClick: () => {},
    })
  }
}
export const renderIcon = (icon: Component, props: any = null) => {
  return () => {
    return h(NIcon, props, {
      default: () => h(icon),
    })
  }
}
export const renderWithClick = (str: string, click: () => void) => {
  return () => h('span', { onClick: click }, { default: () => str })
}

export function useAbsentPromptDialog() {
  const dialog = useDialog()
  return (
    options: DialogOptions & {
      name?: string
      onPositiveClick?: () => any
      onNegativeClick?: () => any
    }
  ) => {
    let name = options.name || options.content || options.title

    console.log('typeof name', name)

    if (typeof name !== 'string') {
      return dialog.create(options)
    }
    console.log(name)

    let rememberedKey = getCacheOrNull(name) as
      | 'onPositiveClick'
      | 'onNegativeClick'
    console.log('rememberedKey', rememberedKey)

    let x = options[rememberedKey]
    if (x) {
      return x()
    }

    const cacheOption: CacheOptions = {
      useLocalStorage: true,
      useMemoryCache: true,
      duration: 1000 * 3600 * 24 * 7,
    }
    console.log('1')

    let isRemembered = ref(false)
    console.log('2')
    dialog.info({
      ...options,
      title: options.title || (options.type ? t(options.type) : undefined),
      content: () =>
        h(
          AbsentPrompt,
          {
            absentPrompt: isRemembered.value,
            ['onUpdate:absentPrompt'](v: any) {
              isRemembered.value = v
            },
          },
          {
            default: () =>
              typeof options.content === 'function'
                ? options.content()
                : options.content,
          }
        ),
      ...(options.onPositiveClick
        ? {
            onPositiveClick(...rest) {
              isRemembered.value &&
                setCache(name, 'onPositiveClick', cacheOption)
              options.onPositiveClick?.(...rest)
            },
          }
        : {}),
      ...(options.onNegativeClick
        ? {
            onNegativeClick(...rest) {
              isRemembered.value &&
                setCache(name, 'onNegativeClick', cacheOption)
              options.onNegativeClick?.(...rest)
            },
          }
        : {}),
    })
  }
}
