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
      getChannelMetadataByChannelId(
        id: string,
        options: ApiAddUrlsOptions & CommonOptions = {}
      ) {
        return this.cacheByOptions({ name: 'GCMBI:' + id, ...options }, () => {
          const kind0line = line
            .createChild()
            .add(ManagerStaff)
            .add(MetadataStaff)
            .add(EoseAutoUnSubStaff)
            .add(ApiAddUrlsStaff)
            .provideLatestEvent()

          kind0line.addFilters([
            {
              kinds: [40],
              ids: [id],
            },
            {
              kinds: [41],
              ['#e']: [id],
            },
          ])

          //自动缓存
          kind0line.autoLocalCache()

          kind0line.addUrlForHasLatestEventLine(options)

          return kind0line
        })
      },
    })
  }
)
