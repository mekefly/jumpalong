import { createStaff } from '../../staff'
import AddUrlStaff from '../manager/AddUrlStaff'
import { RelayConfiguratorSynchronizer } from '../../../Synchronizer/RelayConfiguratorSynchronizer'

export default createStaff(AddUrlStaff, mod => {
  let x = new RelayConfiguratorSynchronizer(mod.out())
  return mod.assignFeat({
    relayConfigurator: x,
    initedAddRead() {
      this.relayConfigurator.onInited(() => {
        this.addUrls(this.relayConfigurator.getReadList())
      })
    },
    initedAddWrite() {
      this.relayConfigurator.onInited(() => {
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
  })
})
