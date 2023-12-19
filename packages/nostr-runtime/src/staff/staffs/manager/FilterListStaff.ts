import { Filter } from 'nostr-tools'
import { createStaff } from '../../staff'
import AddFilterStaff from './AddFilterStaff'

export default createStaff(({ mod, line }) => {
  let _mod = mod.assignFeat({
    filterList: new Array<Filter>(),
    filterMap: new Map<string, Filter>(),
    getFilters() {
      this.filterMap
    },
  })

  return _mod
})
