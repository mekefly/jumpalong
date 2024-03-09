import { Event } from 'nostr-tools'
import { EventMap } from './EventMap'
import { key } from '@/types/local-event'

const replaceKinds = [0, 3]
export class ReplaceableEventMap extends EventMap {
  static isReplaceableKind(kind: number) {
    return (10000 <= kind && kind < 20000) || replaceKinds.some(k => k === kind)
  }
  constructor(kind: number | string) {
    super(`RE:${kind}`)
  }
  public add(event: Event) {
    let oldEvent = this.getByPubkey(event.pubkey)
    //事件必须不存在或新事件更新
    if (!oldEvent || event.created_at > oldEvent.created_at) {
      this.set(event.pubkey, event)
    }
  }
  public deleteEventByPubkey(pubkey: key) {
    this.delete(pubkey)
  }
  public getByPubkey(pubkey: string): Event | undefined {
    return this.get(pubkey)
  }
  public query(pubkeys: Set<string>) {
    let events: Event[] = []
    for (const pubkey of pubkeys) {
      let e = this.getByPubkey(pubkey)
      if (!e) {
        continue
      }
      events.push(e)
    }
    return events
  }
}
