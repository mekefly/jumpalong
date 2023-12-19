import { Filter } from 'nostr-tools'
import { createStaff } from '../../staff'

export default createStaff(mod =>
  mod
    .defineEmit<'sub', [url: string, filter: Filter[], subId: string]>()
    .defineEmit<'desub', [subId: string, url: string], any>()
    .assignFeat({
      sub(url: string, filter: Filter[]) {},
      subs(urls: Set<string>, filter: Filter[]) {
        for (const url of urls) {
          this.sub(url, filter)
        }
      }
    })
)
