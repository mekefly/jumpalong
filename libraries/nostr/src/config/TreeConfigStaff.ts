import { createStaff } from '@jumpalong/core'
import DefineConfigStaff from './DefineConfigStaff'

export default createStaff(
  () => [DefineConfigStaff],
  ({ mod, line }) => {
    return line.defineConfig('enableTree', false, {
      path: 'papaw',
    }).mod
  }
)
