import { createStaff } from '../../staff'
import CreateHookStaff from '../common/extends/CreateHookStaff'
import PublishStaff from '../publish/PublishStaff'
import SubStaff from '../sub/SubStaff'
import AddPublishStaff from './AddPublishStaff'
import AddFilterStaff from './AddFilterStaff'
import AddUrlStaff from './AddUrlStaff'

export default createStaff(
  () => [
    AddUrlStaff,
    AddFilterStaff,
    SubStaff,
    PublishStaff,
    AddPublishStaff,
    CreateHookStaff,
  ],
  'manager-staff',
  ({ mod, line }) => {
    return mod
  }
)
