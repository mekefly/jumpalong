import { insertOnObjectList } from '@jumpalong/shared'
import { createStaff } from '@jumpalong/core'

export default createStaff('insertOnObjectList', ({ mod, line }) => {
  return mod.assignFeat({
    insertOnObjectList,
  })
})
