import { createStaff } from '@jumpalong/core'
import { filterTags } from '@jumpalong/nostr-shared'
import { timeout } from '@jumpalong/shared'
import { AutoAddKind10002UrlStaff } from '..'
import { CueOptions } from '../types/api'

export default createStaff(
  () => [AutoAddKind10002UrlStaff],
  ({ mod, line }) => {
    return mod
      .assignFn({
        async addUrlsByCub(opts?: CueOptions) {
          //防止重复执行autoAdd10002
          const pubkeys = new Set()
          if (!opts) return
          await this.addUrlsWithTimeout(opts?.urls, 1000)

          //通过pubkey为线索
          if (opts.pubkey && !pubkeys.has(opts.pubkey.toString())) {
            pubkeys.add(opts.pubkey.toString())
            this.autoAdd10002(opts.pubkey, opts.autoAdd10002Options)
            await timeout(500)
          }

          //pubkeys为线索
          if (opts?.pubkeys) {
            for (const pubkey of opts?.pubkeys) {
              if (pubkeys.has(pubkey)) continue
              pubkeys.add(pubkey)

              this.autoAdd10002(pubkey, opts.autoAdd10002Options)
              await timeout(500)
            }
          }

          //tags为线锁
          if (opts.tags) {
            //r标签为线锁['r','url']
            for (const [_, url] of filterTags(opts.tags, ['r'])) {
              url && this.addUrl(url)
            }
            //e,a标签['e'|'a'|'q',<value>,<url>]
            for (const [_, _v, url] of filterTags(opts.tags, [
              'e',
              'a',
              'q',
              'p',
            ])) {
              url && this.addUrl(url)
            }
            //p标签为线索
            for (const [_, pubkey, relay] of filterTags(opts.tags, ['p'])) {
              if (pubkeys.has(pubkey)) continue
              pubkeys.add(pubkey)

              this.autoAdd10002(
                pubkey,
                relay
                  ? {
                      urls: new Set([relay]),
                      ...opts.autoAdd10002Options,
                    }
                  : opts.autoAdd10002Options
              )
            }
            await timeout(500)
          }
        },
      })
      .assignChain({
        addUrlsByCubChain(opts: CueOptions) {
          this.addUrlsByCub(opts)
        },
      })
  }
)
