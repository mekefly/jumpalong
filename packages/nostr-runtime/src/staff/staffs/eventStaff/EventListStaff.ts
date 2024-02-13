import { Event } from 'nostr-tools'
import { CreateChildHookStaff, createStaff } from '../..'
import InsertObjectListStaff from './InsertObjectListStaff'
import EventStaff from './EventStaff'
import PoolStaff from '../server/PoolStaff'
import ReactiveStaff from '../reactive/ReactiveStaff'
import CreateHookStaff from '../common/extends/CreateHookStaff'
import ReverseSearchInsertOnObjectListStaff from './ReverseSearchInsertOnObjectListStaff'
import SearchInsertOnObjectListStaff from './SearchInsertOnObjectListStaff'
import {
  createTaskQueue,
  insertOnObjectList,
  reverseInsertOnObjectList,
} from '@jumpalong/shared'

export default createStaff(
  () => [PoolStaff, ReactiveStaff, CreateChildHookStaff, EventStaff],
  ({ mod, line }) => {
    function initList() {
      return line.ref([] as Event[])
    }
    let mod1 = mod
      .assignFeat({
        eventList: null as null | { value: Event[] },
        insertEventList(
          eventList: Event[],
          value: Event,
          getValue: (item: Event) => number
        ) {
          eventList.push(value)
        },
        pushEvent(e: Event, url: string = 'local', subId: string = 'local') {
          console.log('pushEvent', this.getList().length)

          this.insertEventList(this.getList(), e, e => e['created_at'])

          console.log('pushEvent', this.getList().length)
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
        useInsertObjectList() {
          this.insertEventList = insertOnObjectList
        },
        useReverseInsertObjectList() {
          this.insertEventList = reverseInsertOnObjectList
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

    return mod1
  }
)
