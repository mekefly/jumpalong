import { createStaff } from '../../staff'

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
        addUrl(url: string) {
          this.addUrls(new Set([url]))
        },
        addUrls(urls: Set<string>) {
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
  )
})
