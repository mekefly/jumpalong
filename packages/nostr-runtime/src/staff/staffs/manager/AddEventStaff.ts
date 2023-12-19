import { Event } from 'nostr-tools'
import { createStaff } from '../..'

export default createStaff(({ mod, line }) => {
  return mod.defineEmit<'add-event', [event: Event]>().assignFeat({
    publishedEventIds: new Set<string>(),
    publishedEventList: [] as Event[],
    addEvent(event: Event) {
      if (this.publishedEventIds.has(event.id)) {
        return
      }
      this.emit('add-event', event)
      this.publishedEventIds.add(event.id)
      this.publishedEventList.push(event)
    },
    addEvents(events: Event[]) {
      for (const event of events) {
        this.addEvent(event)
      }
    },
  })
})
