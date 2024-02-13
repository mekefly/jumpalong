import { createStaff } from '../../staff'
import { useCache, timeout } from '@jumpalong/shared'

export default createStaff(line => {
  return (
    line
      // 定义事件
      .defineEmit<'add-urls', [urls: Set<string>]>()
      .assignOwnFeat(() => ({
        urlList: new Set<string>(),
      }))
      .assignFeat({
        getUrls() {
          this.urlList
        },
      })
      .assignChain({
        addUrl(url: string) {
          this.addUrls(new Set([url]))
        },
        addUrls(urls: Set<string>) {
          if (urls.size === 0) {
            return
          }
          let newUrls = new Set<string>()
          //去重
          for (const url of urls) {
            if (this.urlList.has(url)) {
              continue
            }
            this.urlList.add(url)
            newUrls.add(url)
          }

          if (newUrls.size > 0) {
            //事件
            this.emit('add-urls', newUrls)
          }
        },
      })
      .assignFeat({
        async addUrlsOrNull(urls?: Set<string> | null, cb?: () => void) {
          if (!urls) return
          this.addUrls(urls)
          return await cb?.()
        },
        async addUrlsWithTimeout(urls?: Set<string> | null, out = 1000) {
          return await this.addUrlsOrNull(urls, () => timeout(out))
        },
      })
  )
})
