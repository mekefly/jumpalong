import { nowSecondTimestamp } from '@/utils/utils'
import { injectable } from 'inversify'
import { Event, Filter } from 'nostr-tools'
import SynchronizerAbstract, {
  type SynchronizerAbstractOption
} from './SynchronizerAbstract'

@injectable()
export default abstract class ReplaceableSynchronizerAbstract<
  E
> extends SynchronizerAbstract<E> {
  data: E
  changeAt: null | number = null

  constructor(line: any, name: string, opt?: SynchronizerAbstractOption) {
    super(line as any, name, opt)
    this.data = this.createDefault()
    if (this.getLocalEvent()) {
      return
    }
  }

  abstract createDefault(): E

  async eventToFilter(event: Event): Promise<Filter[]> {
    return []
  }
  async createKey(filter: Filter[]): Promise<string> {
    return ''
  }
  async setData(key: string, value: E): Promise<void> {
    this.data = value
  }
  async getData(): Promise<E> {
    return this.data
  }

  async getDataKeys(): Promise<Iterable<string>> {
    return ['']
  }
  getDataSync(): E {
    return this.data
  }
  async toChanged(): Promise<void> {
    this.changeAt = nowSecondTimestamp()
  }
  hasChange() {
    return !!this.changeAt
  }
  async getChangeAt(): Promise<number | null> {
    return this.changeAt
  }
  async changesSaved(): Promise<void> {
    this.changeAt = null
  }
  getLocalEvent() {
    return this.getEvent('')
  }
  getUpdateAt(): number | null {
    return super.getUpdateAt('')
  }
  clear() {
    this.data = this.createDefault()
    super.clear()
  }
}
