import { createStaff } from '@jumpalong/core'
import { Event, EventTemplate, getEventHash } from 'nostr-tools/pure'
import { EventCreateAtStaff, LoginUtilsStaff } from '../staffExport'

export default createStaff(
  () => [EventCreateAtStaff, LoginUtilsStaff],
  ({ mod, line }) =>
    mod.assignFn({
      createEventTemplate<EVENT extends Partial<Event>>(
        options: EVENT
      ): EVENT & Partial<Event> & EventTemplate {
        let event: Partial<Event> & EventTemplate = Object.assign(
          {
            kind: 1,
            tags: [],
            content: '',
            created_at: this.nowCreateAt(),
          },
          options
        )

        return event as any
      },

      async createEvent(options: Partial<Event>): Promise<Event> {
        const pubkey = await this.getPubkeyOrNull()

        if (!pubkey) throw new Error('pubkey')

        let event: Event = Object.assign(this.createEventTemplate(options), {
          pubkey: pubkey.toHex(),
        }) as any
        this.createEventTemplate({})

        event = JSON.parse(JSON.stringify(event))

        event.id = getEventHash(event)

        event = await this.getNostrApi().signEvent(event)

        return event as any
      },
    })
)
