import { Event } from "nostr-tools";
import { EventMap } from "./EventMap";

type key = string;
type EventId = string;

export class ReplaceableEventMap extends EventMap {
  constructor(KEY: string) {
    super(KEY);
  }
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
export class ParameterizedReplaceableEventMap extends EventMap {
  constructor(KEY: string) {
    super(KEY);
  }
  public deleteEventByNaddr(naddr: key) {
    this.delete(naddr);
  }
  public getByNaddr(naddr: string): Event | undefined {
    return this.get(naddr);
  }
}
export default {
  kind10002: new ReplaceableEventMap("ReplaceableEventMap:kind10002"),
  kind0: new ReplaceableEventMap("ReplaceableEventMap:kind0"),
  channelMetadataEventMap: new EventMap("channelMetadataEventMap"),
};
