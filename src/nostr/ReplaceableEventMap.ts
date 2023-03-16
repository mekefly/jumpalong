import {
  defaultCacheOptions,
  deleteCache,
  getCache,
  setCache,
} from "@/utils/cache";
import { Event } from "nostr-tools";

type PubkeyId = string;
type EventId = string;

export class ReplaceableEventMap {
  private map: Record<PubkeyId, EventId> = {};
  public readonly KEY: string;
  constructor(KEY: string) {
    this.KEY = KEY;
    const str = localStorage.getItem(KEY);
    if (!str) return;

    const cache = JSON.parse(str);
    if (typeof cache === "object") {
      this.map = cache;
    }
  }
  private cacheOption = {
    duration: 1000 * 60 * 60 * 24 * 3, //3天
    ...defaultCacheOptions,
  };
  public getAll() {
    const eventMap: Record<string, Event> = {};
    const map = this.map;
    for (const pubkey in map) {
      const event = this.getEvent(pubkey);
      if (!event) continue;
      eventMap[pubkey] = event;
    }
    return eventMap;
  }
  public add(event: Event) {
    const pubkey = event.pubkey;
    const eventId = event.id;

    this.map[pubkey] = eventId;

    setCache(eventId, event, this.cacheOption);
    this.updateMap();
  }
  public deleteEventByPubkey(pubkey: PubkeyId) {
    delete this.map[pubkey];
    deleteCache(pubkey);
    this.updateMap();
  }
  public getEvent(pubkey: string): Event | undefined {
    return this._getEvent(pubkey);
  }
  private _getEvent(pubkey: string) {
    const eventId = this.map[pubkey];

    if (!eventId) return;
    try {
      const e = getCache(eventId, this.cacheOption);
      return e;
    } catch (error) {
      //缓存过期后删除
      this.deleteEventByPubkey(pubkey);
      return;
    }
  }
  private updateMap() {
    localStorage.setItem(this.KEY, JSON.stringify(this.map));
  }
}
export default {
  kind10002: new ReplaceableEventMap("ReplaceableEventMap:kind10002"),
  kind0: new ReplaceableEventMap("ReplaceableEventMap:kind0"),
};
