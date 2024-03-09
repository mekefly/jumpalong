import { Event } from 'nostr-tools'
import { EventMap } from './EventMap'

const kindList = new Set([1])
export class CommonEvent extends EventMap {
  static isCommonEventKind(kind: number) {
    return (kind >= 1000 && kind < 10000) || kindList.has(kind)
  }
  constructor(kind: number) {
    super(`CE:${kind}`)
  }
  add(e: Event) {
    this.set(e.id, e)
  }
  deleteById(id: string) {
    this.delete(id)
  }
  public getById(id: string): Event | undefined {
    return this.get(id)
  }
  public query(ids: Set<string>) {
    let events: Event[] = []
    for (const id of ids) {
      let e = this.getById(id)
      if (!e) {
        continue
      }
      events.push(e)
    }
    return events
  }
}
