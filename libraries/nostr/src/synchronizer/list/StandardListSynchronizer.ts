import {
  GetTagHandelArrayType,
  Tag,
  TagHandle,
  TagsHandle,
} from '@jumpalong/nostr-shared'
import type { Filter } from 'nostr-tools'
import { ReplaceableSynchronizer } from '../common/ReplaceableSynchronizer'
import { ListEnum } from './ListSynchronizerManager'

export class StandardListSynchronizer<HANDLE extends TagHandle<any, any>[]> {
  private synchronizer: ReplaceableSynchronizer<GetTagHandelArrayType<HANDLE>[]>
  static isStandardListKind(kind: number) {
    return (kind >= 10000 && kind < 20000) || kind === ListEnum.Follow
  }
  tagsHandle: TagsHandle<HANDLE>
  constructor(line: any, kind: number, handleArray: Readonly<HANDLE>) {
    if (!StandardListSynchronizer.isStandardListKind(kind)) {
      throw new Error('StandardListSynchronizer: Not is a StandardListKind')
    }
    this.tagsHandle = new TagsHandle(handleArray)
    let self = this
    this.synchronizer = new ReplaceableSynchronizer<
      GetTagHandelArrayType<HANDLE>[]
    >(
      line,
      {
        name: `StandardListSynchronizer:${kind}`,
        createDefault() {
          return []
        },
        async getFilters(): Promise<Filter[]> {
          let pubkey = await self.synchronizer.synchronizer
            .getLine()
            .getPubkeyOrNull()
          if (!pubkey) {
            return []
          }
          return [{ kinds: [kind], limit: 1, authors: [pubkey.toHex()] }]
        },
        async deserializeToEvent(list, created_at) {
          const event = await self.synchronizer.getLine().createEvent({
            kind,
            tags: self.tagsHandle.toTagArrayList(list),
            created_at,
          })
          return event
        },
        async serializeToData(e) {
          return self.tagsHandle.handle(e.tags)
        },
      },
      { autoSync: true }
    )
  }
  /**
   * 添加列表内容
   * @param tag
   */
  async add(tag: GetTagHandelArrayType<HANDLE>) {
    const tagList = await this.synchronizer.getData()
    tagList.push(tag)
    let index = tagList.findIndex((item: Tag) =>
      this.tagsHandle.tagIsEq(item, tag)
    )
    if (index !== -1) return
    this.synchronizer.toChanged()
    this.synchronizer.save()
  }
  /**
   * 删除列表内容
   * @param tag
   * @returns
   */
  async delete(tag: GetTagHandelArrayType<HANDLE>) {
    let list = await this.synchronizer.getData()
    let index = list.findIndex((item: Tag) =>
      this.tagsHandle.tagIsEq(item, tag)
    )

    if (index === -1) return
    list.splice(index, 1)
    this.synchronizer.toChanged()
    this.synchronizer.save()
  }
  has(tag: GetTagHandelArrayType<HANDLE>) {
    let list = this.getList()
    let index = list.findIndex((item: Tag) =>
      this.tagsHandle.tagIsEq(item, tag as any)
    )

    return !(index === -1)
  }
  getList() {
    return this.synchronizer.getDataSync()
  }
}
