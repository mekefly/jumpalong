import { Event } from 'nostr-tools'
import { EventStaff, createStaff } from '../..'
import InsertObjectListStaff from './InsertObjectListStaff'

export default createStaff(
  InsertObjectListStaff,
  EventStaff,
  ({ mod, line }) => {
    let mod1 = mod.assignFeat({
      eventList: [] as Event[],
      pushEvent(e: Event, url: string = 'local', subId: string = 'local') {
        this.insertObjectList(this.eventList, e, e => e['created_at'])
      },
    })
    mod1.out().on('event', (subId, event, url) => {
      mod1.line.pushEvent(event, url, subId)
    })

    return mod1
  }
)
