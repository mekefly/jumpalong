import { createStaff } from '@jumpalong/core'
import SubStaff from './SubStaff'

export default createStaff(
  () => [SubStaff],
  factory => {
    return factory.assignFn({
      timeoutAutoUnsub(timeout = 20 * 1000 * 60) {
        this.relayPool.getLine().on('sub', (url, event, subId) => {
          setTimeout(() => {
            this.relayPool.getLine().emit('desub', subId, url)
          }, timeout)
        })
      },
    })
  }
)
