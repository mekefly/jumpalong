import type { Event } from 'nostr-tools'
import { createStaff } from '../../staff'
import { listenerFlags } from '../../../eventLine/LineEmitter'

type PropType = [subId: string, event: Event, url: string]
type ReturnType = boolean | void
export default createStaff(mod => {
  let _mod = mod
    .defineEmit<'event', PropType, ReturnType>()
    .defineEmit<`event:${string}`, PropType, ReturnType>()
    .assignFeat({
      /**
       *
       * 发送一个event
       * @param subId
       * @param event
       * @param url
       */
      async emitEvent(subId: string, event: Event, url: string = 'local') {
        await this.emit(
          {
            types: [`event`, `event:${subId}`],
            onReturn: (stopFlag, { stop }) => stopFlag && stop(),
          },
          subId,
          event,
          url
        )
      },
      onEvent(
        f: (...rest: PropType) => ReturnType,
        opt?: listenerFlags & {
          subId?: string
        }
      ) {
        if (opt?.subId) {
          this.on(`event:${opt.subId}`, f, opt)
        } else {
          this.on('event', f, opt)
        }
      },
    })

  return _mod
})
