import { ParameterizedReplaceableSynchronizerAbstract } from "@/nostr/Synchronizer/abstract/ParameterizedReplaceableSynchronizerAbstract";
import { createEvent } from "@/nostr/event";
import { getPubkeyOrNull } from "@/utils/nostrApiUse";
import { injectable } from "inversify";
import { Event } from "nostr-tools";
import { AddressPointer } from "nostr-tools/lib/nip19";
import {
  CategorizedPeopleListKind,
  NostrConnectedList,
} from "../../api/NostrConnect";

@injectable()
export class NostrConnectedSynchronizer extends ParameterizedReplaceableSynchronizerAbstract<NostrConnectedList> {
  constructor() {
    super("NostrConnectedsynchronizer");
    this.sync();
  }
  createDefault(): NostrConnectedList {
    return new Set();
  }
  async getAddressPointers(): Promise<AddressPointer[]> {
    const pubkey = await getPubkeyOrNull();
    if (!pubkey) return [];
    return [
      {
        kind: CategorizedPeopleListKind,
        identifier: "NostrConnectedsynchronizer",
        pubkey,
      },
    ];
  }
  async serializeToData(e: Event): Promise<NostrConnectedList> {
    return new Set(
      e.tags.filter((tag) => tag[0] === "p" && tag[1]).map((tag) => tag[1])
    );
  }
  async deserializeToEvent(
    data: NostrConnectedList,
    changeAt: number
  ): Promise<Event> {
    return await createEvent({
      kind: CategorizedPeopleListKind,
      created_at: changeAt,
      tags: [...Array.from(data, (p) => ["p", p])],
    });
  }

  hasConnected(pubkey: string) {
    return this.getNostrConnectedList().has(pubkey);
  }
  connect(pubkey: string) {
    const set = this.getNostrConnectedList();
    if (set.has(pubkey)) {
      return;
    }
    set.add(pubkey);
    this.toChanged();
    this.save();
  }
  disConnect(pubkey: string) {
    const set = this.getNostrConnectedList();
    if (!set.has(pubkey)) {
      return;
    }
    set.delete(pubkey);
    this.toChanged();
    this.save();
  }
  getNostrConnectedList() {
    return this.getDataSync();
  }
}
