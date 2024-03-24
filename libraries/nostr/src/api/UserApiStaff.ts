import Kind10002ReadWriteListConfigStaff from '../event/Kind10002ReadWriteListConfigStaff'
import MetadataStaff from '../event/MetadataStaff'
import LocalMapStaff from '../local-event/LocalMapStaff'
import { RelayConfiguratorSynchronizer } from '../synchronizer/RelayConfiguratorSynchronizer'
import { ApiAddUrlsOptions, CommonOptions } from '../types/api'
import { createStaff } from '@jumpalong/core'
import { Pubkey } from '@jumpalong/nostr-shared'
import ManagerStaff from '../manager/ManagerStaff'
import EoseAutoUnSubStaff from '../sub/EoseAutoUnSubStaff'
import ApiAddUrlsStaff from './ApiAddUrlsStaff'
import EventApiStaff from './EventApiStaff'
import { AddFilterStaff, CachedStaff } from '..'
$LoggerScope()

export default createStaff(
  () => [
    EventApiStaff,
    LocalMapStaff,
    RelayConfiguratorSynchronizer.Staff,
    CachedStaff,
  ],
  ({ mod, line }) => {
    return mod.assignFn({
      getUserMetadataLineByPubkey(
        pubkey: Pubkey | string,
        options: ApiAddUrlsOptions & CommonOptions = {}
      ) {
        typeof pubkey === 'string' && (pubkey = Pubkey.fromHex(pubkey))
        return this.cacheByOptions(
          { name: 'GUMLBP:' + pubkey.toHex(), ...options },
          () => {
            const kind0line = line
              .createChild()
              .add(AddFilterStaff)
              .add(MetadataStaff)
              .add(EoseAutoUnSubStaff)
              .add(ApiAddUrlsStaff)
              .provideLatestEvent()

            kind0line.addFilter({
              kinds: [0],
              authors: [pubkey.toHex()],
            })

            //自动缓存
            kind0line.autoLocalCache()

            options.pubkey = pubkey
            kind0line.addUrlForHasLatestEventLine(options)

            return kind0line
          }
        )
      },
      getUserRelayUrlConfigByPubkey(
        pubkey: Pubkey | string,
        options: CommonOptions = {}
      ) {
        pubkey = Pubkey.fromMaybeHex(pubkey)
        return this.cacheByOptions(
          { name: 'GURUCBP:' + pubkey.toHex(), ...options },
          () => {
            const l = line
              .createChild()
              .add(ManagerStaff)
              .add(EoseAutoUnSubStaff)
              .add(ApiAddUrlsStaff)
              .add(Kind10002ReadWriteListConfigStaff)
              .provideLatestEvent()

            l.addFilter({
              kinds: [10002],
              authors: [pubkey.toHex()],
            })

            //自动缓存
            l.autoLocalCache()

            options.pubkey = pubkey
            l.addUrlForHasLatestEventLine(options)

            return l
          }
        )
      },
    })
  }
)
