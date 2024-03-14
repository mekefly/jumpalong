import { createNotInjectStaff, createStaff } from '@jumpalong/core'
import type { Event } from 'nostr-tools'
import type { Pool } from '..'
import type { OkParmType } from '../server/OkStaff'
export interface PublishOptions {
  onOK?: (...rest: OkParmType) => void
}

export default createStaff(
  () => [createNotInjectStaff<'pool-staff', typeof Pool.Staff>('pool-staff')],
  mod => {
    return mod.assignFeat({
      publish(url: string, event: Event, ops: PublishOptions = {}) {
        this.relayPool.getLine().onOK(
          (eventId, opt) => {
            ops.onOK?.(eventId, opt)
          },
          {
            eventId: event.id,
          }
        )

        this.relayPool.getLine().emit('publish', url, event)
      },
      publishes(
        urls: Iterable<string>,
        event: Event,
        ops: PublishOptions = {}
      ) {
        for (const url of urls) {
          this.publish(url, event, ops)
        }
      },

      publishEvents(url: string, events: Event[], ops: PublishOptions = {}) {
        for (const event of events) {
          this.publish(url, event, ops)
        }
      },

      publishesEvents(
        urls: Iterable<string>,
        events: Event[],
        ops: PublishOptions = {}
      ) {
        for (const event of events) {
          this.publishes(urls, event, ops)
        }
      },
    })
  }
)
