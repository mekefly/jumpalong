import { createStaff } from '../../staff'
import { listenerFlags } from '../../../eventLine/LineEmitter'
import { timeout } from '@jumpalong/shared'

export type OkParmType = [
  eventId: string,
  options: { ok: boolean; message: string; url: string }
]
let out = 10 * 1000
export default createStaff(line => {
  return line.defineEmit<'ok' | `ok:${string}`, OkParmType>().assignChain({
    emitOK(...[eventId, options]: OkParmType) {
      this.emit({ types: ['ok', `ok:${eventId}`] }, eventId, options)
    },
    onOK(
      l: (...rest: OkParmType) => void,
      opt?: listenerFlags & { eventId: string }
    ) {
      if (opt?.eventId) {
        const type = `ok:${opt.eventId}` as const
        this.on(type, l, opt)
        timeout(out).then(() => {
          this.removeListener(type, l)
        })
      } else {
        const type = `ok` as const
        this.on(type, l, opt)
        timeout(out).then(() => {
          this.removeListener(type, l)
        })
      }
    },
  })
})
