import { createStaff } from '@jumpalong/core'
import DefineConfigStaff from './DefineConfigStaff'

export default createStaff(
  () => [DefineConfigStaff],
  ({ mod, line }) => {
    return (
      line
        /**
         * 消息框启用懒加载模式
         * message box enable lazy mode
         */
        .defineConfig('lazyDelayForPapaw', 0, {
          path: 'papaw',
          displayType: 'range',
          range: [0, 1000],
        })
        .defineConfig('enableLazyLoadPapawTree', false, { path: 'papaw' }).mod
    )
  }
)
