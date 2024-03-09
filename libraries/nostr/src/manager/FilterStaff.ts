import { Filter } from 'nostr-tools'
import { createStaff } from '@jumpalong/core'

export default createStaff(({ mod, line }) => {
  return mod.assignOwnFeat(() => ({
    filterList: new Array<Filter>(),
  }))
})
