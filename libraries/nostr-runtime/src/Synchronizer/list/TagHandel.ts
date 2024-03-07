import { relative } from 'path'
import { toDeCodeAddress } from '../../utils'
import { Tag } from './types'
import { AddressPointer } from 'nostr-tools/nip19'

/**
 * tag处理器
 */
export type TagHandel<Type extends string = string, Value extends {} = {}> = {
  type: Type
  serialize: (tagArray: [type: Type, ...string[]]) => Tag<Type, Value>
  deserialize: (tag: Tag<Type, Value>) => [type: Type, ...string[]]
  isEq(tag: Tag<Type, Value>, tag2: Tag<Type, Value>): boolean
}

export function createTagHandel<Type extends string, Value extends {}>(
  tagParser: Readonly<TagHandel<Type, Value>>
): TagHandel<Type, Value> {
  return tagParser
}

//https://github.com/nostr-protocol/nips/blob/master/51.md
export const ParserMap = {
  /**
   * emoji
   */
  emoji: createTagHandel({
    type: 'emoji',
    serialize(tagArray) {
      return {
        type: 'emoji',
        shortcode: tagArray[1],
        imageUrl: tagArray[2],
      }
    },
    deserialize(tag) {
      let arr = [tag.type, tag.shortcode, tag.imageUrl]
      return arr as any
    },
    isEq(tag1, tag2) {
      return (['type', 'shortcode', 'imageUrl'] as const).every(
        k => tag1[k] === tag2[k]
      )
    },
  }),
  /**
   * relay
   */
  relay: createTagHandel({
    type: 'relay',
    serialize(tagArray): { type: 'relay'; relay: string } {
      return {
        type: 'relay',
        relay: tagArray[1],
      }
    },
    deserialize(tag) {
      let arr = [tag.type, tag.relay]
      return arr as any
    },
    isEq(tag1, tag2) {
      return tag1.type === tag2.type && tag1.relay === tag2.relay
    },
  }),
  /**
   * coordinates to an event
   */
  a: createTagHandel({
    type: 'a',
    serialize(tagArray): { type: 'a'; relayUrl?: string } & AddressPointer {
      const addr = toDeCodeAddress(tagArray[1])

      return {
        type: 'a',
        relayUrl: tagArray[2],
        identifier: addr?.identifier ?? '',
        pubkey: addr?.pubkey ?? '',
        kind: addr?.kind ?? 0,
      }
    },
    deserialize(tag) {
      let arr = [tag.type, `${tag.kind}:${tag.pubkey}:${tag.identifier}`]
      tag.relayUrl && arr.push(tag.relayUrl)
      return arr as any
    },
    isEq(tag1, tag2) {
      return (['type', 'kind', 'pubkey', 'identifier'] as const).every(
        k => tag1[k] === tag2[k]
      )
    },
  }),
  /**
   * relay url
   */
  r: createTagHandel({
    type: 'r',
    serialize(tagArray): { type: 'r'; urls: string; petname?: string } {
      return {
        type: 'r',
        urls: tagArray[1],
        petname: tagArray[2],
      }
    },
    deserialize(tag) {
      let arr = [tag.type, tag.urls]
      tag.petname && arr.push(tag.petname)
      return arr as any
    },
    isEq(tag1, tag2) {
      return tag1.type === tag2.type && tag1.urls === tag2.urls
    },
  }),
  /**
   * lowercase string
   */
  word: createTagHandel({
    type: 'word',
    serialize(tagArray) {
      return {
        type: 'word',
        value: tagArray[1],
      }
    },
    deserialize(tag) {
      return [tag.type, tag.value]
    },
    isEq(tag1, tag2) {
      return tag1.type === tag2.type && tag1.value === tag2.value
    },
  }),
  /**
   * hashtag
   */
  t: createTagHandel({
    type: 't',
    serialize(tagArray: [type: 't', ...string[]]) {
      return {
        type: 't',
        name: tagArray[1],
      }
    },
    deserialize(tag): [type: 't', ...string[]] {
      return [tag.type, tag.name]
    },
    isEq(tag1, tag2) {
      return tag1.type === tag2.type && tag1.name === tag2.name
    },
  }),
  /**
   * pubkey
   */
  p: createTagHandel({
    type: 'p',
    serialize(tagArray: [type: 'p', ...string[]]): {
      type: 'p'
      pubkey: string
      relay?: string
    } {
      return {
        type: 'p',
        pubkey: tagArray[1],
        relay: tagArray[2],
      }
    },
    deserialize(tag): [type: 'p', ...string[]] {
      let arr = [tag.type, tag.pubkey]
      tag.relay && arr.push(tag.relay)
      return arr as any
    },
    isEq(tag1, tag2) {
      return tag1.type === tag2.type && tag1.pubkey === tag2.pubkey
    },
  }),
  /**
   * event Id
   */
  e: createTagHandel({
    type: 'e',
    serialize(tagArray): { type: 'e'; id: string; relay?: string } {
      return {
        type: 'e',
        id: tagArray[1],
        relay: tagArray[2],
      }
    },
    deserialize(tag) {
      return [tag.type, tag.id, ...(tag.relay ? [tag.relay] : [])]
    },
    isEq(tag1, tag2) {
      return tag1.type === tag2.type && tag1.id === tag2.id
    },
  }),
  i: createTagHandel({
    type: 'i',
    serialize(tagArray) {
      return {
        type: 'i',
        value: tagArray[1],
      }
    },
    deserialize(tag) {
      return [tag.type, tag.value]
    },
    isEq(tag1, tag2) {
      return tag1.type === tag2.type && tag1.value === tag2.value
    },
  }),
  version: createTagHandel({
    type: 'version',
    serialize(tagArray) {
      return {
        type: 'version',
        value: tagArray[1],
      }
    },
    deserialize(tag) {
      return [tag.type, tag.value]
    },
    isEq(tag1, tag2) {
      return tag1.type === tag2.type && tag1.value === tag2.value
    },
  }),
}
export const { p, t, word, e, r, a, relay, emoji, i, version } = ParserMap

type TagHandelMap = Record<string, TagHandel<any, any>>
export function tagIsEq(tagHandelMap: TagHandelMap, tag: Tag, tag1: Tag) {
  if (tag.type !== tag1.type) {
    return false
  }
  let handel = tagHandelMap[tag.type]
  if (!handel) {
    return JSON.stringify(tag) === JSON.stringify(tag1)
  } else {
    return handel.isEq(tag, tag1)
  }
}

export type GetTagHandelArrayType<TAG_PARSERS extends TagHandel<any, any>[]> =
  TAG_PARSERS[number] extends infer T
    ? T extends TagHandel<infer K, infer Value>
      ? Tag<K, Value>
      : never
    : never
