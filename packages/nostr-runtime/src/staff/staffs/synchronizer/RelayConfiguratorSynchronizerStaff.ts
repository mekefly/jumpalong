import { RelayConfiguratorSynchronizer } from 'packages/nostr-runtime/src/Synchronizer/RelayConfiguratorSynchronizer'
import { createStaff } from '../..'

export default createStaff(line => {
  return line.assignFeat({
    relayConfiguratorSynchronizer: new RelayConfiguratorSynchronizer(line.out())
  })
})
