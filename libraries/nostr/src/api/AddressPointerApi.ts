import { createStaff } from '@jumpalong/core'
import { Pubkey, toDeCodeAddress } from '@jumpalong/nostr-shared'
import { timeout } from '@jumpalong/shared'
import { nip19 } from 'nostr-tools'
import {
  AddUrlsByCueStaff,
  ApiAddUrlsStaff,
  AsyncCallStaff,
  AutoAddKind10002UrlStaff,
  CachedStaff,
  LatestEventStaff,
  ManagerStaff,
} from '../'
import { RelayConfiguratorSynchronizer } from '@/synchronizer/RelayConfiguratorSynchronizer'
import { CommonOptions, CueOptions } from '@/types/api'

export default createStaff(
  () => [
    RelayConfiguratorSynchronizer.Staff,
    CachedStaff,
    AsyncCallStaff,
    AddUrlsByCueStaff,
    ApiAddUrlsStaff,
  ],
  ({ mod, line }) => {
    return mod.assignFn({
      addressPointerLine(
        addressPointer: string | nip19.AddressPointer,
        options: CueOptions & CommonOptions = {}
      ) {
        console.log('addressPointerLine,0')
        if (typeof addressPointer === 'string') {
          const a = toDeCodeAddress(addressPointer)
          if (!a) {
            throw new Error('Not an address')
          }
          addressPointer = a
        }
        console.log('addressPointerLine,1')
        return line.cacheByOptions(
          { name: `GEBID:${JSON.stringify(addressPointer)}`, ...options },
          () => {
            console.log('addressPointerLine')

            return this.createChild()
              .add(ManagerStaff)
              .add(LatestEventStaff)
              .add(AutoAddKind10002UrlStaff)
              .provideLatestEvent()

              .addFilter({
                kinds: [addressPointer.kind],
                authors: [addressPointer.pubkey],
                ['#d']: [addressPointer.identifier],
                limit: 1,
              })
              .chainCall(async function () {
                // await this.addUrlsWithTimeout(new Set(addressPointer.relays))
                console.log('AddressPointerApi', 'addressPointer.pubkey')

                await this.autoAdd10002(Pubkey.fromHex(addressPointer.pubkey))

                await timeout(500)
                await this.addUrlForHasLatestEventLine(options)
              })
          }
        )
      },
    })
  }
)
