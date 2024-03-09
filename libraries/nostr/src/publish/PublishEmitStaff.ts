import { createStaff } from '@jumpalong/core'
import { Event } from 'nostr-tools'
export default createStaff(({ mod }) => {
  return mod.defineEmit<'publish', [url: string, event: Event], void>()
})
