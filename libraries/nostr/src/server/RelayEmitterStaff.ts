import { createStaff } from '@jumpalong/core'
import { EoseStaff, EventStaff, NoticeStaff, OkStaff } from '../staffExport'

export default createStaff(
  () => [OkStaff, NoticeStaff, EoseStaff, EventStaff],
  // SubStaff,
  line => {
    return line
  }
)
