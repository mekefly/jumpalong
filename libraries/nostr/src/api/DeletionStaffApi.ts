import { createStaff } from '@jumpalong/core'
import {
  AddPublishStaff,
  AddUrlsByCueStaff,
  EventApiStaff,
  EventUtilsStaff,
} from '..'
import { PublishOptions } from '../publish/PublishStaff'
import { CueOptions } from '@/types/api'

/**
 * NIP-09
 * https://github.com/nostr-protocol/nips/blob/master/09.md
 */
export default createStaff(
  () => [EventApiStaff, AddPublishStaff, EventUtilsStaff, AddUrlsByCueStaff],
  ({ mod, line }) => {
    return mod.assignFn({
      async deleteEvent(
        opts: CueOptions & {
          eventId?: string
          a?: string
          publishOpts?: PublishOptions
        }
      ) {
        console.log('deleteEvent', opts)

        const publishLine = this.createChild()
        const tags = []
        opts.eventId && tags.push(['e', opts.eventId])
        opts.a && tags.push(['a', opts.a])
        publishLine.addPublish(
          await line.createEvent({
            kind: 5,
            tags,
            content: '',
          }),
          opts.publishOpts
        )
        publishLine.addUrlsByCubChain(opts)
        publishLine.asyncCall(async function () {
          this.addUrls(await this.relayConfigurator.initedGetWriteList())
        })
      },
    })
  }
)
