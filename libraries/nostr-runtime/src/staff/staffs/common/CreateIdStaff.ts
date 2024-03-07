import { createStaff } from '../../../staff/staff'
import { createId } from '@jumpalong/shared'

export default createStaff('create-id', line =>
  line.defineFeat('createId', createId)
)
