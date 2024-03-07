import {
  AddFilterStaff,
  AddPublishStaff,
  AsyncCallStaff,
  CachedStaff,
  DoNotRepeatStaff,
  EventApiStaff,
  EventListStaff,
  EventStaff,
  EventUtilsStaff,
  LoadStaff,
  LoginUtilsStaff,
  ManagerStaff,
  ReactiveStaff,
  TimeoutAutoUnSubStaff,
  createStaff,
  Pubkey,
  AddUrlsByCue,
} from '../../..'
import { CommonEventListOptions } from './options'
import {
  KeyList,
  LocalStorageMap,
  defaultCacheOptions,
} from '@jumpalong/shared'
import { Event } from 'nostr-tools'
import { deserializeTagR, filterTags, getTagPAll } from '../../../event/tag'
import { PublishOptions } from '../publish/PublishStaff'
import DeletionStaffApi from './DeletionStaffApi'
import { CacheOptions, CueOptions } from '../common/optionsType'

/**
 * nip-25
 * https://github.com/nostr-protocol/nips/blob/master/25.md
 */
export default createStaff(
  () => [
    CachedStaff,
    AsyncCallStaff,
    LoginUtilsStaff,
    AddFilterStaff,
    EventApiStaff,
    AddPublishStaff,
    EventUtilsStaff,
    DeletionStaffApi,
    ReactiveStaff,
    AddUrlsByCue,
  ],
  ({ mod, line }) => {
    //  const reactions = reactive(
    //   useLocalStorage("reactions", ["+", "-"]).value
    // );
    // const reactionsSet = new Set(reactions);
    // const ReactionsCacheOptions = {
    //   ...defaultCacheOptions,
    //   duration: 1000 * 60 * 60 * 24,
    // };

    return mod
      .assignFeat({
        reactionCache: line.reactive(
          new LocalStorageMap<string>('reaction-cache')
        ),
        reactionsKeyList: line.reactive(new KeyList('__reactionsKeyList')),
      })
      .assignFn({
        getLikeByPubkey(
          pubkey: string | Pubkey,
          options: CommonEventListOptions
        ) {
          pubkey = typeof pubkey === 'string' ? Pubkey.fromHex(pubkey) : pubkey
          return this.commonEventList({
            ...options,
            pubkey: pubkey,
            filters: [
              {
                authors: [pubkey.toHex()],
                kinds: [7],
                limit: 20,
              },
            ],
          })
        },
        async sendReactions(
          content: ReactionsContent,
          targetEvent: Event,
          opt?: SendReactionsOption
        ) {
          if (this.hasReactions(content, targetEvent.id)) {
            return
          }

          //产生tags
          let tags: string[][] = filterTags(targetEvent.tags, ['e', 'p'])
          tags.push(['e', targetEvent.id])
          tags.push(['p', targetEvent.pubkey])
          tags.push(['k', targetEvent.kind.toString()])

          const publishLine = this.createChild()
          //创建一个发送事件
          const reactiveEvent = await this.createEvent({
            content,
            kind: 7,
            tags,
          })
          publishLine.addPublish(reactiveEvent, opt)

          //发送到
          //对方的读节点
          publishLine.addUrlsByCub({
            ...opt,
            autoAdd10002Options: { read: true },
            pubkeys: [targetEvent.pubkey],
            tags: targetEvent.tags,
          })
          //我方的写节点
          publishLine.addUrls(await this.relayConfigurator.initedGetWriteList())

          //设置缓存
          this.reactionCache.set(
            this.createReactionsKey(content, targetEvent.id),
            reactiveEvent.id
          )
        },
        async sendLike(likeEvent: Event, opt?: SendReactionsOption) {
          await this.sendReactions('+', likeEvent, opt)
        },
        async sendDislike(likeEvent: Event, opt?: SendReactionsOption) {
          await this.sendReactions('-', likeEvent, opt)
        },
        /**
         * 删除喜欢
         * @param content
         * @param opt
         */
        async deleteReactions(
          content: ReactionsContent,
          opt: DeleteReactionsOptions
        ) {
          if (opt.eventId) {
            const key = this.createReactionsKey(content, opt.eventId)
            let id = this.reactionCache.get(key)

            if (id) {
              this.deleteEvent({
                eventId: id,
                publishOpts: opt.onOK
                  ? {
                      onOK: opt.onOK,
                    }
                  : undefined,
                autoAdd10002Options: { read: true },
                ...opt.cue,
              })
            }
          } else if (opt.likeId) {
            this.deleteEvent({
              eventId: opt.likeId,
              publishOpts: opt.onOK
                ? {
                    onOK: opt.onOK,
                  }
                : undefined,
              autoAdd10002Options: { read: true },
              ...opt.cue,
            })
          }
        },
        deleteLike(opt: DeleteReactionsOptions) {
          this.deleteReactions('+', opt)
        },
        deleteDislike(opt: DeleteReactionsOptions) {
          this.deleteReactions('-', opt)
        },
        hasReactions(content: ReactionsContent, targetId: string) {
          const key = this.createReactionsKey(content, targetId)
          return !!this.reactionCache.get(key)
        },
        hasLike(eventId: string) {
          return this.hasReactions('+', eventId)
        },
        hasDislike(eventId: string) {
          return this.hasReactions('-', eventId)
        },
        createReactionsKey(content: ReactionsContent, eventId: string) {
          return `reaction:${content}:${eventId}`
        },
        getReactionByEventId(eventId: string, opts: CueOptions & CacheOptions) {
          return this.cacheByOptions(opts, () => {
            return this.createChild()
              .add(DoNotRepeatStaff)
              .add(ManagerStaff)
              .add(LoadStaff)
              .add(ReactionMapStaff)
              .provideReactionMap()

              .addFilters([
                {
                  '#e': [eventId],
                  kinds: [7],
                  limit: 20,
                },
              ])
              .onEvent((_, e) => {
                this.reactionsKeyList.add(e.content)
              })
              .chainCall(() => this.addUrlsByCub(opts))
          })
        },
        getReactionByEvent(event: Event, opts: CueOptions & CacheOptions) {
          return this.getReactionByEventId(event.id, {
            ...opts,
            pubkeys: [event.pubkey],
            autoAdd10002Options: {
              write: true,
            },
          })
        },
      })
  }
)
export const ReactionMapStaff = createStaff(
  () => [ReactiveStaff, EventStaff],
  ({ mod, line }) => {
    return mod
      .provide('ReactionMap', function () {
        let map = line.reactive({} as Record<string, Event[]>)
        this.onEvent((subId, event) => {
          map[event.content] ?? (map[event.content] = [] as Event[]).push(event)
        })
        return map
      })
      .assignFn({
        getReactiveMap(): Record<string, Event[]> {
          return this.injectReactionMap() as any
        },
      })
  }
)

type SendReactionsOption = CueOptions & PublishOptions
type ReactionsContent = '+' | '-'
export type DeleteReactionsOptions = {
  eventId?: string
  likeId?: string
} & PublishOptions & { cue?: CueOptions }
