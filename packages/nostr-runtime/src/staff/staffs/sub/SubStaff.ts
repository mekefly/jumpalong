import { type Filter } from 'nostr-tools'
// type Filter = any
import { createNotInjectStaff, createStaff } from '../../staff'
import CreateIdStaff from '../common/CreateIdStaff'
import { PoolStaff } from '..'
import EventStaff from '../eventStaff/EventStaff'
import EoseStaff from '../server/EoseStaff'
$LoggerScope()

export type SubOpt = {
  onEvent?: () => void
  onEose?: () => void
  subId?: string
  eoseAutoDesub?: boolean
}
export default createStaff(
  () => [
    CreateIdStaff,
    createNotInjectStaff<'pool-staff', typeof PoolStaff>('pool-staff'),
    EventStaff,
    EoseStaff,
  ],
  mod =>
    mod.assignFeat({
      /**
       * 向一个sub发布事件
       * @param url
       * @param filters
       */
      sub(
        url: string,
        filters: Filter[],
        { onEvent, onEose, subId, eoseAutoDesub }: SubOpt = {}
      ) {
        logger.silly('sub', url, filters)

        let _subId = subId || this.createId()

        //事件传递到发送sub的line上面
        this.relayPool.getLine().onEvent(
          (...rest) => {
            this.emitEvent(...rest)
          },
          { subId: _subId }
        )

        this.relayPool.getLine().onEose(
          (subId, url) => {
            if (eoseAutoDesub) {
              this.relayPool.getLine().emit('desub', subId, url)
            }

            this.emitEose(subId, url)
          },
          { subId: _subId }
        )

        //发送sub请求
        this.relayPool.getLine().emit('sub', url, filters, _subId)
      },
      /**
       * 向多个url发布事件
       * @param urls
       * @param filter
       */
      subs(urls: Set<string>, filter: Filter[], opt?: SubOpt) {
        // let subId = this.createId()

        for (const url of urls) {
          this.sub(url, filter, opt)
        }
      },
    })
)
