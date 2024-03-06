import { Filter, Event } from 'nostr-tools'
import ReplaceableSynchronizerAbstract from '../abstract/ReplaceableSynchronizerAbstract'
import { SynchronizerAbstractOption } from '../abstract'
import { ParameterizedReplaceableSynchronizerAbstract } from '../abstract/ParameterizedReplaceableSynchronizerAbstract'
import { AddressPointer } from 'nostr-tools/nip19'
import {
  ReplaceableSynchronizer,
  ReplaceableSynchronizerAbstractApi,
} from './ReplaceableSynchronizer'

export type ParameterizedReplaceableSynchronizerApi<E> = Omit<
  ReplaceableSynchronizerAbstractApi<E>,
  'getFilters'
> & {
  getAddressPointers(): Promise<AddressPointer[]>
}
/**
 *参数化可替换同步器，作用是输入一个AddressPointers，输入的这个pointers就是替换同步器本体了，就会在这个point上做同步
 */
export class ParameterizedReplaceableSynchronizer<
  E
> extends ReplaceableSynchronizer<E> {
  constructor(
    line: any,
    api: ParameterizedReplaceableSynchronizerApi<E>,
    options: SynchronizerAbstractOption
  ) {
    super(
      line,
      {
        ...api,
        async getFilters(): Promise<Filter[]> {
          return (await api.getAddressPointers()).map(addressPointer => ({
            kinds: [addressPointer.kind],
            authors: [addressPointer.pubkey],
            ['#d']: [addressPointer.identifier],
          }))
        },
      },
      options
    )
  }
}
