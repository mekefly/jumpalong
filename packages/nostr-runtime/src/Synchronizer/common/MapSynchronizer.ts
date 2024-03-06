import { Filter, Event } from 'nostr-tools'
import ReplaceableSynchronizerAbstract from '../abstract/ReplaceableSynchronizerAbstract'
import { SynchronizerAbstractOption } from '../abstract'
import { ParameterizedReplaceableSynchronizerAbstract } from '../abstract/ParameterizedReplaceableSynchronizerAbstract'
import { AddressPointer } from 'nostr-tools/nip19'
import { ParameterizedReplaceableMapSynchronizerAbstract } from '../abstract/ParameterizedReplaceableMapSynchronizerAbstract'
import MapSynchronizerAbstract from '../abstract/MapSynchronizerAbstract'
import { Synchronizer, SynchronizerAbstractApi } from './Synchronizer'
import { nowSecondTimestamp } from '@jumpalong/shared'

export type MapSynchronizerApi<E> = Pick<
  SynchronizerAbstractApi<E>,
  | 'name'
  | 'getFilters'
  | 'serializeToData'
  | 'deserializeToEvent'
  | 'eventToFilter'
  | 'createKey'
>
export class MapSynchronizer<E> {
  synchronizer: Synchronizer<E>
  constructor(
    line: any,
    private api: MapSynchronizerApi<E>,
    options?: SynchronizerAbstractOption
  ) {
    let self = this
    this.synchronizer = new Synchronizer(
      line,
      {
        ...api,
        async setData(key: string, value: E): Promise<void> {
          self.map.set(key, { data: value, changeAt: null })
        },
        async getData(key: string): Promise<E | null> {
          return self.map.get(key)?.data ?? null
        },
        async getDataKeys(): Promise<Iterable<string>> {
          return self.map.keys()
        },
        async toChanged(key: string): Promise<void> {
          const data = self.map.get(key)
          if (!data) return
          data.changeAt = nowSecondTimestamp()
        },
        async getChangeAt(key: string): Promise<number | null> {
          const data = self.map.get(key)
          if (!data) return null
          return data.changeAt
        },
        async changesSaved(key: string): Promise<void> {
          const data = self.map.get(key)
          if (!data) return
          data.changeAt = null
        },
      },
      options
    )
  }

  map = new Map<string, { data: E; changeAt: number | null }>()
  /**
   * 添加data,并通知改变
   * @param key
   * @param value
   */
  async addData(key: string, value: E) {
    this.map.set(key, { data: value, changeAt: null })
    this.synchronizer.toChanged(key)
  }
  async getDataKeys() {}
}
