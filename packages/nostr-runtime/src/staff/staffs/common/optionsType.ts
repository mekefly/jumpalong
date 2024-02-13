import type { Pubkey } from '@jumpalong/nostr-runtime'

export interface CacheOptions {
  name?: string
  cache?: boolean
}

export interface CueOptions {
  urls?: Set<string>
  pubkeys?: string[]
  pubkey?: Pubkey
}
