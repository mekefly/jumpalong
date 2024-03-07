import { Pubkey } from '../../../utils/user'
import { createStaff } from '../../staff'
import LocalMapStaff from '../common/LocalMapStaff'
import Kind10002ReadWriteListConfigStaff from '../eventStaff/Kind10002ReadWriteListConfigStaff'
import MetadataStaff from '../eventStaff/MetadataStaff'
import ManagerStaff from '../manager/ManagerStaff'
import EoseAutoUnSubStaff from '../sub/EoseAutoUnSubStaff'
import RelayConfiguratorSynchronizerStaff from '../synchronizer/RelayConfiguratorSynchronizerStaff'
import ApiAddUrlsStaff from './ApiAddUrlsStaff'
import EventApiStaff from './EventApiStaff'
import { ApiAddUrlsOptions, CommonOptions } from './options'
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
        return this.cacheByOptions(
          { name: 'GUMLBP:' + pubkey.toHex(), ...options },
          () => {
            const kind0line = line
              .createChild()
              .add(ManagerStaff)
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
