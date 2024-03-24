import { CreateChildHookStaff, createStaff } from '@jumpalong/core'
import { Filter } from 'nostr-tools'
import PublishStaff from '../publish/PublishStaff'
import SubStaff, { SubOpt } from '../sub/SubStaff'
import AddUrlStaff from './AddUrlStaff'
import FilterStaff from './FilterStaff'
import { FilterOptions } from '../types/manager'

export default createStaff(
  () => [
    AddUrlStaff,
    CreateChildHookStaff,
    PublishStaff,
    SubStaff,
    FilterStaff,
  ],
  'add-filter-staff',
  mod => {
    let mod1 = mod
      // 定义事件
      .defineEmit<'add-filters', [filters: Filter[]]>()
      .assignOwnFeat(() => ({
        filterMap: new Map<string, Filter>(),
        subOpts: undefined as SubOpt | undefined,
      }))
      .assignFeat({
        getFilters() {
          return this.filterList
        },
      })
      .assignChain({
        setSubOpt(opt: SubOpt) {
          this.subOpts = opt
        },
        addFilter(filter: Filter) {
          this.addFilters([filter])
        },
        addFiltersByOptions(opts: FilterOptions) {
          opts.filters && this.addFilters(opts.filters)
          opts.filter && this.addFilter(opts.filter)
        },
        addFilters(filters: Filter[]) {
          if (filters.length === 0) {
            return
          }
          let newFilterAdded: Filter[] = []
          //去重
          for (const filter of filters) {
            let key = JSON.stringify(filter)
            if (this.filterMap.has(key)) {
              continue
            }
            this.filterMap.set(key, filter)
            this.filterList.push(filter)
            newFilterAdded.push(filter)
          }

          if (newFilterAdded.length > 0) {
            // addFilters事件
            this.emit('add-filters', newFilterAdded)
          }
        },
      })
    mod1.line.onCreateChildDep<typeof mod1.line>(l => {
      console.log('onCreateChildDep')

      l.on('add-urls', urls => {
        l.subs(urls, l.filterList, l.subOpts)
        l.on('add-filters', filters => {
          l.subs(urls, filters, l.subOpts)
        })
      })
    })
    return mod1
  }
)
