import { Filter } from 'nostr-tools'
import { createStaff } from '@jumpalong/core'
export default createStaff(({ mod, line }) => {
  return mod
    .defineEmit<'sub', [url: string, filter: Filter[], subId: string]>()
    .defineEmit<'desub', [subId: string, url: string], any>()
})
