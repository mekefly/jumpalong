import { createStaff } from '..'
import { type EventLine } from '..'

export default createStaff(({ mod, line }) => {
  return mod.defineEmit<
    'create-child',
    [parent: EventLine<{}>, child: EventLine<{}>]
  >()
})
