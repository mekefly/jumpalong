import type { Event } from 'nostr-tools'
import { createStaff } from '@jumpalong/core'

export default createStaff(line => {
  return line.defineEmit<'auth', [url: string, event: Event]>()
})
