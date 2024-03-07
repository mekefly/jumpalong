import { Event } from 'nostr-tools'
import { EventMap } from './EventMap'
import { key } from './types'
import { getOnlyTag, getTagE } from '../event/tag'
import { AddressPointer } from 'nostr-tools/nip19'

export class ParameterizedReplaceableEventMap extends EventMap {
  static isParameterizedReplaceableEvent(kind: number) {
    return kind >= 30000 && kind < 40000
  }
  constructor(kind: number | string) {
    super(`PRE:${kind}`)
  }
  add(event: Event) {
    let kind = event.kind
    let pubkey = event.pubkey
    let d = getOnlyTag('d', event.tags)?.[1] ?? ''
    let aKey = `${kind}:${pubkey}:${d}`

    let oldEvent = this.getByA(aKey)
    if (!oldEvent || event.created_at > oldEvent.created_at) {
      this.set(aKey, event)
    }
  }
  getByA(key: string | AddressPointer) {
    return this.get(
      typeof key === 'string'
        ? key
        : `${key.kind}:${key.pubkey}:${key.identifier}`
    )
  }
  filter(f: FilterPredicateType): Event[] {
    return Object.entries(this.allMap())
      .filter(([key]) => {
        let [kind, pubkey, identifier] = key.split(':')
        return f(parseInt(kind), pubkey, identifier)
      })
      .map(([_, v]) => v)
  }
  query(
    kinds?: Iterable<number>,
    pubkeys?: Iterable<string>,
    identifier?: Iterable<string>
  ) {
    //构建查询条件
    const predicates: FilterPredicateType[] = []
    for (const [set, index] of [
      [new Set(kinds), 0], //与下面条件函数的第0个参数做比较
      [new Set(pubkeys), 1], //与下面条件函数的第2个参数做比较
      [new Set(identifier), 2],
    ] as const) {
      if (!set) continue
      predicates.push((...rest) => {
        return (set as any).has((rest as any)[index])
      })
    }
    //没有查询条件，意思是获取全部
    if (predicates.length === 0) {
      return this.values()
    }
    //有查询条件的情况下，条件全部满足
    return this.filter((k, p, i) => {
      return predicates.every(predicate => predicate(k, p, i))
    })
  }
  // public deleteEventByNaddr(naddr: key) {
  //   this.delete(naddr)
  // }
  // public getByNaddr(naddr: string): Event | undefined {
  //   return this.get(naddr)
  // }
}

type FilterPredicateType = (k: number, p: string, i: string) => boolean
