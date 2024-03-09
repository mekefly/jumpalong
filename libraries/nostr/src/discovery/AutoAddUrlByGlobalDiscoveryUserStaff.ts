import { createStaff } from '@jumpalong/core'
import { Pubkey } from '@jumpalong/nostr-shared'
import { createTaskQueue } from '@jumpalong/shared'
import GlobalDiscoveryUserStaff from './GlobalDiscoveryUserStaff'

export default createStaff(
  () => [GlobalDiscoveryUserStaff],
  ({ mod, line }) => {
    return mod.assignFeat({
      autoAddUrlByGlobalDiscoveryUser(pubkey: Pubkey, limit = 5) {
        let queue = createTaskQueue(1000)
        function addUrls(urls: Set<string>, l: any) {
          for (const url of urls) {
            queue.unShift(() => {
              l.addUrl(url)
            })
          }
        }
        //获取
        this.autoGlobalDiscoveryUserByPubkey(pubkey, limit).then(urls => {
          addUrls(urls, this)
        })
        return () => {
          queue.clear()
        }
      },
    })
  }
)
