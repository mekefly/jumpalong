import { useCache } from "@/utils/cache";
import { getPubkeyOrNull } from "@/utils/nostrApiUse";
import { Event, Filter } from "nostr-tools";
import { createEvent } from "./event";
import { PublishOpt } from "./eventBeltline";
import { ReplaceableEventSyncAbstract } from "./ReplaceableEventSyncAbstract";
import { getOnlyTag } from "./tag";

type PinList = { tagMap: Map<string, string[]> };
export class PinListSync extends ReplaceableEventSyncAbstract<PinList> {
  constructor() {
    super("PinListSync", { tagMap: new Map() });
  }
  async getFilters(): Promise<Filter[]> {
    const pubkey = await getPubkeyOrNull();
    if (!pubkey) return [];
    return [
      {
        authors: [pubkey],
        kinds: [10001],
      },
    ];
  }
  async serializeToData(e: Event): Promise<PinList> {
    const tagMap = new Map();
    for (const tag of e.tags) {
      tagMap.set(JSON.stringify(tag), tag);
    }

    return {
      tagMap,
    };
  }
  async deserializeToEvent(data: PinList, changeAt: number): Promise<Event> {
    return await createEvent({
      tags: [...data.tagMap.values()],
      created_at: changeAt,
      kind: 10001,
    });
  }
  private createPinTag(event: Event) {
    const kind = event.kind;
    if (kind === 0) {
      return ["p", event.pubkey];
    } else if (kind === 1) {
      return ["e", event.id];
    } else if (kind >= 30000 && kind <= 39999) {
      const tag = getOnlyTag("a", event.tags);
      if (tag) {
        return tag;
      }
      const dt = getOnlyTag("d", event.tags);
      if (dt && dt[1]) {
        return ["a", `${event.kind}:${event.pubkey}:${dt[1]}`];
      }
      return null;
    } else {
      return ["e", event.id];
    }
  }
  public has(tag: string[]) {
    return this.getData().tagMap.has(JSON.stringify(tag));
  }
  public hasByEvent(event: Event) {
    const tag = this.createPinTag(event);
    if (!tag) {
      return false;
    }
    return this.getData().tagMap.has(JSON.stringify(tag));
  }
  private addPin(tag: string[]) {
    const data = this.getData();
    data.tagMap.set(JSON.stringify(tag), tag);
  }
  private removePin(tag: string[]) {
    const data = this.getData();
    data.tagMap.delete(JSON.stringify(tag));
  }
  public async pin(event: Event, opt?: PublishOpt) {
    const tag = this.createPinTag(event);

    if (!tag) return;
    if (this.has(tag)) return;

    this.addPin(tag);
    this.toChanged();
    await this.save(opt);
  }
  public async unpin(event: Event, opt?: PublishOpt) {
    const tag = this.createPinTag(event);
    if (!tag) return;
    if (!this.has(tag)) return;

    this.removePin(tag);
    this.toChanged();
    await this.save(opt);
  }
}
export function getPinListSync() {
  return useCache(
    "getPinListSync",
    () => {
      const pinListSync = new PinListSync();
      setTimeout(() => {
        pinListSync.sync();
      }, 0);
      return pinListSync;
    },
    { useLocalStorage: false }
  );
}
