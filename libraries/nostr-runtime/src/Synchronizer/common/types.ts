import { Event } from 'nostr-tools'
import { OkParmType } from '../../staff/staffs/server/OkStaff'
export type SyncOption = {
  moreUrls?: Set<string>
  onEvent?(e: Event, url: string): void
  onPush?(url: string): void
  onOK?: (...rest: OkParmType) => void
  isAutoAddRelayUrl?: boolean
  autoSync?: boolean
}
export type SynchronizerAbstractOption = {} & SyncOption
