import {
  Event,
  EventTemplate,
  UnsignedEvent,
  getEventHash,
  verifyEvent,
} from 'nostr-tools'
import { NotLoginNostrApiImpl } from '../../../nostrApi/NotLoginNostrApiImpl'
import { WindowNostrApiImpl } from '../../../nostrApi/WindowNostrApiImpl'
import { Prikey, Pubkey, getPubkey } from '../../../utils/user'
import { createStaff } from '../..'
import NostrApiStaff from './NostrApiStaff'
import {
  NostrApiMode,
  getNostrApiMode,
  setNostrApiMode,
} from '../../../nostrApi/NostrApiMode'
import { PriKeyNostrApiImpl } from '../../../nostrApi/PriKeyNostrApiImpl'
import EventCreateAtStaff from '../common/EventCreateAtStaff'

export const PRIVATE_KEY = 'prikey'

export default createStaff(
  EventCreateAtStaff,
  NostrApiStaff,
  'login',
  ({ mod, line }) => {
    let _pubkey: null | Pubkey = null
    return mod

      .assignFeat({
        logout() {
          this.nostrApi = notLogin()
        },
      })
      .inLine(line => line.setNostrApi(restoreLogin()))
      .assignFeat({
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
        getPubkey() {
          this.getPubkeyOrNull()
            .then(p => (_pubkey = p))
            .catch(() => {
              _pubkey = null
            })
          return _pubkey
        },
      })
      .assignFeat({
        createEventTemplate<EVENT extends Partial<Event>>(
          options: EVENT
        ): EVENT & Partial<Event> & EventTemplate {
          let event: Partial<Event> & EventTemplate = Object.assign(
            {
              kind: 1,
              tags: [],
              content: '',
              created_at: this.nowCreateAt(),
            },
            options
          )

          return event as any
        },

        async createEvent(options: Partial<Event>): Promise<Event> {
          const pubkey = await this.getPubkeyOrNull()
          if (!pubkey) throw new Error('pubkey')

          let event: UnsignedEvent & Partial<Event> = Object.assign(
            this.createEventTemplate(options),
            { pubkey: pubkey.toHex() }
          )

          event = JSON.parse(JSON.stringify(event))

          event.id = getEventHash(event)

          event = await this.getNostrApi().signEvent(event)

          return event as any
        },

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
          // const nostrApi = new PriKeyNostApiImpl(key)
          // this.container.rebind(TYPES.NostrApi).toDynamicValue(() => nostrApi)
          // injectNostrApi({ nostrApi })
          this.setNostrApi(restoreLogin())
        },
        windowNostrLogin() {
          let windowNostr = new WindowNostrApiImpl()
          this.loginApi(windowNostr)
        },
        loginApi(api: WindowNostrApiImpl) {
          if (api instanceof WindowNostrApiImpl) {
            setNostrApiMode(NostrApiMode.WindowNostr)
            this.setNostrApi(api)
          }
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

function restoreLogin() {
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
    case NostrApiMode.NostrContent:
      const pubkey = localStorage.getItem('pubkey')
      if (!pubkey) {
        return notLogin()
      }
      return notLogin()
    //TODO: 目前还没重构完成
    default:
      return notLogin()
  }
}
function notLogin() {
  setNostrApiMode(NostrApiMode.NotLogin) //取消登录
  return new NotLoginNostrApiImpl()
}
