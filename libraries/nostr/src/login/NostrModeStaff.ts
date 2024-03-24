import {
  NostrApiMode,
  getNostrApiMode,
  setNostrApiMode,
} from '../nostr-api/NostrApiMode'
import { createStaff } from '@jumpalong/core'

export default createStaff(({ mod, line }) => {
  return mod.assignFeat({
    NostrApiMode,
    getNostrApiMode,
    setNostrApiMode,
  })
})
