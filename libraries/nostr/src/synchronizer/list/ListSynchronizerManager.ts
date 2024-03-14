import { createGetValue } from '@jumpalong/shared'
import { SetsSynchronizer } from './SetsSynchronizer'
import { StandardListSynchronizer } from './StandardListSynchronizer'

import { EventLine, warpClassWithStaff } from '@jumpalong/core'
import { GetTagHandelArrayType, TagHandles } from '@jumpalong/nostr-shared'
const { a, e, emoji, i, p, r, relay, t, version, word, follow } = TagHandles
//nip-51

export enum SetsEnum {
  FollowSets = 30000,
  RelaySets = 30002,
  BookmarkSets = 30003,
  ArticlesCurationSets = 30004,
  VideosCurationSets = 30005,
  InterestSets = 30015,
  EmojiSets = 30030,
  ReleaseArtifactSets = 30063,
}
export enum ListEnum {
  MuteList = 10000,
  PinnedNotes = 10001,
  Bookmarks = 10003,
  Communities = 10004,
  PublicChats = 10005,
  BlockedRelays = 10006,
  SearchRelays = 10007,
  Interests = 10015,
  Emojis = 10030,
  Follow = 3,
}

const StandardListMap = {
  //黑名单
  [ListEnum.MuteList]: [p, t, word, e],
  //置顶
  [ListEnum.PinnedNotes]: [e],
  //书签
  [ListEnum.Bookmarks]: [e, a, t, r],
  //社区列表
  [ListEnum.Communities]: [a],
  //公共聊天
  [ListEnum.PublicChats]: [e],
  //中继黑名单
  [ListEnum.BlockedRelays]: [relay],
  //搜索中继
  [ListEnum.SearchRelays]: [relay],
  //兴趣话题
  [ListEnum.Interests]: [t, a],
  //表情符号
  [ListEnum.Emojis]: [emoji, a],

  //关注列表
  [ListEnum.Follow]: [follow],
}
const {
  FollowSets,
  RelaySets,
  BookmarkSets,
  ArticlesCurationSets,
  VideosCurationSets,
  InterestSets,
  EmojiSets,
  ReleaseArtifactSets,
} = SetsEnum
const SetsMap = {
  //分类关注列表
  [FollowSets]: [p],
  //分类列表
  [RelaySets]: [relay],
  //书签
  [BookmarkSets]: [e, a, t, r],
  //文章固定列表
  [ArticlesCurationSets]: [a, e],
  //视频固定列表
  [VideosCurationSets]: [a],
  //兴趣话题
  [InterestSets]: [t],
  //emoji自定义表情符号
  [EmojiSets]: [emoji],
  //应用程序标识符，版本组
  [ReleaseArtifactSets]: [e, i, version],
}
export type TagMapType = {
  [key in keyof typeof StandardListMap]: GetTagHandelArrayType<
    (typeof StandardListMap)[key]
  >
}
export const ListSynchronizerManager = warpClassWithStaff(
  'listSynchronizerManager',
  class ListSynchronizerManager {
    getLine
    constructor(line: EventLine<{}>) {
      this.getLine = createGetValue(() => line.createChild())
    }
    map = new Map()
    listEnum = ListEnum
    private getAndInitMap(kind: number, init: () => any): any {
      let m = this.map.get(kind)
      if (!m) {
        m = init()
        this.map.set(kind, m)
      }
      return m
    }
    getInitStandardListSynchronizer<K extends keyof typeof StandardListMap>(
      kind: K
    ): StandardListSynchronizer<(typeof StandardListMap)[K]> {
      return this.getAndInitMap(
        kind,
        () =>
          new StandardListSynchronizer(
            this.getLine(),
            kind,
            StandardListMap[kind] as any
          )
      )
    }
    getInitSetsSynchronizer<K extends keyof typeof SetsMap>(
      kind: K
    ): StandardListSynchronizer<(typeof SetsMap)[K]> {
      return this.getAndInitMap(
        kind,
        () => new SetsSynchronizer(this.getLine(), kind, SetsMap[kind] as any)
      )
    }
  }
)
