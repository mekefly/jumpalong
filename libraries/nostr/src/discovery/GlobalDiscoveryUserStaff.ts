import DefaultUrlStaff from './DefaultUrlStaff'
import sha256 from 'sha256'
import GlobalUrlsStaff from './GlobalUrlsStaff'
import { Binary } from '@jumpalong/shared'
import { Pubkey } from '@jumpalong/nostr-shared'
import { createStaff } from '@jumpalong/core'

let binaryMap: Record<string, Binary> = {}
export default createStaff(
  () => [DefaultUrlStaff, GlobalUrlsStaff],
  ({ mod, line }) => {
    return mod.assignFeat({
      async autoGlobalDiscoveryUserByPubkey(
        pubkey: Pubkey,
        limit = 50,
        urls?: Set<string>
      ) {
        let binaryPubkey = Binary.fromHex(pubkey.toHex())

        function addList(addedUrls: Set<string>) {
          for (const url of addedUrls) {
            binaryMap[url] = Binary.fromHex(sha256(url))
          }
        }

        addList(await this.autoGetGlobalUrls())

        return new Set(
          Object.entries(binaryMap)
            .map(([url, binary]) => {
              return {
                url: url,
                priority: binaryPubkey.XOR(binary).leadingZeroNumber(),
              }
            })

            .sort((a, b) => b.priority - a.priority)
            .slice(0, limit)
            .map(({ url }) => url)
        )
      },
    })
  }
)
