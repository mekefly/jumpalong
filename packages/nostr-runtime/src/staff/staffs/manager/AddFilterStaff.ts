import { Filter } from 'nostr-tools'
import { createStaff } from '../../staff'
import AddUrlStaff from './AddUrlStaff'
import CreateHookStaff from '../common/extends/CreateHookStaff'
import PublishStaff from '../publish/PublishStaff'
import SubStaff from '../sub/SubStaff'
import FilterStaff from './FilterStaff'
import { CreateChildHookStaff } from '../..'

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
      }))
      .assignFeat({
        getFilters() {
          return this.filterList
        },

        addFilter(filter: Filter) {
          this.addFilters([filter])
        },
        addFilters(filters: Filter[]) {
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
        l.subs(urls, l.filterList)
        l.on('add-filters', filters => {
          l.subs(urls, filters)
        })
      })
    })
    return mod1
  }
)
