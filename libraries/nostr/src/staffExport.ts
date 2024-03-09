import type { StaffConfigType } from './staff';
import {default as AddressPointerApi} from './api/AddressPointerApi';
import {default as ApiAddUrlsStaff} from './api/ApiAddUrlsStaff';
import {default as ChannelMetadataApiStaff} from './api/ChannelMetadataApiStaff';
import {default as ContactApiStaff} from './api/ContactApiStaff';
import {default as DeletionStaffApi} from './api/DeletionStaffApi';
import {default as EventApiStaff} from './api/EventApiStaff';
import {default as EventByIdApiStaff} from './api/EventByIdApiStaff';
import {default as ReactionStaff} from './api/ReactionStaff';
import {default as UserApiStaff} from './api/UserApiStaff';
import {default as AddUrlsByCueStaff} from './common/AddUrlsByCueStaff';
import {default as AsyncCallStaff} from './common/AsyncCallStaff';
import {default as CachedStaff} from './common/CachedStaff';
import {default as ConfigStaff} from './common/ConfigStaff';
import {default as CreateIdStaff} from './common/CreateIdStaff';
import {default as EventCreateAtStaff} from './common/EventCreateAtStaff';
import {default as LoadStaff} from './common/LoadStaff';
import {default as AutoAddKind10002UrlStaff} from './discovery/AutoAddKind10002UrlStaff';
import {default as AutoAddUrlByGlobalDiscoveryUserStaff} from './discovery/AutoAddUrlByGlobalDiscoveryUserStaff';
import {default as DefaultUrlStaff} from './discovery/DefaultUrlStaff';
import {default as GlobalDiscoveryUserStaff} from './discovery/GlobalDiscoveryUserStaff';
import {default as GlobalUrlsStaff} from './discovery/GlobalUrlsStaff';
import {default as DoNotRepeatStaff} from './event/DoNotRepeatStaff';
import {default as EventListStaff} from './event/EventListStaff';
import {default as EventStaff} from './event/EventStaff';
import {default as InsertObjectListStaff} from './event/InsertObjectListStaff';
import {default as Kind10002ReadWriteListConfigStaff} from './event/Kind10002ReadWriteListConfigStaff';
import {default as LatestEventStaff} from './event/LatestEventStaff';
import {default as MetadataStaff} from './event/MetadataStaff';
import {default as ReverseSearchInsertOnObjectListStaff} from './event/ReverseSearchInsertOnObjectListStaff';
import {default as SearchInsertOnObjectListStaff} from './event/SearchInsertOnObjectListStaff';
import {default as FilterStopStaff} from './filter/FilterStopStaff';
import {default as LocalMapStaff} from './local-event/LocalMapStaff';
import {default as EventUtilsStaff} from './login/EventUtilsStaff';
import {default as LoginStaff} from './login/LoginStaff';
import {default as LoginUtilsStaff} from './login/LoginUtilsStaff';
import {default as NostrApiStaff} from './login/NostrApiStaff';
import {default as NostrModeStaff} from './login/NostrModeStaff';
import {default as AddFilterStaff} from './manager/AddFilterStaff';
import {default as AddPublishStaff} from './manager/AddPublishStaff';
import {default as AddUrlStaff} from './manager/AddUrlStaff';
import {default as FilterStaff} from './manager/FilterStaff';
import {default as ManagerStaff} from './manager/ManagerStaff';
import {default as PublishedEventListStaff} from './manager/PublishedEventListStaff';
import {default as PublishEmitStaff} from './publish/PublishEmitStaff';
import {default as PublishStaff} from './publish/PublishStaff';
import {default as ReactiveStaff} from './reactive/ReactiveStaff';
import {default as AddRelayUrls} from './server/AddRelayUrls';
import {default as AuthStaff} from './server/AuthStaff';
import {default as CloseRelayStaff} from './server/CloseRelayStaff';
import {default as EoseStaff} from './server/EoseStaff';
import {default as NoticeStaff} from './server/NoticeStaff';
import {default as OkStaff} from './server/OkStaff';
import {default as PoolStaff} from './server/PoolStaff';
import {default as RelayEmitterStaff} from './server/RelayEmitterStaff';
import {default as RelayLifecycleStaff} from './server/RelayLifecycleStaff';
import {default as WebSocketFactoryStaff} from './server/WebSocketFactoryStaff';
import {default as EoseAutoUnSubStaff} from './sub/EoseAutoUnSubStaff';
import {default as SubEmitStaff} from './sub/SubEmitStaff';
import {default as SubIdListStaff} from './sub/SubIdListStaff';
import {default as SubStaff} from './sub/SubStaff';
import {default as TimeoutAutoUnSubStaff} from './sub/TimeoutAutoUnSubStaff';
import {default as RelayConfiguratorSynchronizerAddUrlsStaff} from './synchronizer/RelayConfiguratorSynchronizerAddUrlsStaff';
type AddressPointerApiConfigType = StaffConfigType<typeof AddressPointerApi>
type ApiAddUrlsStaffConfigType = StaffConfigType<typeof ApiAddUrlsStaff>
type ChannelMetadataApiStaffConfigType = StaffConfigType<typeof ChannelMetadataApiStaff>
type ContactApiStaffConfigType = StaffConfigType<typeof ContactApiStaff>
type DeletionStaffApiConfigType = StaffConfigType<typeof DeletionStaffApi>
type EventApiStaffConfigType = StaffConfigType<typeof EventApiStaff>
type EventByIdApiStaffConfigType = StaffConfigType<typeof EventByIdApiStaff>
type ReactionStaffConfigType = StaffConfigType<typeof ReactionStaff>
type UserApiStaffConfigType = StaffConfigType<typeof UserApiStaff>
type AddUrlsByCueStaffConfigType = StaffConfigType<typeof AddUrlsByCueStaff>
type AsyncCallStaffConfigType = StaffConfigType<typeof AsyncCallStaff>
type CachedStaffConfigType = StaffConfigType<typeof CachedStaff>
type ConfigStaffConfigType = StaffConfigType<typeof ConfigStaff>
type CreateIdStaffConfigType = StaffConfigType<typeof CreateIdStaff>
type EventCreateAtStaffConfigType = StaffConfigType<typeof EventCreateAtStaff>
type LoadStaffConfigType = StaffConfigType<typeof LoadStaff>
type AutoAddKind10002UrlStaffConfigType = StaffConfigType<typeof AutoAddKind10002UrlStaff>
type AutoAddUrlByGlobalDiscoveryUserStaffConfigType = StaffConfigType<typeof AutoAddUrlByGlobalDiscoveryUserStaff>
type DefaultUrlStaffConfigType = StaffConfigType<typeof DefaultUrlStaff>
type GlobalDiscoveryUserStaffConfigType = StaffConfigType<typeof GlobalDiscoveryUserStaff>
type GlobalUrlsStaffConfigType = StaffConfigType<typeof GlobalUrlsStaff>
type DoNotRepeatStaffConfigType = StaffConfigType<typeof DoNotRepeatStaff>
type EventListStaffConfigType = StaffConfigType<typeof EventListStaff>
type EventStaffConfigType = StaffConfigType<typeof EventStaff>
type InsertObjectListStaffConfigType = StaffConfigType<typeof InsertObjectListStaff>
type Kind10002ReadWriteListConfigStaffConfigType = StaffConfigType<typeof Kind10002ReadWriteListConfigStaff>
type LatestEventStaffConfigType = StaffConfigType<typeof LatestEventStaff>
type MetadataStaffConfigType = StaffConfigType<typeof MetadataStaff>
type ReverseSearchInsertOnObjectListStaffConfigType = StaffConfigType<typeof ReverseSearchInsertOnObjectListStaff>
type SearchInsertOnObjectListStaffConfigType = StaffConfigType<typeof SearchInsertOnObjectListStaff>
type FilterStopStaffConfigType = StaffConfigType<typeof FilterStopStaff>
type LocalMapStaffConfigType = StaffConfigType<typeof LocalMapStaff>
type EventUtilsStaffConfigType = StaffConfigType<typeof EventUtilsStaff>
type LoginStaffConfigType = StaffConfigType<typeof LoginStaff>
type LoginUtilsStaffConfigType = StaffConfigType<typeof LoginUtilsStaff>
type NostrApiStaffConfigType = StaffConfigType<typeof NostrApiStaff>
type NostrModeStaffConfigType = StaffConfigType<typeof NostrModeStaff>
type AddFilterStaffConfigType = StaffConfigType<typeof AddFilterStaff>
type AddPublishStaffConfigType = StaffConfigType<typeof AddPublishStaff>
type AddUrlStaffConfigType = StaffConfigType<typeof AddUrlStaff>
type FilterStaffConfigType = StaffConfigType<typeof FilterStaff>
type ManagerStaffConfigType = StaffConfigType<typeof ManagerStaff>
type PublishedEventListStaffConfigType = StaffConfigType<typeof PublishedEventListStaff>
type PublishEmitStaffConfigType = StaffConfigType<typeof PublishEmitStaff>
type PublishStaffConfigType = StaffConfigType<typeof PublishStaff>
type ReactiveStaffConfigType = StaffConfigType<typeof ReactiveStaff>
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
type EoseAutoUnSubStaffConfigType = StaffConfigType<typeof EoseAutoUnSubStaff>
type SubEmitStaffConfigType = StaffConfigType<typeof SubEmitStaff>
type SubIdListStaffConfigType = StaffConfigType<typeof SubIdListStaff>
type SubStaffConfigType = StaffConfigType<typeof SubStaff>
type TimeoutAutoUnSubStaffConfigType = StaffConfigType<typeof TimeoutAutoUnSubStaff>
type RelayConfiguratorSynchronizerAddUrlsStaffConfigType = StaffConfigType<typeof RelayConfiguratorSynchronizerAddUrlsStaff>
export {AddressPointerApi, ApiAddUrlsStaff, ChannelMetadataApiStaff, ContactApiStaff, DeletionStaffApi, EventApiStaff, EventByIdApiStaff, ReactionStaff, UserApiStaff, AddUrlsByCueStaff, AsyncCallStaff, CachedStaff, ConfigStaff, CreateIdStaff, EventCreateAtStaff, LoadStaff, AutoAddKind10002UrlStaff, AutoAddUrlByGlobalDiscoveryUserStaff, DefaultUrlStaff, GlobalDiscoveryUserStaff, GlobalUrlsStaff, DoNotRepeatStaff, EventListStaff, EventStaff, InsertObjectListStaff, Kind10002ReadWriteListConfigStaff, LatestEventStaff, MetadataStaff, ReverseSearchInsertOnObjectListStaff, SearchInsertOnObjectListStaff, FilterStopStaff, LocalMapStaff, EventUtilsStaff, LoginStaff, LoginUtilsStaff, NostrApiStaff, NostrModeStaff, AddFilterStaff, AddPublishStaff, AddUrlStaff, FilterStaff, ManagerStaff, PublishedEventListStaff, PublishEmitStaff, PublishStaff, ReactiveStaff, AddRelayUrls, AuthStaff, CloseRelayStaff, EoseStaff, NoticeStaff, OkStaff, PoolStaff, RelayEmitterStaff, RelayLifecycleStaff, WebSocketFactoryStaff, EoseAutoUnSubStaff, SubEmitStaff, SubIdListStaff, SubStaff, TimeoutAutoUnSubStaff, RelayConfiguratorSynchronizerAddUrlsStaff}
export type {AddressPointerApiConfigType, ApiAddUrlsStaffConfigType, ChannelMetadataApiStaffConfigType, ContactApiStaffConfigType, DeletionStaffApiConfigType, EventApiStaffConfigType, EventByIdApiStaffConfigType, ReactionStaffConfigType, UserApiStaffConfigType, AddUrlsByCueStaffConfigType, AsyncCallStaffConfigType, CachedStaffConfigType, ConfigStaffConfigType, CreateIdStaffConfigType, EventCreateAtStaffConfigType, LoadStaffConfigType, AutoAddKind10002UrlStaffConfigType, AutoAddUrlByGlobalDiscoveryUserStaffConfigType, DefaultUrlStaffConfigType, GlobalDiscoveryUserStaffConfigType, GlobalUrlsStaffConfigType, DoNotRepeatStaffConfigType, EventListStaffConfigType, EventStaffConfigType, InsertObjectListStaffConfigType, Kind10002ReadWriteListConfigStaffConfigType, LatestEventStaffConfigType, MetadataStaffConfigType, ReverseSearchInsertOnObjectListStaffConfigType, SearchInsertOnObjectListStaffConfigType, FilterStopStaffConfigType, LocalMapStaffConfigType, EventUtilsStaffConfigType, LoginStaffConfigType, LoginUtilsStaffConfigType, NostrApiStaffConfigType, NostrModeStaffConfigType, AddFilterStaffConfigType, AddPublishStaffConfigType, AddUrlStaffConfigType, FilterStaffConfigType, ManagerStaffConfigType, PublishedEventListStaffConfigType, PublishEmitStaffConfigType, PublishStaffConfigType, ReactiveStaffConfigType, AddRelayUrlsConfigType, AuthStaffConfigType, CloseRelayStaffConfigType, EoseStaffConfigType, NoticeStaffConfigType, OkStaffConfigType, PoolStaffConfigType, RelayEmitterStaffConfigType, RelayLifecycleStaffConfigType, WebSocketFactoryStaffConfigType, EoseAutoUnSubStaffConfigType, SubEmitStaffConfigType, SubIdListStaffConfigType, SubStaffConfigType, TimeoutAutoUnSubStaffConfigType, RelayConfiguratorSynchronizerAddUrlsStaffConfigType}