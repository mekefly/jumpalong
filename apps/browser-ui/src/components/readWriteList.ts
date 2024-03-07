import { l, line } from './ProfileMoreInfoRelayList.vue'

export const readWriteList = computedAsync<RelayConfiguration | null>(
  async () => {
    const _pubkey = pubkey.value
    if (_pubkey === (await l.getPubkeyOrNull())?.toHex()) {
      return l.relayConfigurator.getConfiguration()
    }
    return line.getRelayConfiguration()
  }
)
