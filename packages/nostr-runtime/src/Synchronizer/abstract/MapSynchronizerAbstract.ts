import { nowSecondTimestamp } from '@jumpalong/shared'
import SynchronizerAbstract from './SynchronizerAbstract'

export default abstract class MapSynchronizerAbstract<
  E
> extends SynchronizerAbstract<E> {
  map = new Map<string, { data: E; changeAt: number | null }>()
  /**
   * 添加data,并通知改变
   * @param key
   * @param value
   */
  async addData(key: string, value: E) {
    this.map.set(key, { data: value, changeAt: null })
    this.toChanged(key)
  }
  /**
   * 设置更改
   * @param key
   * @param value
   */
  async setData(key: string, value: E): Promise<void> {
    this.map.set(key, { data: value, changeAt: null })
  }
  /**
   * 获取data
   * @param key
   * @returns
   */
  async getData(key: string): Promise<E | null> {
    return this.map.get(key)?.data ?? null
  }
  /**
   * 通知发生了改变
   * @param key
   * @returns
   */
  async toChanged(key: string): Promise<void> {
    const data = this.map.get(key)
    if (!data) return
    data.changeAt = nowSecondTimestamp()
  }
  async getChangeAt(key: string): Promise<number | null> {
    const data = this.map.get(key)
    if (!data) return null
    return data.changeAt
  }
  async changesSaved(key: string): Promise<void> {
    const data = this.map.get(key)
    if (!data) return
    data.changeAt = null
  }
  async getDataKeys() {
    return this.map.keys()
  }
}
