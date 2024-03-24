import { NotLoginNostrApiImpl } from '../nostr-api/NotLoginNostrApiImpl'
import { NostrApi } from '../nostr-api/interface/NostrApi'
import { createStaff } from '@jumpalong/core'

export default createStaff('nostr-api', ({ mod, line }) => {
  return mod.assignFeat({
    nostrApi: new NotLoginNostrApiImpl() as NostrApi,
    getNostrApi() {
      return this.nostrApi
    },
    setNostrApi(api: NostrApi) {
      this.nostrApi = api
    },
  })
})
