import type { Pubkey } from '@jumpalong/nostr-runtime'
import type { SortOptions } from '../eventStaff/OptionsType'
import type { FilterOptions } from '../manager/optionsType'
import { CacheOptions } from '../common/optionsType'

export interface CommonEventListOptions
  extends CueOptions,
    CommonOptions,
    SortOptions,
    FilterOptions {}
export interface CueOptions {
  urls?: Set<string>
  pubkeys?: string[]
  pubkey?: Pubkey
}
export interface CommonOptions extends CueOptions, CacheOptions {
  autoAddRelayUrls?: boolean
  cached?: boolean
  limit?: number
}

export type ApiAddUrlsOptions = {
  autoAddRelayUrls?: boolean
} & CueOptions
