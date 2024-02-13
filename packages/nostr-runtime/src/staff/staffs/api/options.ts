import type { Pubkey } from '@jumpalong/nostr-runtime'
import { Filter } from 'nostr-tools'

export interface CreateTextEventBeltlineOption extends Cue, CommonOptions {
  filters?: Filter[]
}
export interface Cue {
  urls?: Set<string>
  pubkeys?: string[]
  pubkey?: Pubkey
}
export interface CommonOptions extends Cue {
  autoAddRelayUrls?: boolean
  cached?: boolean
  limit?: number
}

export type ApiAddUrlsOptions = {
  autoAddRelayUrls?: boolean
} & Cue
