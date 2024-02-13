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

$LoggerScope()

export default createStaff(
  () => [
    DoNotRepeatStaff,
    RelayConfiguratorSynchronizerStaff,
    EventCreateAtStaff,
    AutoAddKind10002UrlStaff,
    CachedStaff,
  ],
  'event-api-staff',
  ({ mod, line }) => {
    return mod
      .assignChain({
        addUrlForCommonEventList({
          urls,
          pubkeys,
          autoAddRelayUrls,
        }: CommonEventListOptions) {
          call(async () => {
            await this.addUrlsWithTimeout(urls, 1000)

            if (pubkeys) {
              for (const pubkey of pubkeys) {
                this.autoAdd10002(pubkey)
                await timeout(500)
              }
            }

            await this.relayConfigurator.onInited(() => {
              ;(autoAddRelayUrls ?? true) &&
                this.addUrlsWithTimeout(
                  this.relayConfigurator.getReadList(),
                  1000
                )
            })
          })
        },
      })
      .assignFeat({
        commonEventList(opts: CommonEventListOptions) {
          logger.debug('commonEventList:', opts)
          return this.cacheByOptions(opts, () => {
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
