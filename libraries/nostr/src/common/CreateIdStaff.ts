import { createId } from '@jumpalong/shared'
import { createStaff } from '@jumpalong/core'

export default createStaff('create-id', line =>
  line.defineFeat('createId', createId)
)
