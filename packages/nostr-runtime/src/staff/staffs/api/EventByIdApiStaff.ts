import { call, timeout, useCache } from '@jumpalong/shared'
import { Pubkey } from '../../../utils/user'
import { createStaff } from '../../staff'
import LatestEventStaff from '../eventStaff/LatestEventStaff'
import AutoAddUrlByGlobalDiscoveryUserStaff from '../globalDiscoveryUser/AutoAddUrlByGlobalDiscoveryUserStaff'
import ManagerStaff from '../manager/ManagerStaff'
import RelayConfiguratorSynchronizerStaff from '../synchronizer/RelayConfiguratorSynchronizerStaff'
import { CommonOptions } from './options'
import AddUrlsByCue from '../common/AddUrlsByCue'
import { CachedStaff } from '..'
import { CueOptions } from '../common/optionsType'
import { RelayConfiguratorOptions } from '../synchronizer/OptionsType'

export default createStaff(
  () => [RelayConfiguratorSynchronizerStaff, CachedStaff, AddUrlsByCue],
  ({ mod, line }) => {
    return mod
      .assignChain({
        addUrlForEventById(
          opts: CueOptions & CommonOptions & RelayConfiguratorOptions
        ) {
          call(async () => {
            await this.addUrlsByCub(opts)
            await this.autoAddUrlForRelayConfiguratorByOptions(opts)
          })
        },
      })
      .assignFeat({
        getEventById(id: string, opts: CueOptions & CommonOptions = {}) {
          return this.cacheByOptions({ name: 'GEBID:' + id, ...opts }, () => {
            return this.createChild()
              .add(AutoAddUrlByGlobalDiscoveryUserStaff)
              .add(ManagerStaff)
              .add(LatestEventStaff)
              .addFilter({
                ids: [id],
                limit: 1,
              })
              .addUrlForEventById(opts)
          })
        },
      })
  }
)
