import { nowSecondTimestamp } from '@jumpalong/shared'
import { Event, Filter } from 'nostr-tools'
import ReactiveClass from '../../reactive/ReactiveClass'
import { Synchronizer, SynchronizerAbstractApi } from './Synchronizer'
import { SynchronizerAbstractOption } from './types'

/**
 * 可替换同步器api
 */
export type ReplaceableSynchronizerAbstractApi<E> = {
  createDefault(): E
} & Pick<
  SynchronizerAbstractApi<E>,
  'name' | 'deserializeToEvent' | 'serializeToData' | 'getFilters'
>
/**
 *可替换事件同步器
 */
export class ReplaceableSynchronizer<E> extends ReactiveClass {
  synchronizer: Synchronizer<E>
  data: E
  changeAt: null | number = null
  private api: ReplaceableSynchronizerAbstractApi<E>

  constructor(
    line: any,
    api: ReplaceableSynchronizerAbstractApi<E>,
    options?: SynchronizerAbstractOption
  ) {
    super(line)
    this.api = api

    let self = this
    this.data = this.createDefault()
    this.synchronizer = new Synchronizer(
      line,
      {
        ...api,
        async eventToFilter(event: Event): Promise<Filter[]> {
          return []
        },
        async createKey(filter: Filter[]): Promise<string> {
          return ''
        },
        async setData(key: string, value: E): Promise<void> {
          self.data = value
        },
        async getData(key: string): Promise<E | null> {
          return self.data
        },
        async getDataKeys(): Promise<Iterable<string>> {
          return ['']
        },
        async toChanged(key: string): Promise<void> {
          self.changeAt = nowSecondTimestamp()
        },
        async getChangeAt(key: string): Promise<number | null> {
          return self.changeAt
        },
        async changesSaved(key: string): Promise<void> {
          self.changeAt = null
        },
      },
      options
    )
  }
  getLine() {
    return this.synchronizer.getLine()
  }
  getData() {
    return this.data
  }
  save() {
    return this.synchronizer.save()
  }
  createDefault(): E {
    return this.api.createDefault()
  }
  getFilters(): Promise<Filter[]> {
    return this.api.getFilters()
  }
  serializeToData(e: Event): Promise<E> {
    return this.api.serializeToData(e)
  }
  deserializeToEvent(data: E, changeAt: number): Promise<Event> {
    return this.api.deserializeToEvent(data, changeAt)
  }
  getDataSync(): E {
    return this.data
  }
  hasChange() {
    return !!this.changeAt
  }
  toChanged() {
    this.synchronizer.toChanged('')
  }
  getLocalEvent() {
    return this.synchronizer.getEvent('')
  }
  getUpdateAt(): number | null {
    return this.synchronizer.getUpdateAt('')
  }
  clear() {
    this.data = this.api.createDefault()
    this.synchronizer.clear()
  }
}
