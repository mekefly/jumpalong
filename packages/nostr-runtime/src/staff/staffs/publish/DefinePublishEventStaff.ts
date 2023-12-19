import { Event } from 'nostr-tools'
import { createStaff } from '../../staff'

export default createStaff(line => {
  return line
    .defineEmit<'publish', [url: string, event: Event], void>()
    .assignFeat({
      publish(url: string, event: Event) {
        this.emitWithOption('publish', [url, event])
      },
      publishes(urls: Iterable<string>, event: Event) {
        for (const url of urls) {
          this.publish(url, event)
        }
      }
    })
})
