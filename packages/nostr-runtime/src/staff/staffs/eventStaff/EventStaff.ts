import { Event } from 'nostr-tools'
import { createStaff } from '../../staff'

export default createStaff(mod => {
  let _mod = mod
    .defineEmit<
      'event',
      [subId: string, event: Event, url: string],
      boolean | void
    >()
    .defineEmit<
      `event:${string}`,
      [subId: string, event: Event, url: string],
      boolean
    >()
    .assignFeat({
      /**
       * 发送一个event
       * @param subId
       * @param event
       * @param url
       */
      emitEvent(subId: string, event: Event, url: string = 'local') {
        let createStopBubbling = (type: string) => (stop: boolean | void) => {
          console.log('stop', stop)
          if (stop === true) {
            this.stop(type as any)
          }
        }
        this.emitWithOption('event', [subId, event, url], {
          returnListener: createStopBubbling('event')
        })
        this.emitWithOption(`event:${subId}`, [subId, event, url], {
          returnListener: createStopBubbling(`event:${subId}`)
        })
      }
    })

  return _mod
})
