import { CreateChildHookStaff } from '..'
import { createStaff } from '../../staff'
import SubStaff from './SubStaff'

export default createStaff(
  () => [SubStaff, CreateChildHookStaff],
  factory => {
    let line = factory.out()

    line.onCreateChildDep<typeof line>(l => {
      l.on('eose', (subId, url) => {
        l.relayPool.getLine().emit('desub', subId, url)
      })
    })

    return factory
  }
)
