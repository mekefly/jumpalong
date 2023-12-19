import { type RelayConfiguration } from './relayConfigurator'
import { readListKey, writeListKey } from './relayConfiguratorKeys'
import { ReadAndWriteConfigurationMap } from './types'

export function deserializeTagR(serializedArray: string[][]): Set<string> {
  const url = new Set<string>()
  for (const item of serializedArray) {
    if (item[0] === 'r') {
      url.add(item[1])
    }
  }
  url.delete('')
  return url
}
export function getRootTagE(serializedArray: string[][]): string[] | undefined {
  for (const item of serializedArray) {
    if (item[0] === 'e' && item[3] === 'root') {
      return item
    }
  }
}
export function getTagEOfFirst(tags: string[][]): string[] | void {
  for (const tag of tags) {
    if (tag[0] === 'e') {
      return tag
    }
  }
  return
}
export function getOnlyTag(
  type:
    | String
    | 'title'
    | 'image'
    | 'summary'
    | 'published_at'
    | 'e'
    | 'd'
    | 'p'
    | 'a',
  tags: string[][]
) {
  for (const tag of tags) {
    if (tag[0] === type) {
      return tag
    }
  }
  return null
}

export type WritableReadableList = {
  read: Set<string>
  write: Set<string>
  urls: Set<string>
}
export function serializeRelayConfiguration(
  relayConfiguration: ReadAndWriteConfigurationMap
) {
  const tags: string[][] = []
  for (const url in relayConfiguration) {
    const { read, write } = relayConfiguration[url]
    let tag = ['r', url]
    if (read) {
      if (write) {
        continue
      } else {
        tag.push('read')
      }
    } else {
      tag.push('write')
    }
  }
  return tags
}
export function deserializeRelayConfiguration(serializedArray?: string[][]) {
  const { read: readUrl, write: writeUrl } =
    deserializeTagRToReadWriteList(serializedArray)
  const relayConfiguration: RelayConfiguration = {
    [readListKey]: readUrl,
    [writeListKey]: writeUrl,
  }

  for (const url of readUrl) {
    ;(relayConfiguration[url] ?? (relayConfiguration[url] = {}))['read'] = true
  }
  for (const url of writeUrl) {
    ;(relayConfiguration[url] ?? (relayConfiguration[url] = {}))['write'] = true
  }
  return { relayConfiguration, readUrl, writeUrl }
}

export function deserializeTagRToReadWriteList(
  serializedArray?: string[][]
): WritableReadableList {
  const readUrl = new Set<string>()
  const writeUrl = new Set<string>()
  const urls = new Set<string>()
  if (serializedArray) {
    for (const item of serializedArray) {
      if (item[0] === 'r') {
        urls.add(item[1])
        if (item[2] === 'read') {
          readUrl.add(item[1])
        } else if (item[2] === 'write') {
          writeUrl.add(item[1])
        } else {
          readUrl.add(item[1])
          writeUrl.add(item[1])
        }
      }
    }
  }
  return { read: readUrl, write: writeUrl, urls }
}

export function deserializeTagEOfEventIds(
  serializedArray: string[][]
): Set<string> {
  const e = new Set<string>()
  for (const item of serializedArray) {
    if (item[0] === 'e') {
      e.add(item[1])
    }
  }
  e.delete('')
  return e
}

export function deserializeTagE(serializedArray: string[][]): TagE[] {
  const tags: TagE[] = []
  let index = 0
  let lastNoMacker: any = null
  for (const item of serializedArray) {
    //https://github.com/nostr-protocol/nips/blob/master/10.md
    if (item[0] === 'e') {
      const v: TagE = {
        eventId: item[1],
        relay: item[2],
        marker: ['reply', 'mention', 'root'].includes(item[3])
          ? (item[3] as any)
          : 'reply',
        type: '',
      }
      tags.push(v)
    }
  }
  return tags
}

export function serializeTagE(tagEList: TagE[]): string[][] {
  const tags: string[][] = []
  let index = 0
  let lastNoMacker: any = null
  for (const item of tagEList) {
    //https://github.com/nostr-protocol/nips/blob/master/10.md
    tags.push(['e', item.eventId, item.relay ?? '', item.marker])
  }
  return tags
}

export function createTagArray(type: string, ...rest: any[]) {
  return [type, ...rest]
}
export type PubkeyTag = {
  pubkey: string
  relayUrl: string
  name: string
}

export function serializeToTagP(pubkeyTagList: PubkeyTag[]) {
  const tags: string[][] = []
  for (const { pubkey, relayUrl, name } of pubkeyTagList) {
    tags.push(['p', pubkey, relayUrl, name])
  }
  return tags
}
export function deserializeTagP(serializedArray: string[][]) {
  const pubkeyTags: PubkeyTag[] = []

  for (const item of serializedArray) {
    if (item[0] === 'p') {
      pubkeyTags.push({
        pubkey: item[1],
        relayUrl: item[2],
        name: item[3],
      })
    }
  }

  return pubkeyTags
}

export function getTagE(tagStrList: string[][]) {
  const tags = Tag.deserializationTagList(tagStrList).filter(
    v => v.type === 'e'
  ) as TagE[]
  return tags
}
export class Tag {
  static deserializationTagList(tagStrs: string[][]) {
    const tags: Tag[] = []
    for (const tagStr of tagStrs) {
      const v = Tag.deserialization(tagStr)
      v && tags.push(v)
    }
    return tags
  }
  static deserialization(tag: string[]) {
    const p = tag[0]
    switch (p) {
      case 'e':
        return TagE.deserialization(tag)
        break
      default:
        break
    }
  }
  type: string = ''
}

export class TagE extends Tag {
  static deserialization(tag: string[]) {
    return new TagE(
      tag[1],
      tag[2],
      ['marker', 'root', 'reply'].includes(tag[3]) ? (tag[3] as any) : undefined
    )
  }
  type = 'e'

  constructor(
    public eventId: string = '',
    public relay: string = '',
    public marker: 'mention' | 'root' | 'reply' = 'reply'
  ) {
    super()
  }
}
