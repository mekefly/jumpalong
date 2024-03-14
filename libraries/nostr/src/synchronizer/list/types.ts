// export type TagsType =
//   | Tag<'p' | 't' | 'word' | 'e' | 'relay' | 'emoji' | 'r', string>
//   | Tag<'a', AddressPointer>

export type ReplaceableKind = `1${number}`
export type ParameterizedReplaceableKind = `3${number}`

// export type TagMap = Tags<
//   'p' | 't' | 'word' | 'e' | 'relay' | 'emoji' | 'r',
//   string
// > &
//   Tags<'a', AddressPointer>

// export type Tags<K extends string, V> = {
//   [Key in K]: Tag<K, V>
// }
// export type TagImpl<T extends TagMarks> = Pick<TagMap, T>[keyof Pick<TagMap, T>]

// export type TagMarks = keyof TagMap
