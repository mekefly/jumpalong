import { createStaff } from '@jumpalong/core'
import { RelayConfiguratorSynchronizerAddUrlsStaff, Synchronizer } from '.'

const c1 = createStaff(m =>
  m.add(Synchronizer.RelayConfiguratorSynchronizer.Staff)
)
const c2 = createStaff(m => m.add(RelayConfiguratorSynchronizerAddUrlsStaff))
