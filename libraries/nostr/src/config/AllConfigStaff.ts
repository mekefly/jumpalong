import { createStaff } from '@jumpalong/core'
import DefineConfigStaff from './DefineConfigStaff'
import PapawTreeLazyModeStaff from './PapawTreeLazyModeStaff'
import PingConfigStaff from './PingConfigStaff'
import TreeConfigStaff from './TreeConfigStaff'

export default createStaff(
  () => [
    DefineConfigStaff,
    PapawTreeLazyModeStaff,
    PingConfigStaff,
    TreeConfigStaff,
  ],
  ({ mod, line }) => {
    return mod
  }
)
