import { call, timeout, useCache } from '@jumpalong/shared'
import { Pubkey } from '../../../utils/user'
import { createStaff } from '../../staff'
import LatestEventStaff from '../eventStaff/LatestEventStaff'
import AutoAddUrlByGlobalDiscoveryUserStaff from '../globalDiscoveryUser/AutoAddUrlByGlobalDiscoveryUserStaff'
import ManagerStaff from '../manager/ManagerStaff'
import RelayConfiguratorSynchronizerStaff from '../synchronizer/RelayConfiguratorSynchronizerStaff'
import { CommonOptions, CueOptions } from './options'
import { kinds, nip19 } from 'nostr-tools'
import { toDeCodeAddress } from '../../../utils/nostr'
import AutoAddKind10002UrlStaff from '../globalDiscoveryUser/AutoAddKind10002UrlStaff'

export default createStaff(
  RelayConfiguratorSynchronizerStaff,
  ({ mod, line }) => {
    return mod.assignFeat({
      addressPointerLine(
        addressPointer: string | nip19.AddressPointer,
        options: CueOptions & CommonOptions = {}
      ) {
        if (typeof addressPointer === 'string') {
          const a = toDeCodeAddress(addressPointer)
          if (!a) {
            throw new Error('Not an address')
          }
          addressPointer = a
        }

        return useCache(
          `getEventById:${JSON.stringify(addressPointer)}${JSON.stringify(
            options
          )}`,
          () => {
            this
            const eventLine = this.createChild()
              // .add() // 重复事件过滤器
              .add(ManagerStaff)
              .add(LatestEventStaff)
              .add(AutoAddKind10002UrlStaff)

            eventLine.addFilter({
              kinds: [addressPointer.kind],
              authors: [addressPointer.pubkey],
              ['#d']: [addressPointer.identifier],
              limit: 1,
            })
            call(async () => {
              if (options.urls) {
                eventLine.addUrls(options.urls)
                await timeout(500)
              }
              eventLine.autoAdd10002(Pubkey.fromHex(addressPointer.pubkey))

              await timeout(500)
              if (options.pubkeys) {
                options.pubkeys?.forEach(pubkey => {
                  eventLine.autoAdd10002(Pubkey.fromHex(pubkey))
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
