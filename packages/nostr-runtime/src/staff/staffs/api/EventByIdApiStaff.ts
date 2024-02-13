import { call, timeout, useCache } from '@jumpalong/shared'
import { Pubkey } from '../../../utils/user'
import { createStaff } from '../../staff'
import LatestEventStaff from '../eventStaff/LatestEventStaff'
import AutoAddUrlByGlobalDiscoveryUserStaff from '../globalDiscoveryUser/AutoAddUrlByGlobalDiscoveryUserStaff'
import ManagerStaff from '../manager/ManagerStaff'
import RelayConfiguratorSynchronizerStaff from '../synchronizer/RelayConfiguratorSynchronizerStaff'
import { CommonOptions, Cue } from './options'

export default createStaff(
  RelayConfiguratorSynchronizerStaff,
  ({ mod, line }) => {
    return mod.assignFeat({
      getEventById(id: string, options: Cue & CommonOptions = {}) {
        return useCache(
          `getEventById:${id}${JSON.stringify(options)}`,
          () => {
            const eventLine = this.createChild()
              // .add() // 重复事件过滤器
              .add(AutoAddUrlByGlobalDiscoveryUserStaff)
              .add(ManagerStaff)
              .add(LatestEventStaff)
            eventLine.addFilter({
              ids: [id],
              limit: 1,
            })
            call(async () => {
              if (options.urls) {
                eventLine.addUrls(options.urls)
                await timeout(500)
              }
              if (options.pubkeys) {
                options.pubkeys?.forEach(pubkey => {
                  eventLine.autoAddUrlByGlobalDiscoveryUser(
                    Pubkey.fromHex(pubkey)
                  )
                })
                await timeout(500)
              }

              if (options.autoAddRelayUrls) {
                line.relayConfigurator.onInited(() => {
                  eventLine.addUrls(line.relayConfigurator.getReadList())
                })
              }
            })

            return eventLine
          },
          {
            useMemoryCache: options.cached,
            useLocalStorage: false,
          }
        )
      },
    })
  }
)
