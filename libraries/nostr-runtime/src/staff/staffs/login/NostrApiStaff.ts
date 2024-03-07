import { createStaff } from '../..'
import { NotLoginNostrApiImpl } from '../../../nostrApi/NotLoginNostrApiImpl'
import { NostrApi } from '../../../nostrApi/interface/NostrApi'

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
