import type { AddressPointer } from 'nostr-tools/nip19'

export type TagsType =
  | Tag<'p' | 't' | 'word' | 'e' | 'relay' | 'emoji' | 'r', string>
  | Tag<'a', AddressPointer>

export type Tag<K extends string = string, V extends {} = {}> = {
  type: K
} & V

type Num = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type ReplaceableKind = `1${Num}${Num}${Num}${Num}`
export type ParameterizedReplaceableKind = `3${Num}${Num}${Num}${Num}`

export type TagMap = Tags<
  'p' | 't' | 'word' | 'e' | 'relay' | 'emoji' | 'r',
  string
> &
  Tags<'a', AddressPointer>

// export type Tags<K extends string, V> = {
//   [Key in K]: Tag<K, V>
// }
export type TagImpl<T extends TagMarks> = Pick<TagMap, T>[keyof Pick<TagMap, T>]

export type TagMarks = keyof TagMap
