import {
  defaultCacheOptions,
  deleteCache,
  getCache,
  setCache,
} from "@/utils/cache";
import { Event } from "nostr-tools";

type key = string;
type EventId = string;
export class EventMap {
  private map: Record<key, EventId> = {};
  public readonly KEY: string;
  private cacheOption = {
    duration: 1000 * 60 * 60 * 24 * 3, //3天
    ...defaultCacheOptions,
  };

  constructor(KEY: string) {
    this.KEY = KEY;
    const str = localStorage.getItem(KEY);
    if (!str) return;

    const cache = JSON.parse(str);
    if (typeof cache === "object") {
      this.map = cache;
    }
  }
  public allMap() {
    const eventMap: Record<string, Event> = {};
    const map = this.map;
    for (const pubkey in map) {
      const event = this.get(pubkey);
      if (!event) continue;
      eventMap[pubkey] = event;
    }
    return eventMap;
  }
  public set(key: string, event: Event) {
    const eventId = event.id;

    this.map[key] = eventId;

    setCache(eventId, event, this.cacheOption);
    this.updateMap();
  }
  public delete(key: key) {
    delete this.map[key];
    deleteCache(key);
    this.updateMap();
  }
  public get(key: string): Event | undefined {
    return this._getEvent(key);
  }
  private _getEvent(key: string) {
    const eventId = this.map[key];

    if (!eventId) return;
    try {
      const e = getCache(eventId, this.cacheOption);
      return e;
    } catch (error) {
      //缓存过期后删除
      this.delete(key);
      return;
    }
  }
  private updateMap() {
    localStorage.setItem(this.KEY, JSON.stringify(this.map));
  }
}
