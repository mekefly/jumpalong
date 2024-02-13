import { call, timeout } from '@jumpalong/shared'
import { createStaff } from '../../staff'
import { CueOptions } from './optionsType'
import { AutoAddKind10002UrlStaff } from '../..'

export default createStaff(
  () => [AutoAddKind10002UrlStaff],
  ({ mod, line }) => {
    return mod
      .assignFeat({
        async addUrlsByCub(opts?: CueOptions) {
          if (!opts) return
          await this.addUrlsWithTimeout(opts?.urls, 1000)

          if (opts?.pubkeys) {
            for (const pubkey of opts?.pubkeys) {
              this.autoAdd10002(pubkey)
              await timeout(500)
            }
          }
        },
      })
      .assignChain({
        addUrlsByCubChain(opts: CueOptions) {
          this.addUrlsByCubChain(opts)
        },
      })
  }
)
