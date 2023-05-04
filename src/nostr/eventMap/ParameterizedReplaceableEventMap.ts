import { Event } from "nostr-tools";
import { EventMap } from "./EventMap";
import { key } from "./LocalMap";

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
