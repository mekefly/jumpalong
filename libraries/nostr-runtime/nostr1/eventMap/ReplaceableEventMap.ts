import { Event } from "nostr-tools";
import { EventMap } from "./EventMap";
import { key } from "./LocalMap";

export class ReplaceableEventMap extends EventMap {
  public add(event: Event) {
    this.set(event.pubkey, event);
  }
  public deleteEventByPubkey(pubkey: key) {
    this.delete(pubkey);
  }
  public getByPubkey(pubkey: string): Event | undefined {
    return this.get(pubkey);
  }
}
