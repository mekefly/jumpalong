import { createStaff } from '@jumpalong/core'
import { timeout } from '@jumpalong/shared'
import { AutoAddKind10002UrlStaff, LatestEventStaff, ManagerStaff } from '..'
import { RelayConfiguratorSynchronizer } from '@/synchronizer/RelayConfiguratorSynchronizer'
import { ApiAddUrlsOptions } from '@/types/api'

export default createStaff(
  () => [
    LatestEventStaff,
    ManagerStaff,
    AutoAddKind10002UrlStaff,
    // RelayConfiguratorSynchronizer.Staff,
    RelayConfiguratorSynchronizer.Staff,
  ],
  ({ mod, line }) => {
    return mod.assignChain({
      async addUrlForHasLatestEventLine(opts: ApiAddUrlsOptions) {
        if (this.isHasLatestEvent()) return

        if (opts.urls) {
          this.addUrls(opts.urls)
          await timeout(500)

          if (this.isHasLatestEvent()) return
        }

        if (opts.autoAddRelayUrls ?? true) {
          line.relayConfigurator.onInited(() => {
            this.addUrls(line.relayConfigurator.getReadList())
          })

          await timeout(500)
          if (this.isHasLatestEvent()) return
        }

        if (opts.pubkey) {
          this.autoAdd10002(opts.pubkey)

          await timeout(500)
          if (this.isHasLatestEvent()) return
        }

        if (opts.pubkeys) {
          for (const pubkey of opts.pubkeys) {
            this.autoAdd10002(pubkey)
            await timeout(500)
            if (this.isHasLatestEvent()) return
          }
        }
      },
    })
  }
)
