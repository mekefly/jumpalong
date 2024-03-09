<script lang="ts" setup>
// import { localMap } from '@/nostr-runtime'
// import { parseMetadata } from "@jumpalong/nostr-runtime";
import {
  matchTagPlaceholderRegExp,
  matchTagRegExp,
  matchUrlRegExp,
  isNumberAndNotNaN,
} from '@jumpalong/shared'
import { useLazyShow } from '../utils/use'
import { Event, nip19 } from 'nostr-tools'
// import ContentReplyItemVue from './ContentReplyItem.vue'
import ContentWebsiteVue from './ContentWebsite.vue'
import AiddrLink from './NaddrLink.vue'
// import RelayContent from './RelayContent.vue'
import UserLinkVue from './UserLink.vue'
import { parseMetadata } from '@/nostr-runtime'

const props = defineProps<{
  event: Event
  contenteditable?: boolean
  disabledReply?: boolean
}>()
const { event, contenteditable } = toRefs(props)

type ParseHandel = (
  next: (text: string) => void,
  text: string,
  cols: string[][],
  event: Event
) => void

function matchAll(
  text: string,
  regExp: RegExp,
  onText: (text: string) => void,
  onMatchText: (
    text: string,
    index: number,
    regExpMatchArray: RegExpMatchArray
  ) => void
) {
  let last = 0
  const regExpStringIterator = regExp[Symbol.matchAll](text)
  for (const regExpMatchArray of regExpStringIterator) {
    let index = regExpMatchArray['index']
    let matchText = regExpMatchArray[0] as string

    // 判断非数字和nan
    if (!isNumberAndNotNaN(index)) continue
    //间隔部分两个标签之间的文本 #[0]
    if (index - last > 0) {
      onText(text.slice(last, index))
    }

    onMatchText(matchText, index, regExpMatchArray)

    last = index + matchText.length
  }

  if (text.length - last > 0) {
    onText(text.slice(last))
  }
}

const parseHandelList: ParseHandel[] = [
  (next, text, cols, event) => {
    // 处理占位符
    // #[0] #[19999]

    matchAll(
      text,
      matchTagPlaceholderRegExp(),
      text => {
        next(text)
      },
      (mark, _, regExpMatchArray) => {
        let markIndex = regExpMatchArray[1] as string
        if (!mark) return
        if (!markIndex) return

        cols.push(parseTagPlaceholder(mark, markIndex, event.tags) as any)
      }
    )
  },
  (next, text, cols, event) => {
    //&notexxxx &nevent

    matchAll(
      text,
      /(nostr:|&|@)((naddr)[a-zA-Z0-9]+)/g,
      text => {
        next(text)
      },
      (_, _1, regExpMatchArray) => {
        const value = regExpMatchArray[2]

        if (!value) return

        cols.push(['naddr', value])
      }
    )
  },
  (next, text, cols, event) => {
    //&notexxxx &nevent

    matchAll(
      text,
      /(nostr:|&|@)((nevent|note)[a-zA-Z0-9]+)/g,
      text => {
        next(text)
      },
      (_, _1, regExpMatchArray) => {
        const value = regExpMatchArray[2]

        if (!value) return

        cols.push(['e', value])
      }
    )
  },
  (next, text, cols, event) => {
    //#npubxxxx #nprofile

    matchAll(
      text,
      /(nostr:|@)((nprofile|npub)[a-zA-Z0-9]+)/g,
      text => {
        next(text)
      },
      (_, _1, regExpMatchArray) => {
        const value = regExpMatchArray[2]
        if (!value) return

        cols.push(['p', `@${value}`, value])
      }
    )
  },
  (next, text, cols, event) => {
    //#xxx #yyy #zzz

    matchAll(
      text,
      matchTagRegExp(),
      text => {
        next(text)
      },
      (_, index, regExpMatchArray) => {
        const tag = regExpMatchArray[1]
        if (!tag) return
        cols.push(['t', `#${tag}`, tag])
      }
    )
  },
  (_, text, cols) => {
    cols.push(['text', text])
  },
]

function parseCol(text: string, clos: string[][], event: Event) {
  const createNext = (index: number) => {
    const parseHandel = parseHandelList[index]
    if (!parseHandel) {
      return () => {}
    }
    return (text: string) => {
      if (!text) {
        return
      }
      parseHandel(createNext(index + 1), text, clos, event)
    }
  }

  const toParse = createNext(0)
  toParse(text)
}

function parseTagPlaceholder(
  mark: string,
  markIndex: string,
  tags: string[][]
) {
  const index = parseInt(markIndex)

  if (!isNumberAndNotNaN(index)) return ['text', mark]
  const tag = tags[index]
  if (!tag) return ['text', mark]
  const data = tag[1]
  if (!data) return ['text', mark]

  switch (tag[0]) {
    case 'p':
    // const pubkey = data
    // const event = localMap.kind0.get(pubkey)
    // const nprofilte = nip19.nprofileEncode({ pubkey: data })
    // if (event) {
    //   const metadata = parseMetadata(event)

    //   return ['p', `@${metadata.name}`, nprofilte] as const
    // }

    // return ['p', `@${nprofilte}`, nprofilte] as const
    case 'e':
      const nevent = nip19.neventEncode({ id: data })
      return ['e', nevent] as const
    case 't':
      return ['t', `#${data}`, data] as const
    default:
      return ['text', mark] as const
  }
}
type Rows = Array<Array<[string, string, ...any[]]>>

function parseRow(text: string, rows: Rows) {
  text.split('\n').forEach(row => {
    const cols: Array<[string, string, ...any[]]> = []

    matchAll(
      row,
      matchUrlRegExp(),
      text => {
        parseCol(text, cols, event.value)
      },
      (matchText, index, regExpMatchArray) => {
        let url = matchText as string

        //url部分
        if (
          ['.jpg', '.jpeg', '.png', '.gif', '.bmp'].some(suffix =>
            url.endsWith(suffix)
          )
        ) {
          cols.push(['img', url, url])
        } else if (
          ['.mov', '.mp4', '.av1'].some(suffix => url.endsWith(suffix))
        ) {
          cols.push(['video', url, url])
        } else {
          if (row === url) {
            //一个url占用一整行
            cols.push(['website', url, url])
          } else {
            //如果是内嵌url就直接展示
            cols.push(['url', url, url])
          }
        }
      }
    )

    cols.push(['enter', ''])

    rows.push(cols)
  })
}

const rows = computed(() => {
  const rows: Rows = []
  parseRow(event.value.content, rows)
  return rows
})
const [target, show] = useLazyShow()
function handelClick(item: string[], e: MouseEvent) {
  if (
    ['e', 'p', 'url', 'website', 'img', 'video', 't'].some(v => item[0] === v)
  ) {
    e.stopPropagation()
  }
}
</script>

<template>
  <div class="w-full" ref="target">
    <div>
      <div
        v-for="row in rows"
        :key="String(row)"
        class="w-full flex flex-wrap justify-start items-start"
      >
        <span
          v-for="item in row"
          :key="item[1]"
          class="flex justify-start items-start"
          :class="{
            'w-full': ['e', 'website', 'img', 'video'].some(v => item[0] === v),
          }"
          @click="e => handelClick(item, e)"
        >
          <div v-if="item[0] === 'img'">
            <n-image class="img w-full" :src="item[1]" />
          </div>
          <div v-else-if="item[0] === 'video'" class="p-0 m-0 w-full h-auto">
            <video
              controls
              class="overflow-hidden rounded-2xl w-full m-0 p-0 h-auto"
            >
              <source :src="item[1]" />
            </video>
          </div>
          <ContentWebsiteVue
            v-else-if="item[0] === 'website'"
            :key="item[1]"
            :src="item[1]"
          />
          <a v-else-if="item[0] === 'url'" class="break-words" :href="item[2]">
            {{ item[1] }}
          </a>

          <RouterLink
            v-else-if="item[0] === 't'"
            :to="{
              name: 'tag',
              params: {
                value: item[2],
              },
            }"
          >
            {{ item[1] }}
          </RouterLink>

          <AiddrLink v-else-if="item[0] === 'naddr'" :addr="item[1]" />
          <UserLinkVue v-else-if="item[0] === 'p'" :value="item[2]" />
          <!-- <ContentReplyItemVue
            v-else-if="item[0] === 'e'"
            :event="event"
            :value="item[1]"
            :tag="item[2]"
          /> -->
          <a
            v-else-if="item[0] === 'url'"
            class="break-words block"
            :style="{
              'word-break': 'break-all',
              'text-overflow': 'ellipsis',
              'word-wrap': 'break-word',
            }"
            :href="item[2]"
          >
            {{ item[1] }}
          </a>
          <br v-else-if="item[0] === 'enter'" class="break-words block" />
          <span
            v-else
            class="flex"
            :style="{
              'table-layout': 'fixed',
              'word-break': 'break-all',
              'word-wrap': 'break-word',
            }"
            v-text="item[1].replace(' ', '&nbsp')"
          />
        </span>
      </div>
    </div>
    <!-- <RelayContent v-if="!disabledReply && show" :event="event" /> -->
  </div>
</template>

<style scoped>
.img :deep() img {
  width: 100%;
}
.break-words {
  word-wrap: break-word;
}
</style>
