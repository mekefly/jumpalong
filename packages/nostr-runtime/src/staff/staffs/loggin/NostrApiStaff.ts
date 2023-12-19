import { retry } from '@jumpalong/shared'
import { createStaff } from '../..'
import { NostrApiImpl } from '../../../nostrApi/NostrApiImpl'
import {
  NostrApiMode,
  getNostrApiMode,
  setNostrApiMode,
} from '../../../nostrApi/NostrApiMode'
import { NotFoundNostrApiError } from '../../../nostrApi/error'
import { PRIVATE_KEY } from 'packages/browser-ui/src/api/login'
import { PriKeyNostrApiImpl } from 'packages/nostr-runtime/src/nostrApi/PriKeyNostrApiImpl'
import { nip19, signEvent } from 'node_modules/nostr-tools/lib'
import { NostrApi } from 'packages/nostr-runtime/src/nostrApi/interface/NostrApi'
import { createEventTemplate } from 'packages/shared/src/nostr'
import { Event, EventTemplate, UnsignedEvent, getEventHash } from 'nostr-tools'

export default createStaff(({ mod, line }) => {
  let nostrApi: any = createNostrApi()()
  return mod.assignFeat({
    getNostrApi(): NostrApi {
      return nostrApi || createNostrApi()()
    },
    logout() {
      nostrApi = null
    },
    async getPrikeyOrNull() {
      if (getNostrApiMode() === NostrApiMode.PrivateKey) {
        try {
          return nip19.nsecEncode(
            await (this.getNostrApi() as PriKeyNostrApiImpl).getPrikey()
          )
        } catch (error) {}
      }
      return null
    },
    async getPubkeyOrNull(opt?: { intercept: boolean }) {
      try {
        return await this.getNostrApi().getPublicKey()
      } catch (error) {
        // opt?.intercept
        return null
      }
    },
    createEventTemplate<EVENT extends Partial<Event>>(
      options: EVENT
    ): EVENT & Partial<Event> & EventTemplate {
      let event: Partial<Event> & EventTemplate = Object.assign(
        {
          kind: 1,
          tags: [],
          content: '',
          created_at: Math.floor(Date.now() / 1000),
        },
        options
      )

      return event as any
    },
    async createEvent(options: Partial<Event>): Promise<Event> {
      const pubkey = await this.getPubkeyOrNull()

      let event: UnsignedEvent & Partial<Event> = Object.assign(
        this.createEventTemplate(options),
        { pubkey }
      )
      event = JSON.parse(JSON.stringify(event))

      event.id = getEventHash(event)

      event = await this.getNostrApi().signEvent(event)

      return event as any
    },
  })
})

export function createWindowNostrApiImpl() {
  return new NostrApiImpl(() => {
    return retry(async () => {
      if ((window as any).nostr) {
        return (window as any).nostr
      } else {
        return Promise.reject(new NotFoundNostrApiError('Not Found Nostr'))
      }
    })
  })
}

function createNostrApi() {
  const mode = getNostrApiMode()
  //NostrApi
  switch (mode) {
    case NostrApiMode.WindowNostr:
      setNostrApiMode(NostrApiMode.WindowNostr) //windowLogin
      return () => createWindowNostrApiImpl()
    case NostrApiMode.PrivateKey:
      const prikey = localStorage.getItem(PRIVATE_KEY)
      if (!prikey) {
        setNostrApiMode(NostrApiMode.NotLogin) //取消登录
        return () => new NostrApiImpl()
        break
      }

      setNostrApiMode(NostrApiMode.PrivateKey) //私钥登录
      return () => new PriKeyNostrApiImpl(prikey)
    case NostrApiMode.NostrContent:
      const pubkey = localStorage.getItem('pubkey')

      if (!pubkey) {
        setNostrApiMode(NostrApiMode.NotLogin) //取消登录
        return () => new NostrApiImpl()
        break
      }

      setNostrApiMode(NostrApiMode.NotLogin) //取消登录

      return () => new NostrApiImpl()
      break
      //TODO: 目前还没重构完成
      break
    default:
      setNostrApiMode(NostrApiMode.NotLogin) //取消登录
      return () => new NostrApiImpl()
  }
}
