import { retry } from '@jumpalong/shared'
import { CommonNostrApiImpl } from './CommonNostrApiImpl'
import { NotFoundNostrApiError } from './error'
import { WindowNostr } from './interface/WindowNostr'
import { NostrApi } from './interface/NostrApi'
import { Pubkey } from '@jumpalong/nostr-shared'

export class WindowNostrApiImpl extends CommonNostrApiImpl {
  constructor() {
    super()
    this.provide()
  }
  provide() {
    retry(async () => {
      if ((window as any).nostr) {
        this.nostrApiProvide.resolve(
          this.windowNostrToNostrApi((window as any).nostr)
        )
        return
      } else {
        this.nostrApiProvide.reject(new NotFoundNostrApiError('WebNostrApi'))
      }
    })
  }

  private windowNostrToNostrApi(nostr: WindowNostr): Partial<NostrApi> {
    let part: Partial<NostrApi> = {}

    if (nostr.getRelays) {
      part.getRelays = nostr.getRelays.bind(nostr)
    }

    if (nostr.signEvent) {
      part.signEvent = nostr.signEvent.bind(nostr)
    }
    if (nostr.getPublicKey) {
      part.getPublicKey = async () => {
        return Pubkey.fromHex(await nostr.getPublicKey())
      }
    }
    let nip04 = nostr.nip04
    if (nip04) {
      if (nip04.decrypt) {
        let decrypt = nip04.decrypt.bind(nip04)
        part.decrypt = (pubkey, ciphertext) => {
          return (nip04.decrypt ?? decrypt)(pubkey.toHex(), ciphertext)
        }
      }
      if (nip04.encrypt) {
        let encrypt = nip04.encrypt.bind(nip04)
        part.encrypt = (pubkey, plaintext) => {
          return (nip04.encrypt ?? encrypt)(pubkey.toHex(), plaintext)
        }
      }
    }
    return part
  }
}
