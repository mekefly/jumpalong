import { reverseInsertOnObjectList } from '@jumpalong/shared'
import { createStaff } from '@jumpalong/core'

$LoggerScope()

export default createStaff('reverseInsertOnObjectList', ({ mod, line }) => {
  return mod.assignFeat({
    reverseInsertOnObjectList,
  })
})
