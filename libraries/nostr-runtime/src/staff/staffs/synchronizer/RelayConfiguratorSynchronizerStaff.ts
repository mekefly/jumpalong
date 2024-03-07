import { createStaff } from '../../staff'
import AddUrlStaff from '../manager/AddUrlStaff'
import { RelayConfiguratorSynchronizer } from '../../../Synchronizer/RelayConfiguratorSynchronizer'

export default createStaff(
  () => [AddUrlStaff],
  mod => {
    let x = new RelayConfiguratorSynchronizer(mod.out())
    return mod.assignFeat({
      relayConfigurator: x,
    })
  }
)
