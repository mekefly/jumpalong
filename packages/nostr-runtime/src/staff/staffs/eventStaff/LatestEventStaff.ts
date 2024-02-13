import { Event } from 'nostr-tools'
import { CreateChildHookStaff } from '..'
import { createStaff } from '../../staff'
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
      .assignOwnFeat(() => ({
        latestEvent: line.ref(null as Event | null),
      }))
      .assignFeat({
        isHasLatestEvent() {
          return Boolean(this.getLatestEvent())
        },
        setLatestEvent(latestEvent: Event) {
          this.latestEvent.value = latestEvent
        },
        getLatestEvent() {
          return this.latestEvent.value
        },
        updateLatestEvent(event: Event) {
          let old = this.latestEvent.value
          this.latestEvent.value = event
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
        line.onCreateChildDep<typeof line>(l => {
          l.onEvent((subId, event, url) => {
            //新的event创建时间更大则更新
            let le = l.getLatestEvent()
            if (!le || event.created_at > le.created_at) {
              l.setLatestEvent(event)
            }
          })
        })
      )
  }
)
