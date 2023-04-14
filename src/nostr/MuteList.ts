import { useCache } from "@/utils/cache";
import { getPubkeyOrNull } from "@/utils/nostrApiUse";
import { Event, Filter } from "nostr-tools";
import { createEvent } from "./event";
import { PublishOpt } from "./eventBeltline";
import { ReplaceableEventSyncAbstract } from "./ReplaceableEventSyncAbstract";

export type MuteList = {
  publicList: Set<string>;
};
class MuteListEventSync extends ReplaceableEventSyncAbstract<MuteList> {
  constructor() {
    super("MuteListEventSync", { publicList: new Set() });
  }
  public async getFilters(): Promise<Filter[]> {
    const pubkey = await getPubkeyOrNull();
    if (!pubkey) return [];
    return [{ authors: [pubkey], kinds: [10000] }];
  }
  public async serializeToData(e: Event): Promise<MuteList> {
    const publicList = new Set(
      e.tags.filter((tag) => tag[0] === "p" && tag[1]).map((tag) => tag[1])
    );

    return { publicList };
  }
  public async deserializeToEvent(
    data: MuteList,
    changeAt: number
  ): Promise<Event> {
    const tags: string[][] = [...Array.from(data.publicList, (v) => ["p", v])];

    const event = await createEvent({
      kind: 10000,
      tags,
      created_at: changeAt,
    });
    return event;
  }
  public async addPubkey(pubkey: string, opt?: PublishOpt) {
    const data = this.getData();
    if (data.publicList.has(pubkey)) return;
    data.publicList.add(pubkey);

    this.toChanged();
    this.save(opt);
  }
  public deletePubkey(pubkey: string, opt?: PublishOpt) {
    const data = this.getData();
    if (!data.publicList.has(pubkey)) return;
    data.publicList.delete(pubkey);

    this.toChanged();
    this.save(opt);
  }
}
export function getMuteListEventSync() {
  return useCache(
    "getMuteListEventSync",
    () => {
      const muteListEventSync = new MuteListEventSync();

      setTimeout(() => {
        muteListEventSync.sync();
      });

      return muteListEventSync;
    },
    {
      useLocalStorage: false,
    }
  );
}
