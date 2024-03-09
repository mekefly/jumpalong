import { createStaff } from '@jumpalong/core'
import { Pubkey } from '@jumpalong/nostr-shared'

export default createStaff(({ mod, line }) => {
  return mod.assignFeat({
    getContactListLineByPubkey(pubkey: Pubkey | string) {
      pubkey = Pubkey.fromMaybeHex(pubkey)
      return useCached(() => {})
    },
  })
})
function useCached(arg0: () => void): any {
  throw new Error('Function not implemented.')
}
