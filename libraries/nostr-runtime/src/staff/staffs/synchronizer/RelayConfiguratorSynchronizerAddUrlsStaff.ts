import { UnsignedEvent } from 'nostr-tools'
import { createStaff, RelayConfiguratorSynchronizerStaff } from '../..'
import { RelayConfiguratorOptions } from './OptionsType'

export default createStaff(
  () => [RelayConfiguratorSynchronizerStaff],
  ({ mod, line }) => {
    return mod.assignFeat({
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
            console.log('initedAddReadWrite')

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
