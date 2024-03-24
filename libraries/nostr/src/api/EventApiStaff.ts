import { createStaff } from '@jumpalong/core'
import { call } from '@jumpalong/shared'
import CachedStaff from '../common/CachedStaff'
import EventCreateAtStaff from '../common/EventCreateAtStaff'
import LoadStaff from '../common/LoadStaff'
import ManagerStaff from '../manager/ManagerStaff'
import RelayConfiguratorSynchronizerAddUrlsStaff from '../synchronizer/RelayConfiguratorSynchronizerAddUrlsStaff'
import DoNotRepeatStaff from '../event/DoNotRepeatStaff'
import { RelayConfiguratorSynchronizer } from '../synchronizer/RelayConfiguratorSynchronizer'
import AutoAddKind10002UrlStaff from '../discovery/AutoAddKind10002UrlStaff'
import { AddUrlsByCueStaff, EventListStaff } from '..'
import { CommonEventListOptions } from '../types/api'

$LoggerScope()

export default createStaff(
  () => [
    DoNotRepeatStaff,
    RelayConfiguratorSynchronizer.Staff,
    RelayConfiguratorSynchronizerAddUrlsStaff,
    EventCreateAtStaff,
    AutoAddKind10002UrlStaff,
    CachedStaff,
    AddUrlsByCueStaff,
  ],
  'event-api-staff',
  ({ mod, line }) => {
    return mod
      .assignChain({
        addUrlForCommonEventList(opts: CommonEventListOptions) {
          call(async () => {
            await this.addUrlsByCub(opts)
            await this.autoAddUrlForRelayConfiguratorByOptions(opts)
          })
        },
      })
      .assignFn({
        commonEventList(opts: CommonEventListOptions) {
          logger.debug('commonEventList:', opts)
          return this.cacheByOptions(opts, () => {
            console.log('commonEventList:cacheByOptions', 11)

            return this.createChild()
              .add(EventListStaff)
              .add(DoNotRepeatStaff)
              .add(ManagerStaff)
              .add(LoadStaff)

              .provideEventList()
              .setupSort(opts)
              .addFiltersByOptions(opts)
              .addUrlForCommonEventList(opts)
          })
        },
      })
  }
)
