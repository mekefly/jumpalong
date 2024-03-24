import LocalMapStaff from '../local-event/LocalMapStaff'
import { RelayConfiguratorSynchronizer } from '../synchronizer/RelayConfiguratorSynchronizer'
import { AutoAdd10002Options } from '../types/discovery'
import { createStaff } from '@jumpalong/core'
import { Pubkey, deserializeRelayConfiguration } from '@jumpalong/nostr-shared'
import { timeout } from '@jumpalong/shared'
import AddUrlStaff from '../manager/AddUrlStaff'
import {
  AsyncCallStaff,
  DoNotRepeatStaff,
  LatestEventStaff,
} from '../staffExport'
import RelayConfiguratorSynchronizerAddUrlsStaff from '../synchronizer/RelayConfiguratorSynchronizerAddUrlsStaff'
import AutoAddUrlByGlobalDiscoveryUserStaff from './AutoAddUrlByGlobalDiscoveryUserStaff'
$LoggerScope()

export default createStaff(
  () => [
    RelayConfiguratorSynchronizerAddUrlsStaff,
    AddUrlStaff,
    LocalMapStaff,
    RelayConfiguratorSynchronizer.Staff,
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
          .add(
            AutoAddUrlByGlobalDiscoveryUserStaff,
            LatestEventStaff,
            DoNotRepeatStaff
          )
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
