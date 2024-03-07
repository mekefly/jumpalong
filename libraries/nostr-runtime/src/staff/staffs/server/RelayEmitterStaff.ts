// import SubStaff from "../../../../nostr1/staff/EventStaff/SubStaff";
import { createStaff } from '../../staff'
import { EventStaff, OkStaff, EoseStaff, NoticeStaff } from '../staffExport'

export default createStaff(
  () => [OkStaff, NoticeStaff, EoseStaff, EventStaff],
  // SubStaff,
  line => {
    return line
  }
)
