import { nip04, type Event } from 'nostr-tools'
import { finalizeEvent } from '../utils/event'
import { Prikey } from '../utils/user'
import { CommonNostrApiImpl } from './CommonNostrApiImpl'
import { NotLoginNostrApiImpl } from './NotLoginNostrApiImpl'

export class PriKeyNostrApiImpl extends CommonNostrApiImpl {
  public getPrikey
  constructor(prikey?: Prikey) {
    super()
    if (!prikey) {
      this.nostrApiProvide.resolve(new NotLoginNostrApiImpl())
    } else {
      this.nostrApiProvide.resolve({
        async encrypt(_pubkey, plaintext) {
          return await nip04.encrypt(prikey, _pubkey.toHex(), plaintext)
        },
        async decrypt(_pubkey, ciphertext) {
          return await nip04.decrypt(prikey, _pubkey.toHex(), ciphertext)
        },
        async signEvent(event: Event) {
          const _event = finalizeEvent(
            Object.assign(
              {
                kind: 1,
                pubkey: prikey.getPubkey(),
                created_at: Math.floor(Date.now() / 1000),
                tags: [],
                content: '',
              },
              event
            ),
            prikey
          )
          return Promise.resolve(_event as Event)
        },
        async getPublicKey() {
          return prikey.getPubkey()
        },
      })
      this.getPrikey = () => {
        return prikey
      }
    }
  }
}
