import { createStaff } from '../..'

export default createStaff(({ mod, line }) => {
  return mod.assignFeat({
    publishEventIdList: new Set<string>(),
    publishEventList: [],
  })
})
