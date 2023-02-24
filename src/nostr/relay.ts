import { EventEmitter } from "events";
import { Filter, Relay, relayInit, SubscriptionOptions } from "nostr-tools";
import { ActorSystem } from "../actor/actorSystem";
import { Definition } from "../actor/definition";
import {
  defaultUrls,
  failedUrl,
  relayConfigurator,
  SubEvent,
} from "../api/relays";
import { useAsyncCache, useCallbackCache } from "../utils/cache";
import { AsyncReCacheOptions } from "../utils/cache/types";

const relayPool: Record<string, Relay | undefined> = reactive({});
const subEventEmitter = new EventEmitter();

export function unSub(id: string | string[]) {
  if (typeof id === "string") {
    id = [id];
  }
  id.forEach((id) => {
    subEventEmitter.emit(genUnSubId(id));
  });
}
export function genUnSubId(id: string) {
  return `unsub:${id}`;
}
export class RelayQuery extends Definition {
  realyConnectSystem!: ActorSystem<RealyConnect>;
  async initialize(actorSystem: ActorSystem<RelayQuery>) {
    this.realyConnectSystem = (await actorSystem.createChild(
      RealyConnect
    )) as any;
  }
  async sub(
    filters: Filter[],
    opts: SubscriptionOptions & SubEvent & AsyncReCacheOptions = {}
  ) {
    // 是否启动缓存
    if (opts.useCache) {
      return useCallbackCache(
        JSON.stringify(filters),
        (opts, filters) => this.toSub(opts, filters),
        {
          duration: opts.cacheDuration,
          ...opts
        },
        opts,
        filters
      );
    }

    return this.toSub(opts, filters);
  }

  private async toSub(
    opts: SubscriptionOptions & SubEvent = {},
    filters: Filter[]
  ) {
    const subIdList: string[] = [];
    await this.jointRelay(opts.relayUrls, (relay) => {
      try {
        let sub = relay.sub(filters);
        const subId = window.crypto.randomUUID();
        subIdList.push(subId);

        subEventEmitter.once(genUnSubId(subId), () => {
          sub.unsub();
        });

        const context = { fromUrl: relay.url, subId };
        opts.even &&
          sub.on("event", (e: Event) => opts.even?.(e as any, context));
        opts.eose && sub.on("eose", (e: Event) => opts.eose?.(context));
      } catch (error) {}
    });
    return subIdList;
  }

  async jointRelay(
    urls: ReadonlySet<string> = relayConfigurator.getReadList().size
      ? relayConfigurator.getReadList()
      : new Set(defaultUrls),
    callBack: (relay: Relay) => void
  ) {
    return Promise.all(
      Array.from(urls, async (url) => {
        try {
          const relay = await this.realyConnectSystem.send("getRelay", url);
          callBack(relay);
        } catch (error) {}
      })
    );
  }
}

class RealyConnect {
  constructor() {}

  async getRelay(url: string): Promise<Relay> {
    if (failedUrl.has(url)) {
      throw new Error("之前已出错");
    }
    let relay = relayPool[url];
    if (!!relay) {
      return relay;
    }

    return useAsyncCache(
      url,
      this._getRelay,
      {
        useLocalStorage: false,
        useMemoryCache: true,
        requestMerge: true,
        cacheError: true,
        duration: 10000,
      },
      url
    );
  }

  async _getRelay(url: string): Promise<Relay> {
    const relay = relayInit(url);
    relay.on("connect", () => {
      console.log(`连接成功:${url}`);
      relayPool[url] = relay;
    });
    relay.on("error", () => {
      relayPool[url] = undefined;
      delete relayPool[url];
      console.error("连接出错:", url);
      failedUrl.add(url);
    });
    relay.on("disconnect", () => {
      console.log(`关闭连接:${url}`);
      relayPool[url] = undefined;
      delete relayPool[url];
    });

    await relay.connect();
    return relay;
  }
}
