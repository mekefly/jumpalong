import { createStaff } from '@jumpalong/core'
import {
  RelayConfiguration,
  parseRelayConfiguration,
} from '@jumpalong/nostr-shared'
import { LatestEventStaff } from '..'

export default createStaff(
  () => [LatestEventStaff],
  ({ mod, line }) => {
    return mod.assignFeat({
      getRelayConfiguration(): RelayConfiguration | null {
        const e = this.getLatestEvent()
        if (!e) {
          return null
        }

        return parseRelayConfiguration(e.tags)
      },
      onHasRelayConfiguration(
        listener: (metadata: RelayConfiguration) => void
      ) {
        this.onHasLatestEvent(e => {
          listener(parseRelayConfiguration(e.tags))
        })
      },
    })
  }
)
