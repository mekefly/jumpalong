import { type CahnnelMessageBeltline } from "@/api/channel";
import { type ContactApi } from "@/api/Contact";
import type CreateEventBeltline from "@/api/CreateEventBeltline";
import { type EventApi } from "@/api/event";
import { type GeneralEventEventBeltline } from "@/api/GeneralEventEventBeltline";
import { type LikeApi } from "@/api/like";
import { type LoginApi } from "@/api/login";
import { type NostrConnect } from "@/api/NostrConnect";
import { type PinApi } from "@/api/Pin";
import { type CreateShortTextEventBeltline } from "@/api/shortTextEventBeltline";
import { type UserApi } from "@/api/user";
import { type ContactConfigurationSynchronizer } from "@/nostr/Synchronizer/ContactConfigurationSynchronizer";
import { type NostrConnectedSynchronizer } from "@/nostr/Synchronizer/NostrConnectedSynchronizer";
import { withDefault } from "@/utils/utils";
import { type Container, type interfaces } from "inversify";
import { type InjectionKey } from "vue";
import { type NostrApi } from "../types/NostrApi";
import { AuthenticationOfClientsToRelays } from "./AuthenticationOfClientsToRelays";
import { type EventBeltline } from "./eventBeltline";
import { type IdGenerator } from "./IdGenerator";
import {
  type RelayEmiter,
  type RelayEmiterRequestEventMap,
  type RelayEmiterResponseEventMap,
} from "./RelayEmiter";
import { type RelayPool } from "./server/RelayPool";
import { type AutoRandomRequestStaff } from "./staff/automaticRandomRequestStaff";
import { type FollowChannelSynchronizer } from "./Synchronizer/FollowChannelSynchronizer";
import { type MuteListSynchronizer } from "./Synchronizer/MuteListSynchronizer";
import { type PinListSynchronizer } from "./Synchronizer/PinListSynchronizer";
import { type RelayConfiguratorSynchronizer } from "./Synchronizer/RelayConfiguratorSynchronizer";

const createDefaultConfig = () => {
  const v: ConfigType = {
    getOtherUrlsRequestLimitSize: 50,
    localStorage: { kind10002: 500, duration: 1000 * 60 * 60 * 24 * 7 },
    eventCacheDuration: 1000 * 60 * 20,
    pullRelayConfig: {
      interval: 1000 * 60 * 60 * 24, // 24 hour
      debounce: 1000,
    },
    relayEmiterQueueInterval: 5,
    stopHideLongArticles: false,
    enablePapawTree: false,
    enablePapawTreeLazyMode: true,
    lazyDelayForPapaw: 0,
    priority: {
      close: 11,
      closeReq: 12,
      publish: 10,
      req: 8,
      eose: 18,
      event: 7,
      notice: 0,
      ok: 15,
    },
    syncInterval: 1000 * 60,
    syncInterval1: 1000 * 60 * 5,
    syncInterval2: 1000 * 60 * 15,
    syncInterval3: 1000 * 60 * 45,
    syncInterval4: 1000 * 60 * 60, // 1hour
    syncInterval5: 1000 * 60 * 60 * 3,
    syncInterval6: 1000 * 60 * 60 * 8,
    syncInterval7: 1000 * 60 * 60 * 24,
    syncInterval8: 1000 * 60 * 60 * 24 * 3,
    syncInterval9: 1000 * 60 * 60 * 24 * 7,
    autoPing: true,
  };
  return v;
};

const appConfig = useLocalStorage("app-config", createDefaultConfig, {
  deep: true,
});
const defaultConfig = createDefaultConfig();
//设置默认
withDefault(appConfig.value, defaultConfig);
/**
 * 中继配置器
 */
export let relayConfigurator: RelayConfiguratorSynchronizer = null as any;
export let config: ConfigType = appConfig.value as any as ConfigType;

export let relayEmiter: RelayEmiter = null as any;
export let relayPool: RelayPool = null as any;
export let rootEventBeltline: EventBeltline = null as any;
export let nostrApi: NostrApi = null as any;
export let nostrContainer: Container = null as any;

type ConfigType = {
  getOtherUrlsRequestLimitSize: number;
  eventCacheDuration: number;
  localStorage: {
    kind10002: number;
    duration: number;
  };
  pullRelayConfig: {
    // interval: (1000 * 60 * 60 * 24)
    interval: number;
    debounce: number;
  };
  relayEmiterQueueInterval: number;
  priority: {
    [key in keyof RelayEmiterRequestEventMap]: number;
  } & {
    [key in keyof RelayEmiterResponseEventMap]: number;
  };
  enablePapawTree: boolean;
  enablePapawTreeLazyMode: boolean;
  stopHideLongArticles: boolean;
  lazyDelayForPapaw: number; //0 等于忽略
  syncInterval: number;
  syncInterval1: number;
  syncInterval2: number;
  syncInterval3: number;
  syncInterval4: number;
  syncInterval5: number;
  syncInterval6: number;
  syncInterval7: number;
  syncInterval8: number;
  syncInterval9: number;
  autoPing: boolean;
};

export function injectNostrApi(options: {
  relayEmiter?: RelayEmiter;
  relayPool?: RelayPool;
  rootEventBeltline?: EventBeltline;
  relayConfigurator?: RelayConfiguratorSynchronizer;
  config?: Partial<ConfigType>;
  nostrApi?: NostrApi;
  nostrContainer?: Container;
}) {
  options.relayEmiter && (relayEmiter = options.relayEmiter);
  options.relayPool && (relayPool = options.relayPool);
  options.rootEventBeltline && (rootEventBeltline = options.rootEventBeltline);
  options.relayConfigurator && (relayConfigurator = options.relayConfigurator);
  options.config && Object.assign(config, options.config);
  options.nostrApi && (nostrApi = options.nostrApi);
  options.nostrContainer && (nostrContainer = options.nostrContainer);
}

export const TYPES = {
  NostrContainer: cbk<Container>("NostrContainer"),

  //other
  //  id生成器
  IdGenerator: cbk<IdGenerator>("IdGenerator"),
  AutoRandomRequestStaff: cbk<AutoRandomRequestStaff>("AutoRandomRequestStaff"),
  AuthenticationOfClientsToRelays: cbk<AuthenticationOfClientsToRelays>(
    "AuthenticationOfClientsToRelays"
  ),

  //core
  //  Relay middleware | 中间件，连接层和核心层解耦合
  RelayEmiter: cbk<RelayEmiter>("RelayEmiter"),
  //  Connection pool | 连接池
  RelayPool: cbk<RelayPool>("RelayPool"),
  //  core | 流水线核心
  RootEventBeltline: cbk<EventBeltline>("RootEventBeltline"),
  //  relay配置
  RelayConfiguratorSynchronizer: cbk<RelayConfiguratorSynchronizer>(
    "RelayConfiguratorSynchronizer"
  ),
  //  relay工厂
  RelayConfiguratorFactory: cbk<
    interfaces.Factory<RelayConfiguratorSynchronizer>
  >("RelayConfigurator:Factory"),
  //  login | 登录系统
  NostrApi: cbk<NostrApi>("NostrApi"),
  //  创建事件流水线
  CreateEventBeltline: cbk<CreateEventBeltline>("CreateEventBeltline"),

  //api
  EventApi: cbk<EventApi>("EventApi"),
  LikeApi: cbk<Promise<LikeApi>>("LikeApi"),
  UserApi: cbk<UserApi>("UserApi"),
  CahnnelMessageBeltline: cbk<CahnnelMessageBeltline>("CahnnelMessageBeltline"),
  CreateShortTextEventBeltline: cbk<CreateShortTextEventBeltline>(
    "CreateShortTextEventBeltline"
  ),
  GeneralEventEventBeltline: cbk<GeneralEventEventBeltline>(
    "GeneralEventEventBeltline"
  ),
  NostrConnect: cbk<NostrConnect>("NostrConnect"),
  LoginApi: cbk<LoginApi>("loginApi"),
  ContactApi: cbk<ContactApi>("ContactApi"),
  PinApi: cbk<PinApi>("PinApi"),

  //Synchronizer
  NostrConnectedSynchronizer: cbk<NostrConnectedSynchronizer>(
    "NostrConnectedSynchronizer"
  ),
  ContactConfigurationSynchronizer: cbk<
    Promise<ContactConfigurationSynchronizer>
  >("ContactConfigurationSynchronizer"),
  FollowChannelSynchronizer: cbk<FollowChannelSynchronizer>(
    "FollowChannelSynchronizer"
  ),
  PinListSynchronizer: cbk<Promise<PinListSynchronizer>>("PinListSynchronizer"),
  MuteListSynchronizer: cbk<MuteListSynchronizer>("MuteListSynchronizer"),
};

export type ContainerKey<T> =
  | interfaces.ServiceIdentifier<T>
  | (symbol & InjectionKey<T>);

export function createContainerKey<T>(key: string): ContainerKey<T> {
  return Symbol.for(key);
}
export function cbk<T>(key: string): ContainerKey<T> {
  return createContainerKey(key);
}
