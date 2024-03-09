import { createStaff } from '@jumpalong/core'

export default createStaff(({ mod, line }) => {
  return mod.assignFeat({
    publishEventIdList: new Set<string>(),
    publishEventList: [],
  })
})
