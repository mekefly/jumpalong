export type Tag<K extends string = string, V extends {} = {}> = {
  type: K
} & V
/**
 * tag处理器
 */
export interface TagHandle<
  Type extends string = string,
  Value extends {} = {}
> {
  type: Type
  handle: (tagArray: [type: Type, ...string[]]) => Tag<Type, Value>
  toTagArray: (tag: Tag<Type, Value>) => [type: Type, ...string[]]
  isEq(tag: Tag<Type, Value>, tag2: Tag<Type, Value>): boolean
}

export function createTagHandel<Type extends string, Value extends {}>(
  tagParser: Readonly<TagHandle<Type, Value>>
): TagHandle<Type, Value> {
  return tagParser
}
