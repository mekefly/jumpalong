import { type ContactConfiguration } from "@/api/Contact";
import type CreateEventBeltline from "@/api/CreateEventBeltline";
import { GeneralEventEventBeltline } from "@/api/GeneralEventEventBeltline";
import { type NostrConnect } from "@/api/NostrConnect";
import { type CahnnelMessageBeltline } from "@/api/channel";
import { type EventApi } from "@/api/event";
import { type LikeApi } from "@/api/like";
import { LoginApi } from "@/api/login";
import { type CreatePinEventLine } from "@/api/pin";
import { type CreateShortTextEventBeltline } from "@/api/shortTextEventBeltline";
import { type UserApi } from "@/api/user";
import { NostrConnectedSynchronizer } from "@/nostr/Synchronizer/NostrConnectedSynchronizer";
import {
  type RelayEmiterRequestEventMap,
  type RelayEmiterResponseEventMap,
} from "@/nostr/relayEmiter";
import { withDefault } from "@/utils/utils";
import { type Container, type interfaces } from "inversify";
import { type InjectionKey } from "vue";
import { type FollowChannel } from "./FollowChannel";
import { type IdGenerator } from "./IdGenerator";
import { type RelayEmiter } from "./RelayEmiter";
import { type RelayPool } from "./RelayPool";
import { type RelayConfigurator } from "./Synchronizer/relayConfigurator";
import { type EventBeltline } from "./eventBeltline";
import { type NostrApi } from "./nostrApi/NostrApi";

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
export let relayConfigurator: RelayConfigurator = null as any;
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
  relayConfigurator?: RelayConfigurator;
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
  //core
  NostrContainer: Symbol.for("NostrContainer") as ContainerKey<Container>,

  //Relay middleware | 中间件，连接层和核心层解耦合
  RelayEmiter: Symbol.for("RelayEmiter") as ContainerKey<RelayEmiter>,
  //Connection pool | 连接池
  RelayPool: Symbol.for("RelayPool") as ContainerKey<RelayPool>,
  //流水线核心
  RootEventBeltline: Symbol.for(
    "RootEventBeltline"
  ) as ContainerKey<EventBeltline>,
  //relay配置
  RelayConfigurator: Symbol.for(
    "RelayConfigurator"
  ) as ContainerKey<RelayConfigurator>,
  //relay工厂
  RelayConfiguratorFactory: Symbol.for(
    "RelayConfigurator:Factory"
  ) as ContainerKey<interfaces.Factory<RelayConfigurator>>,
  //login | 登录系统
  NostrApi: Symbol.for("NostrApi") as ContainerKey<NostrApi>,

  //other
  //id生成器
  IdGenerator: Symbol.for("IdGenerator") as ContainerKey<IdGenerator>,

  //api
  EventApi: Symbol.for("EventApi") as ContainerKey<EventApi>,
  LikeApi: Symbol.for("LikeApi") as ContainerKey<LikeApi>,
  UserApi: cbk<UserApi>("UserApi"),
  CreateEventBeltline: cbk<CreateEventBeltline>("CreateEventBeltline"),
  CahnnelMessageBeltline: cbk<CahnnelMessageBeltline>("CahnnelMessageBeltline"),
  CreateShortTextEventBeltline: cbk<CreateShortTextEventBeltline>(
    "CreateShortTextEventBeltline"
  ),
  GeneralEventEventBeltline: cbk<GeneralEventEventBeltline>(
    "GeneralEventEventBeltline"
  ),
  NostrConnect: cbk<NostrConnect>("NostrConnect"),
  NostrConnectedSynchronizer: cbk<NostrConnectedSynchronizer>(
    "NostrConnectedSynchronizer"
  ),
  LoginApi: cbk<LoginApi>("loginApi"),

  //Synchronizer
  ContactConfiguration: cbk<ContactConfiguration>("ContactConfiguration"),
  FollowChannel: cbk<FollowChannel>("FollowChannel"),
  CreatePinEventLine: cbk<CreatePinEventLine>("CreatePinEventLine"),
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
