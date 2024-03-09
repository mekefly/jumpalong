import { CreateHookStaff, createStaff } from '@jumpalong/core'
import { Metadata, parseMetadata } from '@jumpalong/nostr-shared'
import ReactiveStaff from '../reactive/ReactiveStaff'
import LatestEventStaff from './LatestEventStaff'

export default createStaff(
  () => [ReactiveStaff, LatestEventStaff, CreateHookStaff],
  'metadata-staff',
  ({ mod, line }) => {
    return mod
      .assignOwnFeat(() => ({
        metadata: line.ref({} as Metadata),
      }))
      .assignFeat({
        getMetadata<T extends Metadata>(): T | null {
          return (
            this.getLatestEvent() &&
            (parseMetadata(this.getLatestEvent() as any) as any)
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
