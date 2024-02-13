import { createStaff } from '../../../staff'
import { EventLine } from '../../../../eventLine/EventLine'
import CreateHookEmitStaff from './CreateHookEmitStaff'

export default createStaff(CreateHookEmitStaff, ({ mod, line }) => {
  return mod.assignFeat({
    /**
     * 自己和子line创建时执行
     * @param listener
     */
    onCreate<L extends EventLine<any> = EventLine<{}>>(
      listener: (line: L) => void
    ) {
      listener(this as any)
      this.on('create', line => {
        ;(line as any).onCreate(listener)
      })
    },
  })
})
