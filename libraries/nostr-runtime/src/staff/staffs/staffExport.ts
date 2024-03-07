import type { StaffConfigType } from '../staff';
import {default as AddressPointerApi} from './api/AddressPointerApi';
import {default as ApiAddUrlsStaff} from './api/ApiAddUrlsStaff';
import {default as ChannelMetadataApiStaff} from './api/ChannelMetadataApiStaff';
import {default as ContactApiStaff} from './api/ContactApiStaff';
import {default as DeletionStaffApi} from './api/DeletionStaffApi';
import {default as EventApiStaff} from './api/EventApiStaff';
import {default as EventByIdApiStaff} from './api/EventByIdApiStaff';
import {default as ReactionStaff} from './api/ReactionStaff';
import {default as UserApiStaff} from './api/UserApiStaff';
import {default as AddUrlsByCue} from './common/AddUrlsByCue';
import {default as AsyncCallStaff} from './common/AsyncCallStaff';
import {default as CachedStaff} from './common/CachedStaff';
import {default as ConfigStaff} from './common/ConfigStaff';
import {default as CreateIdStaff} from './common/CreateIdStaff';
import {default as EventCreateAtStaff} from './common/EventCreateAtStaff';
import {default as CreateChildEmitStaff} from './common/extends/CreateChildEmitStaff';
import {default as CreateChildHookStaff} from './common/extends/CreateChildHookStaff';
import {default as CreateHookEmitStaff} from './common/extends/CreateHookEmitStaff';
import {default as CreateHookStaff} from './common/extends/CreateHookStaff';
import {default as InjectStaff} from './common/extends/InjectStaff';
import {default as OwnDateAssignStaff} from './common/extends/OwnDateAssignStaff';
import {default as ParentStaff} from './common/extends/ParentStaff';
import {default as LoadStaff} from './common/LoadStaff';
import {default as LocalMapStaff} from './common/LocalMapStaff';
import {default as PauseStaff} from './common/PauseStaff';
import {default as DoNotRepeatStaff} from './eventStaff/DoNotRepeatStaff';
import {default as EventListStaff} from './eventStaff/EventListStaff';
import {default as EventStaff} from './eventStaff/EventStaff';
import {default as InsertObjectListStaff} from './eventStaff/InsertObjectListStaff';
import {default as Kind10002ReadWriteListConfigStaff} from './eventStaff/Kind10002ReadWriteListConfigStaff';
import {default as LatestEventStaff} from './eventStaff/LatestEventStaff';
import {default as MetadataStaff} from './eventStaff/MetadataStaff';
import {default as ReverseSearchInsertOnObjectListStaff} from './eventStaff/ReverseSearchInsertOnObjectListStaff';
import {default as SearchInsertOnObjectListStaff} from './eventStaff/SearchInsertOnObjectListStaff';
import {default as FilterStopStaff} from './filter/FilterStopStaff';
import {default as AutoAddKind10002UrlStaff} from './globalDiscoveryUser/AutoAddKind10002UrlStaff';
import {default as AutoAddUrlByGlobalDiscoveryUserStaff} from './globalDiscoveryUser/AutoAddUrlByGlobalDiscoveryUserStaff';
import {default as DefaultUrlStaff} from './globalDiscoveryUser/DefaultUrlStaff';
import {default as GlobalDiscoveryUserStaff} from './globalDiscoveryUser/GlobalDiscoveryUserStaff';
import {default as GlobalUrlsStaff} from './globalDiscoveryUser/GlobalUrlsStaff';
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
import {default as ReactiveCreateChildStaff} from './reactive/ReactiveCreateChildStaff';
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
import {default as AddStaff} from './staff/AddStaff';
import {default as EoseAutoUnSubStaff} from './sub/EoseAutoUnSubStaff';
import {default as SubEmitStaff} from './sub/SubEmitStaff';
import {default as SubIdListStaff} from './sub/SubIdListStaff';
import {default as SubStaff} from './sub/SubStaff';
import {default as TimeoutAutoUnSubStaff} from './sub/TimeoutAutoUnSubStaff';
import {default as RelayConfiguratorSynchronizerAddUrlsStaff} from './synchronizer/RelayConfiguratorSynchronizerAddUrlsStaff';
import {default as RelayConfiguratorSynchronizerStaff} from './synchronizer/RelayConfiguratorSynchronizerStaff';
type AddressPointerApiConfigType = StaffConfigType<typeof AddressPointerApi>
type ApiAddUrlsStaffConfigType = StaffConfigType<typeof ApiAddUrlsStaff>
type ChannelMetadataApiStaffConfigType = StaffConfigType<typeof ChannelMetadataApiStaff>
type ContactApiStaffConfigType = StaffConfigType<typeof ContactApiStaff>
type DeletionStaffApiConfigType = StaffConfigType<typeof DeletionStaffApi>
type EventApiStaffConfigType = StaffConfigType<typeof EventApiStaff>
type EventByIdApiStaffConfigType = StaffConfigType<typeof EventByIdApiStaff>
type ReactionStaffConfigType = StaffConfigType<typeof ReactionStaff>
type UserApiStaffConfigType = StaffConfigType<typeof UserApiStaff>
type AddUrlsByCueConfigType = StaffConfigType<typeof AddUrlsByCue>
type AsyncCallStaffConfigType = StaffConfigType<typeof AsyncCallStaff>
type CachedStaffConfigType = StaffConfigType<typeof CachedStaff>
type ConfigStaffConfigType = StaffConfigType<typeof ConfigStaff>
type CreateIdStaffConfigType = StaffConfigType<typeof CreateIdStaff>
type EventCreateAtStaffConfigType = StaffConfigType<typeof EventCreateAtStaff>
type CreateChildEmitStaffConfigType = StaffConfigType<typeof CreateChildEmitStaff>
type CreateChildHookStaffConfigType = StaffConfigType<typeof CreateChildHookStaff>
type CreateHookEmitStaffConfigType = StaffConfigType<typeof CreateHookEmitStaff>
type CreateHookStaffConfigType = StaffConfigType<typeof CreateHookStaff>
type InjectStaffConfigType = StaffConfigType<typeof InjectStaff>
type OwnDateAssignStaffConfigType = StaffConfigType<typeof OwnDateAssignStaff>
type ParentStaffConfigType = StaffConfigType<typeof ParentStaff>
type LoadStaffConfigType = StaffConfigType<typeof LoadStaff>
type LocalMapStaffConfigType = StaffConfigType<typeof LocalMapStaff>
type PauseStaffConfigType = StaffConfigType<typeof PauseStaff>
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
type AutoAddKind10002UrlStaffConfigType = StaffConfigType<typeof AutoAddKind10002UrlStaff>
type AutoAddUrlByGlobalDiscoveryUserStaffConfigType = StaffConfigType<typeof AutoAddUrlByGlobalDiscoveryUserStaff>
type DefaultUrlStaffConfigType = StaffConfigType<typeof DefaultUrlStaff>
type GlobalDiscoveryUserStaffConfigType = StaffConfigType<typeof GlobalDiscoveryUserStaff>
type GlobalUrlsStaffConfigType = StaffConfigType<typeof GlobalUrlsStaff>
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
type ReactiveCreateChildStaffConfigType = StaffConfigType<typeof ReactiveCreateChildStaff>
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
type AddStaffConfigType = StaffConfigType<typeof AddStaff>
type EoseAutoUnSubStaffConfigType = StaffConfigType<typeof EoseAutoUnSubStaff>
type SubEmitStaffConfigType = StaffConfigType<typeof SubEmitStaff>
type SubIdListStaffConfigType = StaffConfigType<typeof SubIdListStaff>
type SubStaffConfigType = StaffConfigType<typeof SubStaff>
type TimeoutAutoUnSubStaffConfigType = StaffConfigType<typeof TimeoutAutoUnSubStaff>
type RelayConfiguratorSynchronizerAddUrlsStaffConfigType = StaffConfigType<typeof RelayConfiguratorSynchronizerAddUrlsStaff>
type RelayConfiguratorSynchronizerStaffConfigType = StaffConfigType<typeof RelayConfiguratorSynchronizerStaff>
export {AddressPointerApi, ApiAddUrlsStaff, ChannelMetadataApiStaff, ContactApiStaff, DeletionStaffApi, EventApiStaff, EventByIdApiStaff, ReactionStaff, UserApiStaff, AddUrlsByCue, AsyncCallStaff, CachedStaff, ConfigStaff, CreateIdStaff, EventCreateAtStaff, CreateChildEmitStaff, CreateChildHookStaff, CreateHookEmitStaff, CreateHookStaff, InjectStaff, OwnDateAssignStaff, ParentStaff, LoadStaff, LocalMapStaff, PauseStaff, DoNotRepeatStaff, EventListStaff, EventStaff, InsertObjectListStaff, Kind10002ReadWriteListConfigStaff, LatestEventStaff, MetadataStaff, ReverseSearchInsertOnObjectListStaff, SearchInsertOnObjectListStaff, FilterStopStaff, AutoAddKind10002UrlStaff, AutoAddUrlByGlobalDiscoveryUserStaff, DefaultUrlStaff, GlobalDiscoveryUserStaff, GlobalUrlsStaff, EventUtilsStaff, LoginStaff, LoginUtilsStaff, NostrApiStaff, NostrModeStaff, AddFilterStaff, AddPublishStaff, AddUrlStaff, FilterStaff, ManagerStaff, PublishedEventListStaff, PublishEmitStaff, PublishStaff, ReactiveCreateChildStaff, ReactiveStaff, AddRelayUrls, AuthStaff, CloseRelayStaff, EoseStaff, NoticeStaff, OkStaff, PoolStaff, RelayEmitterStaff, RelayLifecycleStaff, WebSocketFactoryStaff, AddStaff, EoseAutoUnSubStaff, SubEmitStaff, SubIdListStaff, SubStaff, TimeoutAutoUnSubStaff, RelayConfiguratorSynchronizerAddUrlsStaff, RelayConfiguratorSynchronizerStaff}
export type {AddressPointerApiConfigType, ApiAddUrlsStaffConfigType, ChannelMetadataApiStaffConfigType, ContactApiStaffConfigType, DeletionStaffApiConfigType, EventApiStaffConfigType, EventByIdApiStaffConfigType, ReactionStaffConfigType, UserApiStaffConfigType, AddUrlsByCueConfigType, AsyncCallStaffConfigType, CachedStaffConfigType, ConfigStaffConfigType, CreateIdStaffConfigType, EventCreateAtStaffConfigType, CreateChildEmitStaffConfigType, CreateChildHookStaffConfigType, CreateHookEmitStaffConfigType, CreateHookStaffConfigType, InjectStaffConfigType, OwnDateAssignStaffConfigType, ParentStaffConfigType, LoadStaffConfigType, LocalMapStaffConfigType, PauseStaffConfigType, DoNotRepeatStaffConfigType, EventListStaffConfigType, EventStaffConfigType, InsertObjectListStaffConfigType, Kind10002ReadWriteListConfigStaffConfigType, LatestEventStaffConfigType, MetadataStaffConfigType, ReverseSearchInsertOnObjectListStaffConfigType, SearchInsertOnObjectListStaffConfigType, FilterStopStaffConfigType, AutoAddKind10002UrlStaffConfigType, AutoAddUrlByGlobalDiscoveryUserStaffConfigType, DefaultUrlStaffConfigType, GlobalDiscoveryUserStaffConfigType, GlobalUrlsStaffConfigType, EventUtilsStaffConfigType, LoginStaffConfigType, LoginUtilsStaffConfigType, NostrApiStaffConfigType, NostrModeStaffConfigType, AddFilterStaffConfigType, AddPublishStaffConfigType, AddUrlStaffConfigType, FilterStaffConfigType, ManagerStaffConfigType, PublishedEventListStaffConfigType, PublishEmitStaffConfigType, PublishStaffConfigType, ReactiveCreateChildStaffConfigType, ReactiveStaffConfigType, AddRelayUrlsConfigType, AuthStaffConfigType, CloseRelayStaffConfigType, EoseStaffConfigType, NoticeStaffConfigType, OkStaffConfigType, PoolStaffConfigType, RelayEmitterStaffConfigType, RelayLifecycleStaffConfigType, WebSocketFactoryStaffConfigType, AddStaffConfigType, EoseAutoUnSubStaffConfigType, SubEmitStaffConfigType, SubIdListStaffConfigType, SubStaffConfigType, TimeoutAutoUnSubStaffConfigType, RelayConfiguratorSynchronizerAddUrlsStaffConfigType, RelayConfiguratorSynchronizerStaffConfigType}