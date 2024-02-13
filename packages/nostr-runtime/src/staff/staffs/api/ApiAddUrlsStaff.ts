import { timeout } from '@jumpalong/shared'
import {
  AutoAddKind10002UrlStaff,
  ManagerStaff,
  RelayConfiguratorSynchronizerStaff,
} from '..'
import { createStaff } from '../../staff'
import LatestEventStaff from '../eventStaff/LatestEventStaff'
import { ApiAddUrlsOptions, Cue } from './options'
import { RelayConfiguratorSynchronizer } from '../../../Synchronizer/RelayConfiguratorSynchronizer'


export default createStaff(
  () => [
    LatestEventStaff,
    ManagerStaff,
    AutoAddKind10002UrlStaff,
    // RelayConfiguratorSynchronizer.Staff,
    RelayConfiguratorSynchronizerStaff,
  ],
  ({ mod, line }) => {
    return mod.assignFeat({
      async addUrlForHasLatestEventLine(options: ApiAddUrlsOptions) {
        if (this.isHasLatestEvent()) return

        if (options.urls) {
          this.addUrls(options.urls)
          await timeout(500)

          if (this.isHasLatestEvent()) return
        }

        if (options.autoAddRelayUrls ?? true) {
          line.relayConfigurator.onInited(() => {
            this.addUrls(line.relayConfigurator.getReadList())
          })

          await timeout(500)
          if (this.isHasLatestEvent()) return
        }

        if (options.pubkey) {
          this.autoAdd10002(options.pubkey)

          await timeout(500)
          if (this.isHasLatestEvent()) return
        }

        if (options.pubkeys) {
          for (const pubkey of options.pubkeys) {
            this.autoAdd10002(pubkey)
            await timeout(500)
            if (this.isHasLatestEvent()) return
          }
        }
      },
    })
  }
)
