import { timeout } from '@jumpalong/shared'
import { nip19 } from 'nostr-tools'
import { ApiAddUrlsStaff, CachedStaff } from '..'
import { toDeCodeAddress } from '../../../utils/nostr'
import { Pubkey } from '../../../utils/user'
import { createStaff } from '../../staff'
import AddUrlsByCue from '../common/AddUrlsByCue'
import AsyncCallStaff from '../common/AsyncCallStaff'
import { CueOptions } from '../common/optionsType'
import LatestEventStaff from '../eventStaff/LatestEventStaff'
import AutoAddKind10002UrlStaff from '../globalDiscoveryUser/AutoAddKind10002UrlStaff'
import ManagerStaff from '../manager/ManagerStaff'
import RelayConfiguratorSynchronizerStaff from '../synchronizer/RelayConfiguratorSynchronizerStaff'
import { CommonOptions } from './options'

export default createStaff(
  () => [
    RelayConfiguratorSynchronizerStaff,
    CachedStaff,
    AsyncCallStaff,
    AddUrlsByCue,
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
