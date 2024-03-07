import { createStaff } from '../../staff'
import { reverseInsertOnObjectList } from '@jumpalong/shared'

$LoggerScope()

export default createStaff('reverseInsertOnObjectList', ({ mod, line }) => {
  return mod.assignFeat({
    reverseInsertOnObjectList,
  })
})
