import { AddressPointer } from 'nostr-tools/nip19'
import { ParameterizedReplaceableMapSynchronizer } from '../common/ParameterizedReplaceableMapSynchronizer'
import { TagHandel, tagIsEq } from './TagHandel'
import { Tag, TagsType } from './types'
import { getOnlyTag } from '@jumpalong/nostr-shared'
type DataType = { tags: Tag<string, any>[] } & AddressPointer
export class SetsSynchronizer<HANDEL extends TagHandel<any, any>[]> {
  static isSetsKind(kind: number) {
    return kind >= 30000 && kind < 40000
  }

  parameterizedReplaceableMapSynchronizer: ParameterizedReplaceableMapSynchronizer<DataType>
  tagHandelMap: Record<string, TagHandel> = {}
  constructor(line: any, private kind: number, tagHandel: Readonly<HANDEL>) {
    if (!SetsSynchronizer.isSetsKind(kind)) {
      throw new Error('SetsSynchronizer: Not is a SetsKind')
    }
    for (const handel of tagHandel as any) {
      this.tagHandelMap[handel.type] = handel
    }
    let self = this
    this.parameterizedReplaceableMapSynchronizer =
      new ParameterizedReplaceableMapSynchronizer<DataType>(line, {
        name: `SetsSynchronizer:${kind}`,
        async getFilters() {
          return [{ kinds: [kind] }]
        },
        async serializeToData(e) {
          let list: Tag<string, any>[] = []
          for (const tag of e.tags) {
            let type = tag[0]
            if (!type) continue
            let handel = self.tagHandelMap[type]
            if (!handel) continue
            list.push(handel.serialize(tag as any) as any)
          }
          let pubkey =
            await self.parameterizedReplaceableMapSynchronizer.synchronizer
              .getLine()
              .getPubkeyOrNull()

          return {
            tags: list,
            identifier: getOnlyTag('d', e.tags)?.[1] ?? '',
            kind: e.kind,
            pubkey: pubkey?.toHex() ?? '',
          }
        },
        async deserializeToEvent(data, created_at) {
          const { tags, identifier, kind } = data

          const tagHandelMap = self.tagHandelMap
          const stringArrayTags: string[][] = deserializeTags(
            tags,
            tagHandelMap,
            identifier
          )

          const event =
            await self.parameterizedReplaceableMapSynchronizer.synchronizer
              .getLine()
              .createEvent({
                kind,
                tags: stringArrayTags,
                created_at,
              })
          return event
        },
      })
  }
  async createKey(identifier: string) {
    let xx = await this.parameterizedReplaceableMapSynchronizer.synchronizer
      .getLine()
      .getPubkeyOrNull()

    return await this.parameterizedReplaceableMapSynchronizer.createKeyByAddressPointer(
      {
        kind: this.kind,
        pubkey: xx?.toHex() ?? '',
        identifier: identifier,
      }
    )
  }
  async add(identifier: string, tag: TagsType) {
    const {
      parameterizedReplaceableMapSynchronizer: { synchronizer },
    } = this

    let key = await this.createKey(identifier)
    let data = await synchronizer.getData(key)
    if (!data) return
    let index = data.tags.findIndex(item =>
      tagIsEq(this.tagHandelMap, item, tag)
    )
    //如果找到了就认为没有改变，直接忽略修改
    if (index !== -1) return
    data.tags.push(tag)

    synchronizer.toChanged(key)
    synchronizer.save()
  }
  async delete(identifier: string, tag: TagsType) {
    let key = await this.createKey(identifier)
    const {
      parameterizedReplaceableMapSynchronizer: { synchronizer },
    } = this
    let data = await synchronizer.getData(key)
    if (!data) return
    let index = data.tags.findIndex(item =>
      tagIsEq(this.tagHandelMap, item, tag)
    )
    if (index === -1) return
    data.tags.splice(index, 1)

    synchronizer.toChanged(key)
    synchronizer.save()
  }
}
function deserializeTags(
  tags: any[],
  tagHandelMap: Record<string, TagHandel>,
  identifier: string
) {
  const stringArrayTags: string[][] = []
  for (const tag of tags) {
    let handel = tagHandelMap[(tag as Tag).type]
    if (!handel) continue
    stringArrayTags.push(handel.deserialize(tag))
  }
  stringArrayTags.push(['d', identifier])
  return stringArrayTags
}
