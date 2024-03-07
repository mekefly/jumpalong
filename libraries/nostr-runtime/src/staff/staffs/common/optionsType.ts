import type { Pubkey } from '@jumpalong/nostr-runtime'
import type { AutoAdd10002Options } from '../globalDiscoveryUser/AutoAddKind10002UrlStaff'

export interface CacheOptions {
  name?: string
  cache?: boolean
}

export interface CueOptions {
  urls?: Set<string>
  pubkeys?: string[]
  pubkey?: Pubkey
  tags?: string[][]
  autoAdd10002Options?: AutoAdd10002Options
}
