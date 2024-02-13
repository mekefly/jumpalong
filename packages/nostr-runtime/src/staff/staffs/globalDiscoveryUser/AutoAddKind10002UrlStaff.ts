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
$LoggerScope()

logger.debug(
  'RelayConfiguratorSynchronizerStaff',
  RelayConfiguratorSynchronizerStaff
)
export default createStaff(
  () => [
    RelayConfiguratorSynchronizerAddUrlsStaff,
    AddUrlStaff,
    LocalMapStaff,
    RelayConfiguratorSynchronizerStaff,
  ],
  'auto-add-kind-url-staff',
  ({ mod, line }) => {
    return mod.assignFeat({
      autoAdd10002(
        pubkey: Pubkey | string,
        opts: { read?: boolean; write?: boolean } = {}
      ) {
        if (typeof pubkey === 'string') {
          pubkey = Pubkey.fromHex(pubkey)
        }
        let l = this.createChild()
          .add(AutoAddUrlByGlobalDiscoveryUserStaff)
          .add(LatestEventStaff)
          .add(DoNotRepeatStaff)

        l.addFilter({
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

          if (isLocalHas) return

          l.addUrls(readUrl)
          l.addUrls(writeUrl)
        })

        let stop1: () => void
        call(async () => {
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
