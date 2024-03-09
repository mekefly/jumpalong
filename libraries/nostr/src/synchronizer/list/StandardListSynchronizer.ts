import type { Filter } from 'nostr-tools'
import { ReplaceableSynchronizer } from '../common/ReplaceableSynchronizer'
import { GetTagHandelArrayType, TagHandel, tagIsEq } from './TagHandel'
import { Tag } from './types'

export class StandardListSynchronizer<HANDEL extends TagHandel<any, any>[]> {
  private synchronizer: ReplaceableSynchronizer<GetTagHandelArrayType<HANDEL>[]>
  static isStandardListKind(kind: number) {
    return kind >= 10000 && kind < 20000
  }
  tagHandelMap: Record<string, TagHandel> = {}
  constructor(line: any, kind: number, tagHandel: Readonly<HANDEL>) {
    if (!StandardListSynchronizer.isStandardListKind(kind)) {
      throw new Error('StandardListSynchronizer: Not is a StandardListKind')
    }

    for (const handel of tagHandel as any) {
      this.tagHandelMap[handel.type] = handel
    }
    let self = this
    this.synchronizer = new ReplaceableSynchronizer<
      GetTagHandelArrayType<HANDEL>[]
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
          const tags: string[][] = []
          for (const tag of list) {
            let handel = self.tagHandelMap[(tag as Tag).type]
            if (!handel) continue
            tags.push(handel.deserialize(tag))
          }
          const event = await self.synchronizer.getLine().createEvent({
            kind,
            tags,
            created_at,
          })
          return event
        },
        async serializeToData(e) {
          let data: GetTagHandelArrayType<HANDEL>[] = []
          for (const tag of e.tags) {
            let type = tag[0]
            if (!type) continue
            let handel = self.tagHandelMap[type]
            if (!handel) continue
            data.push(handel.serialize(tag as any) as any)
          }
          return data
        },
      },
      { autoSync: true }
    )
  }
  /**
   * 添加列表内容
   * @param tag
   */
  async add(tag: GetTagHandelArrayType<HANDEL>) {
    const tagList = await this.synchronizer.getData()
    tagList.push(tag)
    let index = tagList.findIndex((item: Tag) =>
      tagIsEq(this.tagHandelMap, item, tag)
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
  async delete(tag: GetTagHandelArrayType<HANDEL>) {
    let list = await this.synchronizer.getData()
    let index = list.findIndex((item: Tag) =>
      tagIsEq(this.tagHandelMap, item, tag)
    )

    if (index === -1) return
    list.splice(index, 1)
    this.synchronizer.toChanged()
    this.synchronizer.save()
  }
  has(tag: GetTagHandelArrayType<HANDEL>) {
    let list = this.synchronizer.getData()
    let index = list.findIndex((item: Tag) =>
      tagIsEq(this.tagHandelMap, item, tag)
    )

    return !(index === -1)
  }
  getList() {
    return this.synchronizer.getDataSync()
  }
}
