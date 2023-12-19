// import SubStaff from "../../../../nostr1/staff/EventStaff/SubStaff";
import { EventStaff } from '..'
import { createStaff } from '../../staff'
import EoseStaff from './EoseStaff'
import NoticeStaff from './NoticeStaff'
import OkStaff from './OkStaff'

export default createStaff(
  OkStaff,
  NoticeStaff,
  EoseStaff,
  EventStaff,
  // SubStaff,
  line => {
    return line
  }
)
