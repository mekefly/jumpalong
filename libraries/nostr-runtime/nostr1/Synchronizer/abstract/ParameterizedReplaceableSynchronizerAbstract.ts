import { injectable } from "inversify";
import { Filter } from "nostr-tools";
import { AddressPointer } from "nostr-tools/lib/nip19";
import ReplaceableSynchronizerAbstract from "./ReplaceableSynchronizerAbstract";

@injectable()
export abstract class ParameterizedReplaceableSynchronizerAbstract<
  E
> extends ReplaceableSynchronizerAbstract<E> {
  constructor(name: string) {
    super(name);
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
