import { Event } from 'nostr-tools'
import { createStaff } from '../..'

export default createStaff(({ mod, line }) => {
  return mod.defineEmit<'publish', [url: string, event: Event], void>()
})
