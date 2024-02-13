import { Event, Filter } from 'nostr-tools'
import { AddressPointer } from 'nostr-tools/nip19'
import { createStaff } from '../../staff'
import { ReplaceableEventMap } from '../../../../src/eventMap/ReplaceableEventMap'
import { CommonEvent } from '../../../eventMap/CommonEvent'
import { ParameterizedReplaceableEventMap } from '../../../eventMap/ParameterizedReplaceableEventMap'
import FilterStaff from '../manager/FilterStaff'
import EventStaff from '../eventStaff/EventStaff'

interface Options extends IncludeExcludeKindOptions {
  disabledAutoCache?: boolean
}
interface IncludeExcludeKindOptions {
  exclude?: Array<number> | Set<number>
  include?: Array<number> | Set<number>
}
/**
 * @param kind
 * @param opts
 * @returns  true 为通过，false为不通过
 */
export function includeExclude(
  kind: number,
  opts: IncludeExcludeKindOptions = {}
) {
  if (opts.exclude) {
    if (!(opts.exclude instanceof Set)) {
      opts.exclude = new Set(opts.exclude)
    }
    if (opts.exclude.has(kind)) {
      return false
    }
  }
  if (opts.include) {
    if (!(opts.include instanceof Set)) {
      opts.include = new Set(opts.include)
    }
    if (!opts.include?.has(kind)) {
      return false
    }
  }

  return true
}
export default createStaff(EventStaff, FilterStaff, ({ mod, line }) => {
  return mod.assignFeat({
    localMap: {} as {
      [key in number]:
        | ReplaceableEventMap
        | CommonEvent
        | ParameterizedReplaceableEventMap
    },
    //自动加载本地存储
    /**
     * 全自动装载缓存
     * @param opts
     */
    autoLocalCache(opts?: Options) {
      this.autoLoadCache()
      if (!opts?.disabledAutoCache) {
        this.autoCacheEvent(opts)
      }
    },
    autoLoadCache(opts?: Options) {
      for (const filter of this.filterList) {
        this.autoLoadCacheByFilter(
          filter,
          Object.assign({}, opts, { disabledAutoCache: true })
        )
      }
    },
    /**
     * 自动加载存储通过filter
     * @param filter
     * @param opts
     * @returns
     */
    autoLoadCacheByFilter(filter: Filter, opts: Options = {}) {
      if (!filter.kinds) return
      for (const kind of filter.kinds) {
        if (!includeExclude(kind, opts)) return

        if (ReplaceableEventMap.isReplaceableKind(kind)) {
          //加载可替换事件
          this.loadReplaceableEvent(
            this.getInitReplaceableEventMap(kind),
            filter.authors
          )
        } else if (
          ParameterizedReplaceableEventMap.isParameterizedReplaceableEvent(kind)
        ) {
          //加载参数化可替换事件
          this.loadParameterizedReplaceableEvent(
            this.getInitParameterizedReplaceableEventMap(kind),
            kind,
            filter.authors,
            filter['#d']
          )
        } else if (CommonEvent.isCommonEventKind(kind)) {
          //加载通用事件
          this.loadCommonEvent(this.getInitCommonEvent(kind), filter.ids)
        }
      }

      if (!opts?.disabledAutoCache) {
        this.autoCacheEvent()
      }
    },
    autoCacheEvent(opt?: IncludeExcludeKindOptions) {
      this.on('event', (id, e) => {
        let kind = e.kind

        if (!includeExclude(kind, opt)) return
        if (ReplaceableEventMap.isReplaceableKind(kind)) {
          //可替换事件
          const map = this.getInitReplaceableEventMap(kind)

          map.add(e)
        } else if (
          ParameterizedReplaceableEventMap.isParameterizedReplaceableEvent(kind)
        ) {
          //参数化可替换事件
          this.getInitParameterizedReplaceableEventMap(kind).add(e)
        } else if (CommonEvent.isCommonEventKind(kind)) {
          //普通事件
          this.getInitCommonEvent(kind).add(e)
        }
      })
    },
    loadReplaceableEvent(map: ReplaceableEventMap, pubkeys?: string[]) {
      if (!pubkeys) {
        this.loadEvents(map.values())
        return
      }
      this.loadEvents(map.query(new Set(pubkeys)))
    },
    loadParameterizedReplaceableEvent(
      map: ParameterizedReplaceableEventMap,
      kind: number,
      authors?: string[],
      identifiers?: string[]
    ) {
      if (!authors || !identifiers) {
        this.loadEvents(
          map.query(
            new Set([kind]),
            authors && new Set(authors),
            identifiers && new Set(identifiers)
          )
        )
        return
      }
      //authors 和 identifiers都存在
      for (const pubkey of authors) {
        for (const identifier of identifiers) {
          const e = map.getByA({ kind, pubkey, identifier })
          if (!e) {
            continue
          }
          this.loadEvents([e])
        }
      }
    },
    loadCommonEvent(map: CommonEvent, ids?: string[]) {
      if (!ids) {
        this.loadEvents(map.values())
        return
      }
      this.loadEvents(map.query(new Set(ids)))
    },
    loadEvents(events: Event[]) {
      for (const e of events) {
        if (!e) {
          continue
        }
        this.emitEvent('local', e)
      }
    },

    getInitReplaceableEventMap(kind: number): ReplaceableEventMap {
      if (!ReplaceableEventMap.isReplaceableKind(kind)) {
        throw new Error(`kind${kind} not is a ReplaceableEvent`)
      }
      return (this.localMap[kind] ||
        (this.localMap[kind] = new ReplaceableEventMap(
          kind
        ))) as ReplaceableEventMap
    },
    getInitCommonEvent(kind: number) {
      if (!CommonEvent.isCommonEventKind(kind)) {
        throw new Error(`kind${kind} not is a CommonEvent`)
      }
      return (this.localMap[kind] ||
        (this.localMap[kind] = new CommonEvent(kind))) as CommonEvent
    },
    getInitParameterizedReplaceableEventMap(kind: number) {
      if (
        !ParameterizedReplaceableEventMap.isParameterizedReplaceableEvent(kind)
      ) {
        throw new Error(`kind${kind} not is a ParameterizedReplaceableEvent`)
      }
      return (this.localMap[kind] ||
        (this.localMap[kind] = new ParameterizedReplaceableEventMap(
          kind
        ))) as ParameterizedReplaceableEventMap
    },
  })
})
