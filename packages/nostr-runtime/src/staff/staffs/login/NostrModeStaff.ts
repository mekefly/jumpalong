import { createStaff } from '../..'
import {
  NostrApiMode,
  getNostrApiMode,
  setNostrApiMode,
} from '../../../nostrApi/NostrApiMode'

export default createStaff(({ mod, line }) => {
  return mod.assignFeat({
    NostrApiMode,
    getNostrApiMode,
    setNostrApiMode,
  })
})
