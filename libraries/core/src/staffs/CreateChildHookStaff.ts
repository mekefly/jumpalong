import { EventLine } from '..'
import { createStaff } from '..'
import { CreateChildEmitStaff } from '..'

export default createStaff(
  () => [CreateChildEmitStaff],
  mod => {
    return mod.assignFeat({
      /**
       * 自己和子line创建时执行
       * @param listener
       */
      onCreateChildDep<L extends EventLine<any> = EventLine<{}>>(
        listener: (line: L) => void
      ) {
        listener(this as any)
        this.on('create-child', (parent, child) => {
          ;(child as any).onCreateChildDep(listener)
        })
      },
    })
  }
)
