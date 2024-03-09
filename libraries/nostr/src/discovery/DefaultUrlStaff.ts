import { createStaff } from '@jumpalong/core'
import { setAdds } from '@jumpalong/shared'

export default createStaff('default-urls', ({ mod, line }) => {
  return mod.assignFeat({
    defaultUrls: new Set<string>([
      'wss://no.str.cr',
      'wss://no-str.org',
      'wss://nos.lol',
      'wss://nostr.com.de',
      'wss://relay.mostr.pub',
      'wss://relay.nostr.wirednet.jp',
      'wss://no-str.org',
      'wss://brb.io',
    ]),
    setDefaultUrls(urls: Set<string>) {
      this.defaultUrls = urls
    },
    addDefaultUrls(urls: Set<string>) {
      setAdds(this.defaultUrls, urls)
    },
  })
})
