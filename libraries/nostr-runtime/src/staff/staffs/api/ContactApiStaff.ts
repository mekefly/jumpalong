import { createStaff } from '../../staff'
import { Pubkey } from '../../../utils/user'

export default createStaff(({ mod, line }) => {
  return mod.assignFeat({
    getContactListLineByPubkey(pubkey: Pubkey | string) {
      pubkey = Pubkey.fromMaybeHex(pubkey)
      return useCached(() => {})
    },
  })
})
