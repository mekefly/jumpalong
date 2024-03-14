import { AddressPointer } from 'nostr-tools/nip19'
import { toDeCodeAddress } from '../nostr'
import { createTagHandel } from './TagHandle'

//https://github.com/nostr-protocol/nips/blob/master/51.md

/**
 * emoji
 */
export const emoji = createTagHandel({
  type: 'emoji',
  handle(tagArray) {
    return {
      type: 'emoji',
      shortcode: tagArray[1],
      imageUrl: tagArray[2],
    }
  },
  toTagArray(tag) {
    let arr = [tag.type, tag.shortcode, tag.imageUrl]
    return arr as any
  },
  isEq(tag1, tag2) {
    return (['type', 'shortcode', 'imageUrl'] as const).every(
      k => tag1[k] === tag2[k]
    )
  },
})
/**
 * relay
 */
export const relay = createTagHandel({
  type: 'relay',
  handle(tagArray): { type: 'relay'; relay: string } {
    return {
      type: 'relay',
      relay: tagArray[1],
    }
  },
  toTagArray(tag) {
    let arr = [tag.type, tag.relay]
    return arr as any
  },
  isEq(tag1, tag2) {
    return tag1.type === tag2.type && tag1.relay === tag2.relay
  },
})
/**
 * coordinates to an event
 */
export const a = createTagHandel({
  type: 'a',
  handle(tagArray): { type: 'a'; relayUrl?: string } & AddressPointer {
    const addr = toDeCodeAddress(tagArray[1])

    return {
      type: 'a',
      relayUrl: tagArray[2],
      identifier: addr?.identifier ?? '',
      pubkey: addr?.pubkey ?? '',
      kind: addr?.kind ?? 0,
    }
  },
  toTagArray(tag) {
    let arr = [tag.type, `${tag.kind}:${tag.pubkey}:${tag.identifier}`]
    tag.relayUrl && arr.push(tag.relayUrl)
    return arr as any
  },
  isEq(tag1, tag2) {
    return (['type', 'kind', 'pubkey', 'identifier'] as const).every(
      k => tag1[k] === tag2[k]
    )
  },
})
/**
 * relay url
 */
export const r = createTagHandel({
  type: 'r',
  handle(tagArray): { type: 'r'; urls: string; petname?: string } {
    return {
      type: 'r',
      urls: tagArray[1],
      petname: tagArray[2],
    }
  },
  toTagArray(tag) {
    let arr = [tag.type, tag.urls]
    tag.petname && arr.push(tag.petname)
    return arr as any
  },
  isEq(tag1, tag2) {
    return tag1.type === tag2.type && tag1.urls === tag2.urls
  },
})
/**
 * lowercase string
 */
export const word = createTagHandel({
  type: 'word',
  handle(tagArray) {
    return {
      type: 'word',
      value: tagArray[1],
    }
  },
  toTagArray(tag) {
    return [tag.type, tag.value]
  },
  isEq(tag1, tag2) {
    return tag1.type === tag2.type && tag1.value === tag2.value
  },
})
/**
 * hashtag
 */
export const t = createTagHandel({
  type: 't',
  handle(tagArray: [type: 't', ...string[]]) {
    return {
      type: 't',
      name: tagArray[1],
    }
  },
  toTagArray(tag): [type: 't', ...string[]] {
    return [tag.type, tag.name]
  },
  isEq(tag1, tag2) {
    return tag1.type === tag2.type && tag1.name === tag2.name
  },
})
/**
 * pubkey
 */
export const p = createTagHandel({
  type: 'p',
  handle(tagArray: [type: 'p', ...string[]]): {
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
  toTagArray(tag): [type: 'p', ...string[]] {
    let arr = [tag.type, tag.pubkey]
    tag.relay && arr.push(tag.relay)
    return arr as any
  },
  isEq(tag1, tag2) {
    return tag1.type === tag2.type && tag1.pubkey === tag2.pubkey
  },
})
/**
 * event Id
 */
export const e = createTagHandel({
  type: 'e',
  handle(tagArray): { type: 'e'; id: string; relay?: string } {
    return {
      type: 'e',
      id: tagArray[1],
      relay: tagArray[2],
    }
  },
  toTagArray(tag) {
    return [tag.type, tag.id, ...(tag.relay ? [tag.relay] : [])]
  },
  isEq(tag1, tag2) {
    return tag1.type === tag2.type && tag1.id === tag2.id
  },
})
export const i = createTagHandel({
  type: 'i',
  handle(tagArray) {
    return {
      type: 'i',
      value: tagArray[1],
    }
  },
  toTagArray(tag) {
    return [tag.type, tag.value]
  },
  isEq(tag1, tag2) {
    return tag1.type === tag2.type && tag1.value === tag2.value
  },
})
export const version = createTagHandel({
  type: 'version',
  handle(tagArray) {
    return {
      type: 'version',
      value: tagArray[1],
    }
  },
  toTagArray(tag) {
    return [tag.type, tag.value]
  },
  isEq(tag1, tag2) {
    return tag1.type === tag2.type && tag1.value === tag2.value
  },
})

/**
 * https://github.com/nostr-protocol/nips/blob/master/02.md
 */
export const follow = createTagHandel({
  type: 'p',
  handle(tagArray: [type: 'p', ...string[]]): {
    type: 'p'
    pubkey: string
    relay?: string
    petname?: string
  } {
    return {
      type: 'p',
      pubkey: tagArray[1],
      relay: tagArray[2],
      petname: tagArray[3],
    }
  },
  toTagArray(tag): [type: 'p', ...string[]] {
    let arr = [tag.type, tag.pubkey]
    tag.relay && arr.push(tag.relay)
    return arr as any
  },
  isEq(tag1, tag2) {
    return tag1.pubkey === tag2.pubkey
  },
})
