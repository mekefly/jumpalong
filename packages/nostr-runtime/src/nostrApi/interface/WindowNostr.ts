import { EventTemplate, type Event, type UnsignedEvent } from 'nostr-tools'

export interface WindowNostr {
  getPublicKey(): Promise<string>
  getRelays?(): Promise<{
    [url: string]: { read: boolean; write: boolean }
  }>
  signEvent(event: EventTemplate): Promise<Event>
  nip04: WindowNip04
}

export interface WindowNip04 {
  /**
   *
   * @param pubkey  对方的公钥
   * @param plaintext 密文
   */
  encrypt?(pubkey: string, plaintext: string): Promise<string>
  /**
   *
   * @param pubkey 对方的公钥
   * @param ciphertext 明文
   */
  decrypt?(pubkey: string, ciphertext: string): Promise<string>
}
