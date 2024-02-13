import { insertOnObjectList } from '@jumpalong/shared'
import { createStaff } from '../../staff'

export default createStaff('insertOnObjectList', ({ mod, line }) => {
  return mod.assignFeat({
    insertOnObjectList,
  })
})
