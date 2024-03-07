import { parseRelayConfiguration } from '../../../event'
import { LatestEventStaff } from '..'
import { RelayConfiguration } from '../../../types'
import { createStaff } from '../../staff'

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
