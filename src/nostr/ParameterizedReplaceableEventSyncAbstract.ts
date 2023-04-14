import { ReplaceableEventSyncAbstract } from "@/nostr/ReplaceableEventSyncAbstract";
import { Filter } from "nostr-tools";
import { AddressPointer } from "nostr-tools/lib/nip19";

export abstract class ParameterizedReplaceableEventSyncAbstract<
  E
> extends ReplaceableEventSyncAbstract<E> {
  constructor(name: string, defaul: E) {
    super(name, defaul);
  }
  abstract getAddressPointers(): Promise<AddressPointer[]>;
  public async getFilters(): Promise<Filter[]> {
    return (await this.getAddressPointers()).map((addressPointer) => ({
      kinds: [addressPointer.kind],
      authors: [addressPointer.pubkey],
      ["#d"]: [addressPointer.identifier],
    }));
  }
}
