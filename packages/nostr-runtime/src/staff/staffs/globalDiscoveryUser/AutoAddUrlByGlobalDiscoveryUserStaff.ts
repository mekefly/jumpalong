import { createStaff } from '../..'
import { timeout, createTaskQueue } from '@jumpalong/shared'

import { Pubkey } from '../../../utils/user'
import GlobalDiscoveryUserStaff from './GlobalDiscoveryUserStaff'

export default createStaff(GlobalDiscoveryUserStaff, ({ mod, line }) => {
  let queue = createTaskQueue()
  function addUrls(urls: Set<string>, l: any) {
    for (const url of urls) {
      queue.unShift(() => {
        l.addUrl(url)
      })
    }
  }
  return mod.assignFeat({
    autoAddUrlByGlobalDiscoveryUser(pubkey: Pubkey, limit = 20) {
      //监听修改
      // this.on('added-the-global-url-list', () => {
      //   let urls = this.autoGlobalDiscoveryUserByPubkey(pubkey, 20)
      //   addUrls(urls, this)
      // })
      let stopFlag = false

      //获取
      this.autoGlobalDiscoveryUserByPubkey(pubkey, limit).then(urls => {
        // if (urls.size !== limit) {
        //   //数量有点少
        //   //等待之中有可能就停止了
        //   timeout(2000).then(() => {
        //     if (stopFlag) return
        //     addUrls(urls, this)
        //   })
        // } else {
        addUrls(urls, this)
        // }
      })
      return () => {
        queue.clear()
        stopFlag = true
      }
    },
  })
})
