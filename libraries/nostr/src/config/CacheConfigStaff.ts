import { createStaff } from '@jumpalong/core'
import DefineConfigStaff from './DefineConfigStaff'

export default createStaff(
  () => [DefineConfigStaff],
  ({ mod, line }) => {
    let xxx = line
      .defineConfig({
        xxx: 'xxx',
      })
      .defineConfig({
        yyy: 'yyy',
      })

    return xxx.mod
  }
)
