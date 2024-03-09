import { createStaff, listenerFlags } from '@jumpalong/core'
export default createStaff(line => {
  type P = [subId: string, url: string]
  return line.defineEmit<'eose' | `eose:${string}`, P>().assignChain({
    emitEose(subId: string, url: string) {
      this.emit(
        {
          once: true,
          type: `eose:${subId}`,
          noPause: true,
        },
        subId,
        url
      )

      this.emit(
        {
          type: `eose`,
          noPause: true,
        },
        subId,
        url
      )
    },
    onEose(l: (...rest: P) => void, opt?: listenerFlags & { subId: string }) {
      if (opt?.subId) {
        this.on(`eose:${opt.subId}`, l, Object.assign({ once: true }, opt))
      } else {
        this.on('eose', l, opt)
      }
    },
  })
})
