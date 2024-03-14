import { TagArrayList } from '../types/tag'
import { Tag, TagHandle } from './TagHandle'

export type TagHandleMap = Record<string, TagHandle<any, any>>

export class TagsHandle<HANDLE extends TagHandle<any, any>[]> {
  handleMap: TagHandleMap = {}
  constructor(tagHandle: Readonly<HANDLE>) {
    for (const handle of tagHandle as any) {
      this.add(handle)
    }
  }
  add<H extends TagHandle<any, any>>(handle: H): TagsHandle<[H, ...HANDLE]> {
    this.handleMap[handle.type] = handle
    return this as any
  }
  tagIsEq(tag: Tag, tag1: Tag) {
    if (tag.type !== tag1.type) {
      return false
    }
    const type = tag.type
    let handel = this.getHandle(type)
    if (!handel) {
      return JSON.stringify(tag) === JSON.stringify(tag1)
    } else {
      return handel.isEq(tag, tag1)
    }
  }
  getHandle(type: string) {
    return this.handleMap[type]
  }
  handleOne(tag: string[]): GetTagHandelArrayType<HANDLE> | undefined {
    let type = tag[0]
    if (!type) return
    let handel = this.getHandle(type)
    if (!handel) return
    return handel.handle(tag as any)
  }
  handle(tags: string[][]): GetTagHandelArrayType<HANDLE>[] {
    let data: GetTagHandelArrayType<HANDLE>[] = []
    for (const tag of tags) {
      let d = this.handleOne(tag)
      if (!d) continue
      data.push(d)
    }
    return data
  }
  toTagArray(tag: GetTagHandelArrayType<HANDLE>) {
    let handel = this.getHandle((tag as any).type)
    if (!handel) return
    return handel.toTagArray(tag)
  }
  toTagArrayList(list: GetTagHandelArrayType<HANDLE>[]): TagArrayList {
    const tagArrays: string[][] = []
    for (const tag of list) {
      let tagArray = this.toTagArray(tag)
      if (!tagArray) continue
      tagArrays.push(tagArray)
    }
    return tagArrays
  }
}

export type GetTagHandelArrayType<TAG_PARSERS extends TagHandle<any, any>[]> =
  TAG_PARSERS[number] extends infer T
    ? T extends TagHandle<infer K, infer Value>
      ? Tag<K, Value>
      : never
    : never
