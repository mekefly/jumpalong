import { type Event, type UnsignedEvent } from 'nostr-tools'
import { Nip04 } from './Nip04'

export interface NostrApi {
  getPublicKey(): Promise<string>
  getRelays(): Promise<{
    [url: string]: { read: boolean; write: boolean }
  }>
  signEvent(event: UnsignedEvent): Promise<Event>
  nip04: Nip04
}
