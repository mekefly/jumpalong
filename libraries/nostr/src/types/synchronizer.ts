export interface RelayConfiguratorOptions {
  autoAddRelayUrls?: boolean | 'write' | 'read'
}
import { OkParmType } from '@/server/OkStaff'
import { Event } from 'nostr-tools'
export type SyncOption = {
  moreUrls?: Set<string>
  onEvent?(e: Event, url: string): void
  onPush?(url: string): void
  onOK?: (...rest: OkParmType) => void
  isAutoAddRelayUrl?: boolean
  autoSync?: boolean
}
export type SynchronizerAbstractOption = {} & SyncOption


