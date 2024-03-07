import { NostrApiStaff, createStaff } from '../..'
import { NostrApiMode, getNostrApiMode } from '../../../nostrApi/NostrApiMode'
import { PriKeyNostrApiImpl } from '../../../nostrApi/PriKeyNostrApiImpl'

export default createStaff(
  () => [NostrApiStaff],
  ({ mod, line }) => {
    return mod.assignFeat({
      async getPrikeyOrNull() {
        //@Todo
        if (getNostrApiMode() !== NostrApiMode.PrivateKey) {
          return null
        }
        let nostrApi = this.getNostrApi()
        if (!(nostrApi instanceof PriKeyNostrApiImpl)) {
          return null
        }

        if (!nostrApi.getPrikey) {
          return
        }
        try {
          return nostrApi.getPrikey()
        } catch (error) {}
        return null
      },
      async getPubkeyOrNull(opt?: { intercept: boolean }) {
        try {
          let _pubkey = await this.getNostrApi().getPublicKey()
          return _pubkey
        } catch (error) {
          return null
        }
      },
      async isLogin() {
        return !!this.getPubkeyOrNull()
      },
      // getPubkey() {
      //   this.getPubkeyOrNull()
      //     .then(p => (_pubkey = p))
      //     .catch(() => {
      //       _pubkey = null
      //     })
      //   return _pubkey
      // },
    })
  }
)
