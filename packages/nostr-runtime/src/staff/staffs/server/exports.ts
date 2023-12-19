import type { StaffConfigType } from '../../staff';
import {default as AddRelayUrls} from './AddRelayUrls';
import {default as AuthStaff} from './AuthStaff';
import {default as CloseRelayStaff} from './CloseRelayStaff';
import {default as EoseStaff} from './EoseStaff';
import {default as NoticeStaff} from './NoticeStaff';
import {default as OkStaff} from './OkStaff';
import {default as PoolStaff} from './PoolStaff';
import {default as Relay} from './Relay';
import {default as RelayEmitterStaff} from './RelayEmitterStaff';
import {default as RelayLifecycleStaff} from './RelayLifecycleStaff';
import {default as WebSocketFactoryStaff} from './WebSocketFactoryStaff';
type AddRelayUrlsConfigType = StaffConfigType<typeof AddRelayUrls>
type AuthStaffConfigType = StaffConfigType<typeof AuthStaff>
type CloseRelayStaffConfigType = StaffConfigType<typeof CloseRelayStaff>
type EoseStaffConfigType = StaffConfigType<typeof EoseStaff>
type NoticeStaffConfigType = StaffConfigType<typeof NoticeStaff>
type OkStaffConfigType = StaffConfigType<typeof OkStaff>
type PoolStaffConfigType = StaffConfigType<typeof PoolStaff>
type RelayEmitterStaffConfigType = StaffConfigType<typeof RelayEmitterStaff>
type RelayLifecycleStaffConfigType = StaffConfigType<typeof RelayLifecycleStaff>
type WebSocketFactoryStaffConfigType = StaffConfigType<typeof WebSocketFactoryStaff>
export * from './websocket'
export {AddRelayUrls, AuthStaff, CloseRelayStaff, EoseStaff, NoticeStaff, OkStaff, PoolStaff, RelayEmitterStaff, RelayLifecycleStaff, WebSocketFactoryStaff}
export type {AddRelayUrlsConfigType, AuthStaffConfigType, CloseRelayStaffConfigType, EoseStaffConfigType, NoticeStaffConfigType, OkStaffConfigType, PoolStaffConfigType, RelayEmitterStaffConfigType, RelayLifecycleStaffConfigType, WebSocketFactoryStaffConfigType}