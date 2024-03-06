import { useCache, timeout } from '@jumpalong/shared'
import { createStaff } from '../../staff'
import EventCreateAtStaff from '../common/EventCreateAtStaff'
import LoadStaff from '../common/LoadStaff'
import DoNotRepeatStaff from '../eventStaff/DoNotRepeatStaff'
import EventListStaff from '../eventStaff/EventListStaff'
import ManagerStaff from '../manager/ManagerStaff'
import RelayConfiguratorSynchronizerStaff from '../synchronizer/RelayConfiguratorSynchronizerStaff'
import type { CommonEventListOptions } from './options'
import { call } from '@jumpalong/shared'
import AutoAddKind10002UrlStaff from '../globalDiscoveryUser/AutoAddKind10002UrlStaff'
import CachedStaff from '../common/CachedStaff'
import AddUrlsByCue from '../common/AddUrlsByCue'
import RelayConfiguratorSynchronizerAddUrlsStaff from '../synchronizer/RelayConfiguratorSynchronizerAddUrlsStaff'

$LoggerScope()

export default createStaff(
  () => [
    DoNotRepeatStaff,
    RelayConfiguratorSynchronizerStaff,
    RelayConfiguratorSynchronizerAddUrlsStaff,
    EventCreateAtStaff,
    AutoAddKind10002UrlStaff,
    CachedStaff,
    AddUrlsByCue,
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
