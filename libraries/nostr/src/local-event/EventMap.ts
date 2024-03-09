import {
  defaultCacheOptions,
  deleteCache,
  getCache,
  setCache,
  CacheOptions,
} from '@jumpalong/shared'
import { Event } from 'nostr-tools'

type key = string
type EventId = string
export class EventMap {
  private map: Record<key, EventId> = {}
  public readonly KEY: string
  private cacheOption: CacheOptions

  constructor(KEY: string, opt?: { cacheOptions: CacheOptions }) {
    this.cacheOption = {
      duration: 1000 * 60 * 60 * 24, //1天
      ...defaultCacheOptions,
      ...opt?.cacheOptions,
    }
    this.KEY = KEY
    const str = localStorage.getItem(KEY)
    if (!str) return

    try {
      const cache = JSON.parse(str)
      if (typeof cache === 'object') {
        this.map = cache
      }
    } catch (error) {
      localStorage.removeItem(KEY)
    }
  }
  public allMap() {
    const eventMap: Record<string, Event> = {}
    const map = this.map
    for (const pubkey in map) {
      const event = this.get(pubkey)
      if (!event) continue
      eventMap[pubkey] = event
    }
    return eventMap
  }
  public values() {
    const events: Event[] = []
    const map = this.map
    for (const pubkey in map) {
      const event = this.get(pubkey)
      if (!event) continue
      events.push(event)
    }
    return events
  }
  public set(key: string, event: Event) {
    const eventId = event.id

    this.map[key] = eventId

    setCache(eventId, event, this.cacheOption)
    this.updateMap()
  }
  public delete(key: key) {
    delete this.map[key]
    deleteCache(key)
    this.updateMap()
  }
  public get(key: string): Event | undefined {
    return this._getEvent(key)
  }
  private _getEvent(key: string) {
    const eventId = this.map[key]

    if (!eventId) return
    try {
      const e = getCache(eventId, this.cacheOption)
      return e
    } catch (error) {
      //缓存过期后删除
      this.delete(key)
      return
    }
  }
  private updateMap() {
    localStorage.setItem(this.KEY, JSON.stringify(this.map))
  }
}
