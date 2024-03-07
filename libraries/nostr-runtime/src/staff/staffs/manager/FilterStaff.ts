import { Filter } from 'nostr-tools'
import { createStaff } from '../../staff'

export default createStaff(({ mod, line }) => {
  return mod.assignOwnFeat(() => ({
    filterList: new Array<Filter>(),
  }))
})
