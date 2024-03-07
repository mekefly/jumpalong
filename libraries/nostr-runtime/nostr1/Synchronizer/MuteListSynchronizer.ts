import { getPubkeyOrNull } from "@/utils/nostrApi";
import { injectable } from "inversify";
import { Event, Filter } from "nostr-tools";
import { createEvent } from "../event";
import { PublishOpt } from "../eventBeltline";
import ReplaceableSynchronizerAbstract from "./abstract/ReplaceableSynchronizerAbstract";

export type MuteList = {
  publicList: Set<string>;
};

@injectable()
export class MuteListSynchronizer extends ReplaceableSynchronizerAbstract<MuteList> {
  kind: any = 10000;

  constructor() {
    super("MuteListEventSync");
  }
  createDefault(): MuteList {
    return { publicList: new Set() };
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
      kind: this.kind,
      tags,
      created_at: changeAt,
    });
    return event;
  }
  getMuteList() {
    return this.getDataSync();
  }
  public async addPubkey(pubkey: string, opt?: PublishOpt) {
    const data = this.getMuteList();
    if (data.publicList.has(pubkey)) return;
    data.publicList.add(pubkey);

    this.toChanged();
    this.save(opt);
  }
  public deletePubkey(pubkey: string, opt?: PublishOpt) {
    const data = this.getMuteList();
    if (!data.publicList.has(pubkey)) return;
    data.publicList.delete(pubkey);

    this.toChanged();
    this.save(opt);
  }
}
