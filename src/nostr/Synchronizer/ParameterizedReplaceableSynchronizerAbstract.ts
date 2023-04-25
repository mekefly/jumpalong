import { Event, Filter } from "nostr-tools";
import { AddressPointer } from "nostr-tools/lib/nip19";
import { getOnlyTag } from "../tag";
import MapSynchronizerAbstract from "./MapSynchronizerAbstract";

export abstract class ParameterizedReplaceableSynchronizerAbstract<
  E
> extends MapSynchronizerAbstract<E> {
  async eventToFilter(event: Event): Promise<Filter[]> {
    const idTag = getOnlyTag("d", event.tags);
    return [
      {
        kinds: [event.kind],
        authors: [event.pubkey],
        ["#d"]: [idTag?.[1] ?? ""],
      },
    ];
  }
  async createKey(filters: Filter[]): Promise<string> {
    const filter = filters[0];
    if (!filter) {
      return "";
    }

    const kind = filter.kinds?.[0];
    const pubkey = filter.authors?.[0];
    const identifier = filter["#d"]?.[0];

    return await this.createKeyByAddressPointer({
      kind: kind ?? -1,
      pubkey: pubkey ?? "",
      identifier,
    });
  }
  async addDataByAddressPointer(addressPointer: AddressPointer, data: E) {
    await this.addData(
      await this.createKeyByAddressPointer(addressPointer),
      data
    );
  }
  async createKeyByAddressPointer(
    addressPointer: AddressPointer
  ): Promise<string> {
    return `${addressPointer.kind}:${addressPointer.pubkey}:${addressPointer.identifier}`;
  }
}
