import {
  RelayEmiterResponseEventMap,
  type RelayEmiterRequestEventMap,
} from "@/nostr/relayEmiter";
import { withDefault } from "@/utils/utils";
import { type EventBeltline } from "./eventBeltline";
import { NostrApi, NostrApiImpl } from "./NostrApi";
import { type RelayConfigurator } from "./relayConfigurator";
import { type RelayEmiter } from "./RelayEmiter";
import { type RelayPool } from "./RelayPool";
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
export let nostrApi: NostrApi = new NostrApiImpl();

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
}) {
  options.relayEmiter && (relayEmiter = options.relayEmiter);
  options.relayPool && (relayPool = options.relayPool);
  options.rootEventBeltline && (rootEventBeltline = options.rootEventBeltline);
  options.relayConfigurator && (relayConfigurator = options.relayConfigurator);
  options.config && Object.assign(config, options.config);
  options.nostrApi && (nostrApi = options.nostrApi);
}
