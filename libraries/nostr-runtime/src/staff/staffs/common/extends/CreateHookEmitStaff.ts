import { EventLine } from '@jumpalong/nostr-runtime'
import { createStaff } from '../../../staff'

export default createStaff(({ mod, line }) => {
  return mod.defineEmit<'create', [line: EventLine<{}>]>()
})
