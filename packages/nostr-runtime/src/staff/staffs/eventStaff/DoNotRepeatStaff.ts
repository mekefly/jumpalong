import { CreateChildHookStaff, EventStaff } from '..'
import { createStaff } from '../../staff'
import CreateHookStaff from '../common/extends/CreateHookStaff'
import EventListStaff from '../eventStaff/EventListStaff'

export default createStaff(
  () => [EventStaff, CreateChildHookStaff],
  ({ mod, line }) => {
    let map = new WeakMap<any, Set<string>>()
    line.onCreateChildDep<typeof line>(l => {
      l.onEvent(
        (subId, e) => {
          let m = map.get(l)
          if (m) {
            if (m.has(e.id)) return true
          } else {
            m = new Set()
            map.set(l, m)
          }
          m.add(e.id)
          return false
        },
        { unShift: true }
      )
    })

    return mod
  }
)
