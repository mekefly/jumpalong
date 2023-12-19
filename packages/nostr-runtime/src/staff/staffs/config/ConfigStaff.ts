import { createStaff } from '../..'

export default createStaff(({ mod, line }) => {
  return mod.assignFeat({
    config: { getOtherUrlsRequestLimitSize: 50 },
  })
})
