import type { Pubkey } from '@jumpalong/nostr-shared'
import type { AutoAdd10002Options } from './discovery'
import type { SortOptions } from './event'
import type { FilterOptions } from './manager'
import type { RelayConfiguratorOptions } from './synchronizer'
import type { PublishOptions } from '../publish/PublishStaff'

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

export interface ApiAddUrlsOptions
  extends RelayConfiguratorOptions,
    CueOptions {}

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

export type SendReactionsOption = CueOptions & PublishOptions
export type ReactionsContent = '+' | '-'
export type DeleteReactionsOptions = {
  eventId?: string
  likeId?: string
} & PublishOptions & { cue?: CueOptions }
