import {
  AddressPointerApi,
  EventUtilsStaff,
  getOnlyTag,
  toDeCodeAddress,
} from '../nostr-runtime'
import { nowSecondTimestamp } from '@jumpalong/shared'
import { type Event } from 'nostr-tools'
import { type AddressPointer } from 'nostr-tools/nip19'
import { createInjection } from '../utils/use'
import { useEventLine } from './ProvideEventLine'

export type MarkdownData = {
  content: string
  title: string
  publishedAt: number
  summary: string
  image: string
  hashtags: string[]
}

/**请求长消息 */
export function useMarkdownState(
  address: Ref<string | AddressPointer | undefined>
) {
  console.log('addressPointerLine:-2')
  //生成point
  const addressPointer = useDecodeAddressPointer(address)
  console.log('addressPointer', addressPointer)

  const markdownLine = useMarkdownLine(addressPointer)
  //markdown的事件
  const event = computed(() => markdownLine.value?.getLatestEvent())

  let markdownData = useMarkdownData(event)
  return {
    markdownLine,
    addressPointer,
    event,
    markdownData,
  }
}

function useMarkdownLine(
  addressPointer: globalThis.ComputedRef<AddressPointer | null>
) {
  const line1 = useEventLine(AddressPointerApi)
  //markdown 请求器所创建的line
  console.log('addressPointerLine:-1', addressPointer.value)

  const line = computed(
    () =>
      addressPointer.value &&
      line1.addressPointerLine(addressPointer.value, {
        urls: new Set(addressPointer.value.relays),
      })
  )
  return line
}

function useDecodeAddressPointer(
  address: globalThis.Ref<string | AddressPointer | undefined>
) {
  return computed(() => {
    if (!address.value) {
      return null
    } else {
      return typeof address.value === 'object'
        ? address.value
        : toDeCodeAddress(address.value)
    }
  })
}

/**
 * 长文本的数据
 * @param event
 * @returns
 */
export function useMarkdownData<E extends Event | undefined | null>(
  event: Ref<E>
) {
  return computed(() => {
    if (!event.value) return
    const option: Partial<MarkdownData> = {}

    option.content = event.value.content

    for (const type of ['title', 'summary', 'image'] as const) {
      const tag = getOnlyTag(type, event.value.tags)
      if (tag && tag[1]) {
        option[type] = tag[1]
      }
    }

    const tag = getOnlyTag('published_at', event.value.tags)
    if (tag && tag[1]) {
      try {
        option['publishedAt'] = parseInt(tag[1])
      } catch (error) {}
    }

    option['hashtags'] = event.value.tags
      .filter(tag => tag[0] === 't' && tag[1])
      .map(tag => tag[1])

    return option
  })
}
export const [proviteArticeSetting, useMarkdownSetting] = createInjection(
  (opt: { showArticleDetails: boolean }) => {
    return opt
  }
)

export function useToolbars() {
  return ref({
    bold: false, // 粗体
    italic: false, // 斜体
    header: false, // 标题
    underline: false, // 下划线
    strikethrough: false, // 中划线
    mark: false, // 标记
    superscript: false, // 上角标
    subscript: false, // 下角标
    quote: false, // 引用
    ol: false, // 有序列表
    ul: false, // 无序列表
    link: false, // 链接
    imagelink: false, // 图片链接
    code: false, // code
    table: false, // 表格
    fullscreen: true, // 全屏编辑
    readmodel: true, // 沉浸式阅读
    htmlcode: false, // 展示html源码
    help: false, // 帮助

    /* 1.3.5 */
    undo: false, // 上一步
    redo: false, // 下一步
    trash: false, // 清空
    save: false, // 保存（触发events中的save事件）

    /* 1.4.2 */
    navigation: false, // 导航目录

    /* 2.1.8 */
    alignleft: false, // 左对齐
    aligncenter: false, // 居中
    alignright: false, // 右对齐

    /* 2.2.1 */
    subfield: false, // 单双栏模式
    preview: false,
  })
}

export function useIsNewMarkdown() {
  const loadingBar = useLoadingBar()
  loadingBar.start()

  const route = useRoute()
  const isNewMarkdown = computed(() => route.query.new)
  watch(isNewMarkdown, () => {
    if (isNewMarkdown.value) {
      loadingBar.finish()
    }
  })
  return isNewMarkdown
}
export function useNewMarkdown() {
  return ref<MarkdownData>({
    content: '',
    title: '',
    publishedAt: nowSecondTimestamp(),
    summary: '',
    image: '',
    hashtags: [],
  })
}
export function markdownDataToEvent(
  markdownData: Ref<MarkdownData>,
  addrPoint: Ref<AddressPointer>
) {
  let loginLine = useEventLine(EventUtilsStaff)

  const titleTag = computed(() => ['title', markdownData.value.title])
  //发布时间
  const publishedAtTag = computed(() => [
    'published_at',
    String(markdownData.value.publishedAt),
  ])
  const summaryTag = computed(() => ['summary', markdownData.value.summary])
  const imageTag = computed(() => ['image', markdownData.value.image])
  const addrTag = computed(() => {
    return [
      'a',
      `${addrPoint.value.kind}:${addrPoint.value.pubkey}:${addrPoint.value.identifier}`,
    ]
  })
  const identifierTag = computed(() => ['d', addrPoint.value.identifier])

  const event = computed(() =>
    loginLine.createEventTemplate({
      kind: addrPoint.value.kind,
      content: markdownData.value.content,
      tags: [
        identifierTag.value,
        titleTag.value,
        publishedAtTag.value,
        summaryTag.value,
        imageTag.value,
        addrTag.value,
        ...markdownData.value.hashtags.map(t => ['t', t]),
      ],
    })
  )
  return event
}
