import { Filter } from 'nostr-tools'
import { createStaff } from '../../staff'

import AddFilterStaff from '../manager/AddFilterStaff'
import CreateHookStaff from './extends/CreateHookStaff'
import { copy, insertOnObjectList } from '@jumpalong/shared'
import { CreateChildHookStaff } from '..'
type LoadMap = {
  since: number
  until: number
  loadDone: boolean
  newLoadDone: boolean
}
export type UrlLoadMap = { map: Map<string, LoadMap>; done: boolean }
export type FilterLoadMap = WeakMap<Filter, UrlLoadMap>
function getInitUrlLoadMap(filterLoadMap: FilterLoadMap, filter: Filter) {
  let loadMap = filterLoadMap.get(filter)
  if (!loadMap) {
    filterLoadMap.set(
      filter,
      (loadMap = { map: new Map(), done: !filter.limit && !filter.since })
    )
  }
  return loadMap
}

function getInitFilterLoadMap(
  urlLoadMap: UrlLoadMap,
  url: string,
  defaul: () => LoadMap
) {
  let loadMap = urlLoadMap.map.get(url)
  if (!loadMap) {
    urlLoadMap.map.set(url, (loadMap = defaul()))
  }
  return loadMap
}
let defaultLimit = 10
export function load(filters: Filter[], loadData: FilterLoadMap, limit = 10) {
  let subList: [url: string, filter: Filter][] = reserveSubList(
    filters,
    loadData,
    limit
  )

  let keepHalfSubList = keepHalf(subList)

  let m2: Record<string, Filter[]> = mergeRequestsForTheSameUrl(keepHalfSubList)
  return m2
}
export function mergeRequestsForTheSameUrl(
  keepHalfSubList: [url: string, filter: Filter][]
) {
  let m2: Record<string, Filter[]> = {}
  keepHalfSubList.forEach(([url, filter]) => {
    ;(m2[url] || (m2[url] = [])).push(filter)
  })
  return m2
}

//请求最早的一半，其他舍去
export function keepHalf(subList: [url: string, filter: Filter][]) {
  let halfIndex = Math.floor(subList.length / 2)
  return subList.slice(halfIndex)
}
export default createStaff(
  () => [AddFilterStaff, CreateChildHookStaff],
  ({ mod, line }) => {
    return mod
      .assignOwnFeat(() => ({
        loadData: new WeakMap() as FilterLoadMap,
      }))
      .assignFeat({
        load(limit: number = defaultLimit) {
          let m2 = load(this.filterList, this.loadData, limit)
          for (const [url, filters] of Object.entries(m2)) {
            this.sub(url, filters, { eoseAutoDesub: true })
          }
        },
        loadNew(limit: number = defaultLimit) {},
      })
      .inLine(line =>
        line.onCreateChildDep<typeof line>(l => {
          l.onEvent((subId, e, url) => {
            if (!url) return
            l.filterList.forEach(filter => {
              let UrlLoadMap = getInitUrlLoadMap(l.loadData, filter)
              //filter已经获取所有的事件
              if (UrlLoadMap.done) return

              let loadMap = getInitFilterLoadMap(UrlLoadMap, url, () => ({
                newLoadDone: false,
                loadDone: false,
                since: e.created_at,
                until: e.created_at,
              }))

              //该url已获取了所有事件

              if (!loadMap.loadDone && e.created_at < loadMap.since) {
                return (loadMap.since = e.created_at)
              } else if (!loadMap.newLoadDone && e.created_at > loadMap.until) {
                return (loadMap.until = e.created_at)
              }
            })
          })
        })
      )
  }
)
export function reserveSubList(
  filters: Filter[],
  loadData: FilterLoadMap,
  limit: number
) {
  let subList: [url: string, filter: Filter][] = []
  for (const filter of filters) {
    let filterLoadMap = loadData.get(filter)
    if (!filterLoadMap) continue
    if (filterLoadMap.done) continue

    for (const [url, loadMap] of filterLoadMap.map) {
      if (loadMap.loadDone) {
        continue
      }
      let newFilter = copy(filter)
      newFilter.until = loadMap.since
      newFilter.limit = limit
      let v = [url, newFilter] as const
      insertOnObjectList(subList, v, v => v[1]['until'] ?? 0)
    }
  }
  return subList
}
