import { injectable } from 'inversify'
import { Filter } from 'nostr-tools'
import ReplaceableSynchronizerAbstract from './ReplaceableSynchronizerAbstract'
import type { AddressPointer } from 'nostr-tools/nip19'

@injectable()
export abstract class ParameterizedReplaceableSynchronizerAbstract<
  E
> extends ReplaceableSynchronizerAbstract<E> {
  constructor(line: any, name: string) {
    super(line, name)
  }
  abstract getAddressPointers(): Promise<AddressPointer[]>
  public async getFilters(): Promise<Filter[]> {
    return (await this.getAddressPointers()).map(addressPointer => ({
      kinds: [addressPointer.kind],
      authors: [addressPointer.pubkey],
      ['#d']: [addressPointer.identifier],
    }))
  }
}
