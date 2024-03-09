import { Event } from 'nostr-tools'
import { CreateChildHookStaff, createStaff } from '@jumpalong/core'
import ReactiveStaff from '../reactive/ReactiveStaff'
import EventStaff from './EventStaff'

/**
 * 她会保存最新的数据Event，其他将丢弃
 */
export default createStaff(
  () => [EventStaff, ReactiveStaff, CreateChildHookStaff],
  ({ mod, line }) => {
    return mod
      .defineEmit<'latestEvent:update', [event: Event, old: Event | null]>()
      .provide('latestEvent', function () {
        let eventRef = this.reactive({
          value: null as Event | null,
        })
        this.onEvent((subId, event, url) => {
          //新的event创建时间更大则更新
          if (!eventRef.value || event.created_at > eventRef.value.created_at) {
            eventRef.value = event
          }
        })
        return eventRef
      })
      .assignFeat({
        isHasLatestEvent() {
          return Boolean(this.getLatestEvent())
        },
        setLatestEvent(latestEvent: Event) {
          return (this.injectLatestEvent().value = latestEvent)
        },
        getLatestEvent() {
          return this.injectLatestEvent().value
        },
        updateLatestEvent(event: Event) {
          let old = this.getLatestEvent()
          this.injectLatestEvent().value = event
          this.emit('latestEvent:update', event, old)
        },
        onHasLatestEvent(listener: (event: Event) => void) {
          if (this.isHasLatestEvent()) {
            listener(this.getLatestEvent() as Event)
          }
          this.on('latestEvent:update', listener)
        },
        onHasLatestEventOnce(listener: (event: Event) => void) {
          if (this.isHasLatestEvent()) {
            listener(this.getLatestEvent() as Event)
          } else {
            this.on('latestEvent:update', listener, { once: true })
          }
        },
      })
  }
)
