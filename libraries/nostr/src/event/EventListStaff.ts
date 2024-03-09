import { CreateChildHookStaff, createStaff } from '@jumpalong/core'
import {
  createFactory,
  insertOnObjectList,
  reverseInsertOnObjectList,
} from '@jumpalong/shared'
import { Event } from 'nostr-tools'
import ReactiveStaff from '../reactive/ReactiveStaff'
import PoolStaff from '../server/PoolStaff'
import EventStaff from './EventStaff'
import { SortOptions } from '@/types/event'
type InsertBySort = (eventList: Event[], value: Event) => void

export const sortMethodFactory = {
  default() {
    return (eventList: Event[], value: Event) => {
      eventList.push(value)
    }
  },
  reverseDefault() {
    return (eventList: Event[], value: Event) => {
      eventList.unshift(value)
    }
  },
  insertOnObjectList(getValue: (item: Event) => number) {
    return (eventList: Event[], value: Event) => {
      insertOnObjectList(eventList, value, getValue)
    }
  },
  reverseInsertOnObjectList(getValue: (item: Event) => number) {
    return (eventList: Event[], value: Event) => {
      reverseInsertOnObjectList(eventList, value, getValue)
    }
  },
}
export const createSortMap =
  createFactory<Record<'positive' | 'reverse', Record<string, InsertBySort>>>()

const sortMap = createSortMap({
  positive: {
    ['default']: sortMethodFactory.default(),
    ['created-at']: sortMethodFactory.insertOnObjectList(e => e['created_at']),
  },
  reverse: {
    ['created-at']: sortMethodFactory.reverseInsertOnObjectList(
      e => e['created_at']
    ),
    ['default']: sortMethodFactory.reverseDefault(),
  },
})

export default createStaff(
  () => [PoolStaff, ReactiveStaff, CreateChildHookStaff, EventStaff],
  ({ mod, line }) => {
    function initList() {
      return line.ref([] as Event[])
    }
    console.log('EventListStaff', line)

    let mod1 = mod
      .assignFeat({
        eventList: null as null | { value: Event[] },
        insertEventList: sortMethodFactory.default(),
        pushEvent(e: Event, url: string = 'local', subId: string = 'local') {
          console.log('pushEvent', this.getList().length)

          this.insertEventList(this.getList(), e)
        },
        /**
         * 请求的事件列表
         * @returns
         */
        getList() {
          if (!this.eventList) {
            throw new Error("你需要调用'provideEventList'")
          }
          return this.eventList.value
        },
        setList(eventList: Event[]) {
          if (!this.eventList) {
            throw new Error("你需要调用'provideEventList'")
          }
          this.eventList.value = eventList
        },
        // useDefaultSort(){

        //   this.insertEventList = (
        //   eventList: Event[],
        //   value: Event,
        //   getValue: (item: Event) => number
        // ) {
        //   eventList.push(value)
        // }
        // },
        useInsertObjectListByCreatedAt() {
          this.insertEventList = sortMethodFactory.insertOnObjectList(
            e => e.created_at
          )
        },
        useReverseInsertObjectListByCreatedAt() {
          this.insertEventList = sortMethodFactory.reverseInsertOnObjectList(
            e => e.created_at
          )
        },
      })
      .assignChain({
        setInsertEventList(
          insertEventList: InsertBySort = sortMap['positive']['default']
        ) {
          this.insertEventList = insertEventList
        },
        setupSort(opts: SortOptions) {
          //设置排序
          this.setInsertEventList(
            sortMap[opts.reverseSort ? 'reverse' : 'positive'][
              opts['sort'] ?? 'default'
            ]
          )

          //重排序
          this.resort()
        },
        resort() {
          let insertEventList = this.insertEventList
          let list: Event[] = []
          this.getList().map(e => {
            insertEventList(list, e)
          })
          this.setList(list)
        },
      })
      .assignChain({
        provideEventList() {
          this.eventList = initList()
        },
      })

    line.onCreateChildDep<typeof mod1.line>(child => {
      //在自己的event上监听的是自己发布的订阅
      child.on('event', (subId, event, url) => {
        child.pushEvent(event, url, subId)
      })
    })
    console.log()

    return mod1
  }
)
