import { useCache, timeout } from '@jumpalong/shared'
import { createStaff } from '../../staff'
import EventCreateAtStaff from '../common/EventCreateAtStaff'
import LoadStaff from '../common/LoadStaff'
import DoNotRepeatStaff from '../eventStaff/DoNotRepeatStaff'
import EventListStaff from '../eventStaff/EventListStaff'
import ManagerStaff from '../manager/ManagerStaff'
import RelayConfiguratorSynchronizerStaff from '../synchronizer/RelayConfiguratorSynchronizerStaff'
import { CreateTextEventBeltlineOption } from './options'
import { call } from '@jumpalong/shared'
import AutoAddKind10002UrlStaff from '../globalDiscoveryUser/AutoAddKind10002UrlStaff'

$LoggerScope()

export default createStaff(
  () => [
    DoNotRepeatStaff,
    RelayConfiguratorSynchronizerStaff,
    EventCreateAtStaff,
  ],
  'event-api-staff',
  ({ mod, line }) => {
    return mod.assignFeat({
      commonEventList(opts: CreateTextEventBeltlineOption) {
        logger.debug('commonEventList:', opts)

        let {
          filters,
          limit = 10,
          urls,
          autoAddRelayUrls = true,
          pubkeys,
        } = opts
        const commonLine = this.createChild()

          // .add() // 重复事件过滤器
          .add(DoNotRepeatStaff)
          .add(ManagerStaff)
          .add(EventListStaff)
          .add(LoadStaff)
          .add(AutoAddKind10002UrlStaff)

        commonLine.provideEventList()

        //反顺序列表
        commonLine.useReverseInsertObjectList()

        filters && filters.length > 0 && commonLine.addFilters(filters)

        call(async () => {
          if (urls && urls.size > 0) {
            commonLine.addUrls(urls)
            await timeout(1000)
          }

          if (pubkeys) {
            for (const pubkey of pubkeys) {
              commonLine.autoAdd10002(pubkey)
              await timeout(500)
            }
          }

          line.relayConfigurator.onInited(() => {
            console.log(
              'autoAddRelayUrls',
              line.relayConfigurator.getReadList()
            )

            autoAddRelayUrls &&
              commonLine.addUrls(line.relayConfigurator.getReadList())
          })
        })

        return commonLine
      },
      cachedCommonEventList(opts: CreateTextEventBeltlineOption) {
        console.log('cachedCommonEventList')

        return useCache(
          `cachedCommonEventList:${JSON.stringify(opts)}`,
          this.commonEventList.bind(this),
          {
            useMemoryCache: true,
            useLocalStorage: false,
          },
          opts
        )
      },
    })
  }
)
