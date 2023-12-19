import { createStaff } from '../../staff'

export default createStaff(mod => {
  return mod.assignFeat({
    urlList: new Set<string>(),
    getUrls() {
      this.urlList
    },
  })
})
