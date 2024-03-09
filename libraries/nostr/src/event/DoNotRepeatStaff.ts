import { EventStaff } from '..'
import { CreateChildHookStaff, createStaff } from '@jumpalong/core'

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
