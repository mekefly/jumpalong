import { createStaff } from '@jumpalong/core'
import ManagerStaff from '../manager/ManagerStaff'
import EoseAutoUnSubStaff from '../sub/EoseAutoUnSubStaff'
import ApiAddUrlsStaff from './ApiAddUrlsStaff'
import EventApiStaff from './EventApiStaff'
import { RelayConfiguratorSynchronizer } from '../synchronizer/RelayConfiguratorSynchronizer'
import { ApiAddUrlsOptions, CommonOptions } from '../types/api'
import MetadataStaff from '../event/MetadataStaff'
import LocalMapStaff from '../local-event/LocalMapStaff'
$LoggerScope()

export default createStaff(
  () => [EventApiStaff, LocalMapStaff, RelayConfiguratorSynchronizer.Staff],
  ({ mod, line }) => {
    return mod.assignFeat({
      getChannelMetadataByChannelId(
        id: string,
        options: ApiAddUrlsOptions & CommonOptions = {}
      ) {
        return this.cacheByOptions({ name: cacheName(id), ...options }, () => {
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
function cacheName(id: string): string | undefined {
  return 'GCMBI:' + id
}
