import { getOnlyTag } from '@jumpalong/nostr-shared'
import { Event, Filter } from 'nostr-tools'
import { AddressPointer } from 'nostr-tools/nip19'
import { MapSynchronizer, MapSynchronizerApi } from './MapSynchronizer'
import { SynchronizerAbstractOption } from '../../types/synchronizer'

/**
 * 参数化可替换同步器map
 */
export type ParameterizedReplaceableMapSynchronizerAbstractApi<E> = Omit<
  MapSynchronizerApi<E>,
  'eventToFilter' | 'createKey'
>

/**
 *参数化可替换同步器，作用是输入一个AddressPointers，输入的这个pointers就是替换同步器本体了，就会在这个point上做同步
 */
export class ParameterizedReplaceableMapSynchronizer<
  E
> extends MapSynchronizer<E> {
  constructor(
    line: any,
    api: ParameterizedReplaceableMapSynchronizerAbstractApi<E>,
    options?: SynchronizerAbstractOption
  ) {
    super(
      line,
      {
        ...api,
        async eventToFilter(event: Event): Promise<Filter[]> {
          const idTag = getOnlyTag('d', event.tags)
          return [
            {
              kinds: [event.kind],
              authors: [event.pubkey],
              ['#d']: [idTag?.[1] ?? ''],
            },
          ]
        },
        async createKey(filters: Filter[]): Promise<string> {
          const filter = filters[0]
          if (!filter) {
            return ''
          }

          const kind = filter.kinds?.[0]
          const pubkey = filter.authors?.[0]
          const identifier = filter['#d']?.[0]

          return await createKeyByAddressPointer({
            kind: kind ?? -1,
            pubkey: pubkey ?? '',
            identifier: identifier ?? '',
          })
        },
      },
      options
    )
  }

  async addDataByAddressPointer(addressPointer: AddressPointer, data: E) {
    await this.addData(
      await this.createKeyByAddressPointer(addressPointer),
      data
    )
  }
  async createKeyByAddressPointer(
    addressPointer: AddressPointer
  ): Promise<string> {
    return createKeyByAddressPointer(addressPointer)
  }
}
async function createKeyByAddressPointer(
  addressPointer: AddressPointer
): Promise<string> {
  return `${addressPointer.kind}:${addressPointer.pubkey}:${addressPointer.identifier}`
}
