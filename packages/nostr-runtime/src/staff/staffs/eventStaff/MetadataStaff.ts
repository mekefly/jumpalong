import { Metadata } from '../../../types/Metadata'
import { parseMetadata } from '../../../utils/event'
import { createStaff } from '../../staff'
import LatestEventStaff from '../eventStaff/LatestEventStaff'
import ReactiveStaff from '../reactive/ReactiveStaff'
import CreateHookStaff from '../common/extends/CreateHookStaff'

export default createStaff(
  ReactiveStaff,
  LatestEventStaff,
  CreateHookStaff,
  'metadata-staff',
  ({ mod, line }) => {
    return mod
      .assignOwnFeat(() => ({
        metadata: line.ref({} as Metadata),
      }))
      .assignFeat({
        getMetadata<T extends Metadata>(): T | null {
          return (
            this.latestEvent.value &&
            (parseMetadata(this.latestEvent.value) as any)
          )
        },
        onHasMetadata<T extends Metadata>(listener: (metadata: T) => void) {
          this.onHasLatestEvent(e => {
            listener(parseMetadata(e))
          })
        },
      })
  }
)
