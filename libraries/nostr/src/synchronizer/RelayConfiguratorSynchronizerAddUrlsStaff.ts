import { createStaff } from '@jumpalong/core'
import { AddUrlStaff } from '..'
import { RelayConfiguratorSynchronizer } from '@/synchronizer/RelayConfiguratorSynchronizer'
import { RelayConfiguratorOptions } from '@/types/synchronizer'

export default createStaff(
  () => [RelayConfiguratorSynchronizer.Staff, AddUrlStaff],
  ({ mod, line }) => {
    return mod.assignFn({
      initedAddRead() {
        return this.relayConfigurator.onInited(() => {
          this.addUrls(this.relayConfigurator.getReadList())
        })
      },
      initedAddWrite() {
        return this.relayConfigurator.onInited(() => {
          this.addUrls(this.relayConfigurator.getWriteList())
        })
      },
      initedAddReadWrite() {
        return new Promise<void>((resolve, reject) => {
          this.relayConfigurator.onInited(() => {
            this.addUrls(this.relayConfigurator.getReadList())
            this.addUrls(this.relayConfigurator.getWriteList())
            resolve()
          })
        })
      },
      autoAddUrlForRelayConfiguratorByOptions(opts?: RelayConfiguratorOptions) {
        let { autoAddRelayUrls = 'read' } = opts ?? {}
        if (autoAddRelayUrls === true) {
          return this.initedAddReadWrite()
        } else if (autoAddRelayUrls === 'read') {
          return this.initedAddRead()
        } else if (autoAddRelayUrls === 'write') {
          return this.initedAddReadWrite()
        } else {
          return
        }
      },
    })
  }
)
