import { createStaff } from '../../../staff'
import { type EventLine } from '../../../../eventLine/EventLine'

export default createStaff(({ mod, line }) => {
  return mod.defineEmit<
    'create-child',
    [parent: EventLine<{}>, child: EventLine<{}>]
  >()
})
