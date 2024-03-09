import { CreateChildHookStaff, createStaff } from '@jumpalong/core'
import { Event } from 'nostr-tools'
import PublishStaff, { PublishOptions } from '../publish/PublishStaff'
import AddUrlStaff from './AddUrlStaff'

export default createStaff(
  () => [AddUrlStaff, CreateChildHookStaff, PublishStaff],
  'AddPublishStaff',
  ({ mod, line }) => {
    let mod1 = mod
      .defineEmit<'add-publish', [event: Event, opts?: PublishOptions]>()
      .assignOwnFeat(() => ({
        publishedEventIds: new Set<string>(),
        publishedEventList: [] as [Event, publishOptions?: PublishOptions][],
      }))
      .assignChain({
        addPublish(event: Event, opts?: PublishOptions) {
          if (this.publishedEventIds.has(event.id)) {
            return
          }
          this.emit('add-publish', event, opts)

          this.publishedEventIds.add(event.id)
          this.publishedEventList.push(opts ? [event, opts] : [event])
        },
        addPublishes(events: Event[], opts?: PublishOptions) {
          for (const event of events) {
            this.addPublish(event, opts)
          }
        },
      })

    mod1.line.onCreateChildDep<typeof mod1.line>(l => {
      l.on('add-urls', urls => {
        l.publishedEventList.map(([e, opts]) => {
          l.publishes(urls, e, opts)
        })
        l.on('add-publish', (event, opts) => {
          l.publishes(urls, event, opts)
        })
      })
    })
    return mod1
  }
)
