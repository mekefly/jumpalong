import { useCache, call, timeout } from '@jumpalong/shared'
import { createStaff } from '../../staff'
import { Pubkey } from '../../../utils/user'
import AutoAddUrlByGlobalDiscoveryUserStaff from '../globalDiscoveryUser/AutoAddUrlByGlobalDiscoveryUserStaff'
import EventApiStaff from './EventApiStaff'
import LocalMapStaff from '../common/LocalMapStaff'
import MetadataStaff from '../eventStaff/MetadataStaff'
import RelayConfiguratorSynchronizerStaff from '../synchronizer/RelayConfiguratorSynchronizerStaff'
import ManagerStaff from '../manager/ManagerStaff'
import EoseAutoUnSubStaff from '../sub/EoseAutoUnSubStaff'
import { CommonOptions } from './options'
import AutoAddKind10002UrlStaff from '../globalDiscoveryUser/AutoAddKind10002UrlStaff'
import { ApiAddUrlsOptions, CueOptions } from './options'
import ApiAddUrlsStaff from './ApiAddUrlsStaff'
import Kind10002ReadWriteListConfigStaff from '../eventStaff/Kind10002ReadWriteListConfigStaff'
$LoggerScope()

export default createStaff(
  () => [EventApiStaff, LocalMapStaff, RelayConfiguratorSynchronizerStaff],
  ({ mod, line }) => {
    return mod.assignFeat({
      getUserMetadataLineByPubkey(
        pubkey: Pubkey | string,
        options: ApiAddUrlsOptions & CommonOptions = {}
      ) {
        typeof pubkey === 'string' && (pubkey = Pubkey.fromHex(pubkey))
        logger.debug(
          'getUserMetadataLineByPubkey-----------------------------------'
        )
        return useCache(
          `getUserRelayUrlConfigByPubkey:${pubkey}`,
          () => {
            const kind0line = line
              .createChild()
              .add(ManagerStaff)
              .add(MetadataStaff)
              .add(EoseAutoUnSubStaff)
              .add(ApiAddUrlsStaff)

            kind0line.addFilter({
              kinds: [0],
              authors: [pubkey.toHex()],
            })

            logger.debug('autoLocalCache:start')
            //自动缓存
            kind0line.autoLocalCache()

            options.pubkey = pubkey
            kind0line.addUrlForHasLatestEventLine(options)

            return kind0line
          },
          {
            useLocalStorage: false,
            useMemoryCache: options.cached ?? true,
          }
        )
      },
      getUserRelayUrlConfigByPubkey(
        pubkey: Pubkey | string,
        options: CommonOptions = {}
      ) {
        pubkey = Pubkey.fromMaybeHex(pubkey)
        return useCache(
          `getUserRelayUrlConfigByPubkey,${pubkey.toHex()}`,
          () => {
            const l = line
              .createChild()
              .add(ManagerStaff)
              .add(EoseAutoUnSubStaff)
              .add(ApiAddUrlsStaff)
              .add(Kind10002ReadWriteListConfigStaff)

            l.addFilter({
              kinds: [10002],
              authors: [pubkey.toHex()],
            })

            //自动缓存
            l.autoLocalCache()

            options.pubkey = pubkey
            l.addUrlForHasLatestEventLine(options)

            return l
          },
          {
            useLocalStorage: false,
            useMemoryCache: options.cached ?? true,
          }
        )
      },
    })
  }
)
