import { ReplaceableEventSyncAbstract } from "@/api/ReplaceableEventSyncAbstract";
import { Filter } from "nostr-tools";
import { AddressPointer } from "nostr-tools/lib/nip19";

export abstract class ParameterizedReplaceableEventSyncAbstract<
  E
> extends ReplaceableEventSyncAbstract<E> {
  constructor(name: string, defaul: E) {
    super(name, defaul);
  }
  abstract getAddressPointers(): AddressPointer[];
  getFilters(): Filter[] {
    return this.getAddressPointers().map((addressPointer) => ({
      kinds: [addressPointer.kind],
      authors: [addressPointer.pubkey],
      ["#d"]: [addressPointer.identifier],
    }));
  }
}
