import {
  GetTagHandelArrayType,
  Tag,
  TagHandle,
  TagsHandle,
  getOnlyTag,
} from '@jumpalong/nostr-shared'
import { AddressPointer } from 'nostr-tools/nip19'
import { ParameterizedReplaceableMapSynchronizer } from '../common/ParameterizedReplaceableMapSynchronizer'
type DataType = { tags: Tag<string, any>[] } & AddressPointer

export class SetsSynchronizer<HANDEL extends TagHandle<any, any>[]> {
  tagsHandle: TagsHandle<HANDEL>
  static isSetsKind(kind: number) {
    return kind >= 30000 && kind < 40000
  }

  parameterizedReplaceableMapSynchronizer: ParameterizedReplaceableMapSynchronizer<DataType>
  constructor(line: any, private kind: number, handleArray: Readonly<HANDEL>) {
    if (!SetsSynchronizer.isSetsKind(kind)) {
      throw new Error('SetsSynchronizer: Not is a SetsKind')
    }

    this.tagsHandle = new TagsHandle(handleArray)
    let self = this
    this.parameterizedReplaceableMapSynchronizer =
      new ParameterizedReplaceableMapSynchronizer<DataType>(line, {
        name: `SetsSynchronizer:${kind}`,
        async getFilters() {
          return [{ kinds: [kind] }]
        },
        async serializeToData(e) {
          let pubkey =
            await self.parameterizedReplaceableMapSynchronizer.synchronizer
              .getLine()
              .getPubkeyOrNull()

          return {
            tags: self.tagsHandle.handle(e.tags),
            identifier: getOnlyTag('d', e.tags)?.[1] ?? '',
            kind: e.kind,
            pubkey: pubkey?.toHex() ?? '',
          }
        },
        async deserializeToEvent(data, created_at) {
          const { tags, identifier, kind } = data

          const tagArrayList: string[][] = self.tagsHandle.toTagArrayList(tags)
          tagArrayList.push(['d', identifier])

          const event =
            await self.parameterizedReplaceableMapSynchronizer.synchronizer
              .getLine()
              .createEvent({
                kind,
                tags: tagArrayList,
                created_at,
              })
          return event
        },
      })
  }
  async createKey(identifier: string) {
    let pubkey = await this.parameterizedReplaceableMapSynchronizer.synchronizer
      .getLine()
      .getPubkeyOrNull()

    return await this.parameterizedReplaceableMapSynchronizer.createKeyByAddressPointer(
      {
        kind: this.kind,
        pubkey: pubkey?.toHex() ?? '',
        identifier: identifier,
      }
    )
  }
  async add(identifier: string, tag: GetTagHandelArrayType<HANDEL>) {
    const {
      parameterizedReplaceableMapSynchronizer: { synchronizer },
    } = this

    let key = await this.createKey(identifier)
    let data = await synchronizer.getData(key)
    if (!data) return
    let index = data.tags.findIndex(item => this.tagsHandle.tagIsEq(item, tag))
    //如果找到了就认为没有改变，直接忽略修改
    if (index !== -1) return
    data.tags.push(tag)

    synchronizer.toChanged(key)
    synchronizer.save()
  }
  async delete(identifier: string, tag: GetTagHandelArrayType<HANDEL>) {
    let key = await this.createKey(identifier)
    const {
      parameterizedReplaceableMapSynchronizer: { synchronizer },
    } = this
    let data = await synchronizer.getData(key)
    if (!data) return
    let index = data.tags.findIndex(item => this.tagsHandle.tagIsEq(item, tag))
    if (index === -1) return
    data.tags.splice(index, 1)

    synchronizer.toChanged(key)
    synchronizer.save()
  }
}
