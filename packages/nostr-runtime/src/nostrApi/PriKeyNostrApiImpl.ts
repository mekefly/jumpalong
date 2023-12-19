import {
  getEventHash,
  getPublicKey,
  nip04,
  signEvent,
  type Event,
  type UnsignedEvent,
} from 'nostr-tools'
import { NostrApi } from './interface/NostrApi'
import { Nip04 } from './interface/Nip04'

export class PriKeyNostrApiImpl implements NostrApi {
  private pubkey?: string
  public getPrikey: () => string

  public nip04: Nip04

  constructor(prikey?: string) {
    this.getPrikey = () => {
      if (!prikey) throw new Error('Not prikey')
      return prikey
    }
    prikey && (this.pubkey = getPublicKey(prikey))
    this.nip04 = new PriKeyNip04(this.getPrikey)
  }

  public async getPublicKey() {
    if (!this.pubkey) throw new Error('Not pubkey')

    return this.pubkey
  }
  public async getRelays(): Promise<{
    [url: string]: { read: boolean; write: boolean }
  }> {
    return {}
  }
  public async signEvent(event: Event) {
    let _event: UnsignedEvent & Partial<Event> = Object.assign(
      {
        kind: 1,
        pubkey: this.getPublicKey(),
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: '',
      },
      event
    )

    !_event.id && (_event.id = getEventHash(_event))
    _event.sig = signEvent(event, this.getPrikey())
    return Promise.resolve(_event as Event)
  }
}

export class PriKeyNip04 implements Nip04 {
  private getPrikey: () => string
  constructor(getPrikey: () => string) {
    this.getPrikey = getPrikey
  }

  public async encrypt(_pubkey: string, plaintext: string) {
    return Promise.resolve(nip04.encrypt(this.getPrikey(), _pubkey, plaintext))
  }
  public async decrypt(_pubkey: string, ciphertext: string) {
    return Promise.resolve(nip04.decrypt(this.getPrikey(), _pubkey, ciphertext))
  }
}
