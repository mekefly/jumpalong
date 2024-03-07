import { EventLine } from 'packages/nostr-runtime/src/eventLine'
import { createStaff } from '../..'
import { NostrApi, NostrConnectNostrApiImpl } from '../../../nostrApi'
import {
  NostrApiMode,
  getNostrApiMode,
  setNostrApiMode,
} from '../../../nostrApi/NostrApiMode'
import { NotLoginNostrApiImpl } from '../../../nostrApi/NotLoginNostrApiImpl'
import { PriKeyNostrApiImpl } from '../../../nostrApi/PriKeyNostrApiImpl'
import { WindowNostrApiImpl } from '../../../nostrApi/WindowNostrApiImpl'
import { Prikey, Pubkey, getPubkey } from '../../../utils/user'
import EventCreateAtStaff from '../common/EventCreateAtStaff'
import NostrApiStaff from './NostrApiStaff'

export const PRIVATE_KEY = 'prikey'

export default createStaff(
  () => [EventCreateAtStaff, NostrApiStaff],
  'login',
  ({ mod, line }) => {
    let _pubkey: null | Pubkey = null
    return mod
      .assignFn({
        logout() {
          this.nostrApi = notLogin()
        },
      })
      .inLine(line => line.setNostrApi(restoreLogin(line)))
      .assignFn({
        testAndVerifyNewUser() {
          const newUserFlagPubkey = localStorage.getItem('newUserFlag')
          const currentPrikey = localStorage.getItem('prikey')
          const currentPubkey =
            currentPrikey && getPubkey(Prikey.fromHex(currentPrikey))
          if (
            getNostrApiMode() === NostrApiMode.PrivateKey &&
            newUserFlagPubkey &&
            newUserFlagPubkey === currentPubkey
          ) {
            return true
          } else {
            return false
          }
        },
        getNostrApiMode,
        setNostrApiMode,
        loginPrikey(key: Prikey) {
          localStorage.setItem(PRIVATE_KEY, key.toHex())
          setNostrApiMode(NostrApiMode.PrivateKey)
          const nostrApi = new PriKeyNostrApiImpl(key)

          this.setNostrApi(nostrApi)
        },
        windowNostrLogin() {
          let windowNostr = new WindowNostrApiImpl()
          this.loginApi(NostrApiMode.WindowNostr, windowNostr)
        },
        loginApi(mode: NostrApiMode, api: NostrApi) {
          setNostrApiMode(mode)
          this.setNostrApi(api)
        },

        registerPrikey(prikey: Prikey = Prikey.create()) {
          this.loginPrikey(prikey)

          const pubkey = prikey.getPubkey()
          localStorage.setItem('newUserFlag', pubkey.toHex())

          return prikey
        },
        clearNewUserFlag() {
          localStorage.removeItem('newUserFlag')
        },
      })
  }
)

function restoreLogin(line: EventLine<{}>): NostrApi {
  const mode = getNostrApiMode()
  //NostrApi
  switch (mode) {
    case NostrApiMode.NotLogin:
      return notLogin()
    case NostrApiMode.WindowNostr:
      return new WindowNostrApiImpl()
    case NostrApiMode.PrivateKey:
      const prikey = localStorage.getItem(PRIVATE_KEY)
      if (!prikey) {
        return notLogin()
      }
      return new PriKeyNostrApiImpl(Prikey.fromHex(prikey))
    case NostrApiMode.NostrConnect:
      const bunker = localStorage.getItem('bunker')
      if (!bunker) {
        return notLogin()
      }
      try {
        const api = NostrConnectNostrApiImpl.fromBunker(line, bunker)
        api.connect()
        return api
      } catch (error) {
        return notLogin()
      }
    default:
      return notLogin()
  }
}
function notLogin() {
  setNostrApiMode(NostrApiMode.NotLogin) //取消登录
  return new NotLoginNostrApiImpl()
}
