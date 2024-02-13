import { UnsignedEvent, type Event } from 'nostr-tools'
import { NotFoundNostrApiError } from './error'
import { NostrApi } from './interface/NostrApi'
import { Pubkey } from '../utils/user'
import { isNull } from 'util'

export class CommonNostrApiImpl implements NostrApi {
  private getNostrApi: () => Promise<Partial<NostrApi>>
  constructor(nostrApi?: () => Promise<Partial<NostrApi>>) {
    this.getNostrApi =
      nostrApi ??
      (async () => {
        return {}
      })
  }

  _pubkey: Pubkey | null = null
  async getPublicKey(): Promise<Pubkey> {
    this._pubkey = await this.run('getPublicKey')
    return this._pubkey
  }
  /**
   * name
   */
  public getPubkey(): Pubkey | null {
    this.getPublicKey().then(p => {
      this._pubkey = p
    })
    return this._pubkey
  }
  signEvent(event: UnsignedEvent): Promise<Event> {
    return this.run('signEvent', JSON.parse(JSON.stringify(event)))
  }
  getRelays(): Promise<{ [url: string]: { read: boolean; write: boolean } }> {
    return this.run('getRelays')
  }
  encrypt(peerPubkey: Pubkey, plaintext: string): Promise<string> {
    return this.run('encrypt', peerPubkey, plaintext)
  }
  decrypt(peerPubkey: Pubkey, ciphertext: string): Promise<string> {
    return this.run('decrypt', peerPubkey, ciphertext)
  }

  private async run<K extends keyof NostrApi>(
    key: K,
    ...rest: Parameters<NostrApi[K]>
  ): Promise<Awaited<ReturnType<NostrApi[K]>>> {
    const nostrApi = await this.getNostrApi()
    let f = nostrApi[key]
    if (!f) throw new NotFoundNostrApiError(key)
    return (await f(...(rest as [any, any]))) as any
  }
}
