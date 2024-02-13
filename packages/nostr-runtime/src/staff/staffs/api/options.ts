import type { Pubkey } from '@jumpalong/nostr-runtime'
import type { SortOptions } from '../eventStaff/OptionsType'
import type { FilterOptions } from '../manager/optionsType'
import { CacheOptions, CueOptions } from '../common/optionsType'
import { RelayConfiguratorOptions } from '../synchronizer/OptionsType'

export interface CommonEventListOptions
  extends CueOptions,
    CommonOptions,
    SortOptions,
    FilterOptions {}
export interface CommonOptions
  extends CueOptions,
    CacheOptions,
    RelayConfiguratorOptions {
  cached?: boolean
  limit?: number
}

export type ApiAddUrlsOptions = {
  autoAddRelayUrls?: boolean
} & CueOptions
