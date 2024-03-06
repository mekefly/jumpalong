import { injectable } from 'inversify'
import { Filter } from 'nostr-tools'
import ReplaceableSynchronizerAbstract from './ReplaceableSynchronizerAbstract'
import type { AddressPointer } from 'nostr-tools/nip19'
import { SynchronizerAbstractOption } from './SynchronizerAbstract'

@injectable()
export abstract class ParameterizedReplaceableSynchronizerAbstract<
  E
> extends ReplaceableSynchronizerAbstract<E> {
  constructor(line: any, name: string, options?: SynchronizerAbstractOption) {
    super(line, name, options)
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
