import { createStaff } from '@jumpalong/core'
import { call } from '@jumpalong/shared'
import {
  AddUrlsByCueStaff,
  AutoAddUrlByGlobalDiscoveryUserStaff,
  CachedStaff,
  LatestEventStaff,
} from '..'
import ManagerStaff from '../manager/ManagerStaff'
import { CommonOptions, CueOptions } from '@/types/api'
import { RelayConfiguratorOptions } from '@/types/synchronizer'
import { RelayConfiguratorSynchronizer } from '@/synchronizer/RelayConfiguratorSynchronizer'

export default createStaff(
  () => [RelayConfiguratorSynchronizer.Staff, CachedStaff, AddUrlsByCueStaff],
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
      .assignFn({
        getEventById(id: string, opts: CueOptions & CommonOptions = {}) {
          return this.cacheByOptions({ name: 'GEBID:' + id, ...opts }, () => {
            return this.createChild()
              .add(AutoAddUrlByGlobalDiscoveryUserStaff)
              .add(ManagerStaff)
              .add(LatestEventStaff)
              .provideLatestEvent()

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
