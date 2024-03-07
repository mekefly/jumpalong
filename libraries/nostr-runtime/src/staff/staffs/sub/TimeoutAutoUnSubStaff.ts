import { createStaff } from '../../staff'
import SubStaff from './SubStaff'

export default createStaff(
  () => [SubStaff],
  (factory, timeout = 20 * 1000 * 60) => {
    let line = factory.out()
    line.relayPool.getLine().on('sub', (url, event, subId) => {
      setTimeout(() => {
        line.relayPool.getLine().emit('desub', subId, url)
      }, timeout)
    })
    return factory
  }
)
