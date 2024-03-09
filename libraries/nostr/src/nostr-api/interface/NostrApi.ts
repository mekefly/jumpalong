import { Pubkey } from '@jumpalong/nostr-shared'
import { EventTemplate, type Event } from 'nostr-tools'

export interface NostrApi {
  getPublicKey(): Promise<Pubkey>
  signEvent(event: EventTemplate): Promise<Event>

  getRelays(): Promise<{
    [url: string]: { read: boolean; write: boolean }
  }>
  /**
   *
   * @param peerPubkey  对方的公钥
   * @param plaintext 密文
   */
  encrypt(peerPubkey: Pubkey, plaintext: string): Promise<string>
  /**
   *
   * @param pubkey 对方的公钥
   * @param ciphertext 明文
   */
  decrypt(peerPubkey: Pubkey, ciphertext: string): Promise<string>
}
