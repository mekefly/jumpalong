import { EventEmitter } from 'events'
import { Event } from 'nostr-tools'
import { EventStaff, createStaff } from '../..'
/**
 * 她会保存最新的数据Event，其他将丢弃
 */
export default createStaff(EventStaff, ({ mod, line }) => {
  return mod
    .defineEmit<'latestEvent:update', [event: Event, old: Event | null]>()
    .assignFeat({
      latestEvent: null as Event | null,
      isHasLatestEvent() {
        return Boolean(this.latestEvent)
      },
      getLatestEvent() {
        return this.latestEvent
      },
      updateLatestEvent(event: Event) {
        let old = this.latestEvent
        this.latestEvent = event
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
    .inLine(line =>
      //当来新的event时
      line.on('event', (subId, event, url) => {
        //新的event创建时间更大则更新
        if (
          !line.latestEvent ||
          event.created_at > line.latestEvent.created_at
        ) {
          line.latestEvent = event
        }
      })
    )
})
