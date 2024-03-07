import { call } from '@jumpalong/shared'
import { timeout, createTaskQueue } from '@jumpalong/shared'
import RelayConfiguratorSynchronizerStaff from '../synchronizer/RelayConfiguratorSynchronizerStaff'
import { Pubkey } from '../../../utils/user'
import { createStaff } from '../../staff'
import AutoAddUrlByGlobalDiscoveryUserStaff from './AutoAddUrlByGlobalDiscoveryUserStaff'
import { deserializeRelayConfiguration } from '../../../event/tag'
import LatestEventStaff from '../eventStaff/LatestEventStaff'
import DoNotRepeatStaff from '../eventStaff/DoNotRepeatStaff'
import AddUrlStaff from '../manager/AddUrlStaff'
import LocalMapStaff from '../common/LocalMapStaff'
import RelayConfiguratorSynchronizerAddUrlsStaff from '../synchronizer/RelayConfiguratorSynchronizerAddUrlsStaff'
import { AsyncCallStaff } from '../staffExport'
$LoggerScope()

logger.debug(
  'RelayConfiguratorSynchronizerStaff',
  RelayConfiguratorSynchronizerStaff
)
export type AutoAdd10002Options = {
  read?: boolean
  write?: boolean
  urls?: Set<string>
}
export default createStaff(
  () => [
    RelayConfiguratorSynchronizerAddUrlsStaff,
    AddUrlStaff,
    LocalMapStaff,
    RelayConfiguratorSynchronizerStaff,
    AsyncCallStaff,
  ],
  'auto-add-kind-url-staff',
  ({ mod, line }) => {
    return mod.assignFn({
      autoAdd10002(pubkey: Pubkey | string, opts: AutoAdd10002Options = {}) {
        if (typeof pubkey === 'string') {
          pubkey = Pubkey.fromHex(pubkey)
        }
        let stop1: () => void
        let l = this.createChild()
          .add(AutoAddUrlByGlobalDiscoveryUserStaff)
          .add(LatestEventStaff)
          .add(DoNotRepeatStaff)
          .provideLatestEvent()

          .addFilter({
            kinds: [10002],
            authors: [pubkey.toHex()],
          })

        l.autoLocalCache()
        let isLocalHas = l.isHasLatestEvent()
        logger.debug('isLocalHas', isLocalHas)

        //更新时添加urls
        l.onHasLatestEvent(e => {
          logger.debug('onHasLatestEvent')

          const { readUrl, writeUrl } = deserializeRelayConfiguration(e.tags)
          ;(opts.read ?? true) && this.addUrls(readUrl)
          ;(opts.write ?? true) && this.addUrls(writeUrl)

          stop()
          if (isLocalHas) return

          l.addUrls(readUrl)
          l.addUrls(writeUrl)
        })
        l.asyncCall(async () => {
          if (l.isHasLatestEvent()) return
          if (opts.urls) {
            l.addUrls(opts.urls)
          }
          await timeout(500)

          if (l.isHasLatestEvent()) return
          l.initedAddReadWrite()
          await timeout(500)

          if (l.isHasLatestEvent()) return
          logger.debug('autoAddUrlByGlobalDiscoveryUser')
          stop1 = l.autoAddUrlByGlobalDiscoveryUser(pubkey)
          await timeout(500)
        })

        function stop() {
          stop1?.()
        }
        return stop
      },
    })
  }
)
