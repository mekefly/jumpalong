import { EventEmitter } from "events";
import {
  Event,
  Filter,
  Relay,
  relayInit,
  SubscriptionOptions,
} from "nostr-tools";
import { ActorSystem } from "../actor/actorSystem";
import { Definition } from "../actor/definition";
import {
  defaultSubEvent,
  failedUrl,
  getDefaultRelay,
  PublishEventOptions,
  relayConfigurator,
  SubEventOptions,
} from "../api/relays";
import { useAsyncCache, useCallbackCache } from "../utils/cache";
import { AsyncReCacheOptions } from "../utils/cache/types";
import { createId, withDefault } from "../utils/utils";
import { PublishRelayTask, rootTask, SubRelayTask } from "./relayTask";

export const relayPool: Record<string, RelayConnect | undefined> = reactive({});
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
    this.realyConnectSystem = (await actorSystem.createChild(RealyConnect, {
      clusterSize: 10,
    })) as any;
  }

  public async publishEvent(event: Event, options: PublishEventOptions = {}) {
    const relayTask = new PublishRelayTask(
      "publish",
      options.relayUrls as any,
      options.describe
    );
    rootTask.addChild(relayTask);

    const { relayUrls, ok: ok, failed } = options;
    Array.from(relayUrls ?? relayConfigurator.getWriteList(), () => {});
    return this.jointRelay(
      relayUrls ?? relayConfigurator.getWriteList(),
      (relayConnect) => {
        return new Promise<void>((resolve, reject) => {
          const id = createId();
          let pub = relayConnect.relay.publish(event);

          taskAdd(relayConnect, id);
          const autoClose = () => taskDelete(relayConnect, id);

          pub.on("ok", () => {
            ok?.();
            resolve();
            autoClose();
            relayTask.okRelasys.add(relayConnect.relay.url);
          });
          pub.on("failed", () => {
            failed?.();
            reject();
            autoClose();
            relayTask.failedRelasys.add(relayConnect.relay.url);
          });
        });
      }
    );
  }

  async sub(
    filters: Filter[],
    opts: SubscriptionOptions & SubEventOptions & AsyncReCacheOptions = {}
  ) {
    // 是否启动缓存
    if (opts.useCache) {
      return useCallbackCache(
        JSON.stringify(filters),
        (opts, filters) => this.toSub(opts, filters),
        {
          duration: opts.cacheDuration,
          ...opts,
        },
        opts,
        filters
      );
    }

    return this.toSub(opts, filters);
  }

  private async toSub(
    opts: SubscriptionOptions & SubEventOptions = defaultSubEvent,
    filters: Filter[]
  ) {
    withDefault(opts, defaultSubEvent);
    const relayTask = new SubRelayTask(
      "sub",
      opts.relayUrls as any,
      opts.describe
    );
    rootTask.addChild(relayTask);

    this.jointRelay(
      opts.relayUrls,
      (relayConnect) => {
        return new Promise<void>((resolve, reject) => {
          const id = createId();
          const autoClose = () => taskDelete(relayConnect, id);
          try {
            let sub = relayConnect.relay.sub(filters, {
              alreadyHaveEvent: (id) =>
                (opts.blockAlreadyHaveEvent ?? false) &&
                relayTask.eventIds.has(id),
            });
            const unsub = () => {
              sub.unsub();
              autoClose();
              subEventEmitter.removeAllListeners(genUnSubId(id));
            };
            relayTask.subIds.push(id);
            taskAdd(relayConnect, id);

            subEventEmitter.once(genUnSubId(id), unsub);

            const context = { fromUrl: relayConnect.relay.url, subId: id };
            sub.on("event", (e: Event) => {
              relayTask.normalRelays.add(relayConnect.relay.url);
              relayTask.eventIds.add(e.id as string);
              opts?.even?.(e, context);
              opts?.evenAutoUnSub && unsub();
              opts?.evenAutoUnSubAll && unSub(relayTask.subIds);
            });
            sub.on("eose", () => {
              relayTask.eoseRelays.add(relayConnect.relay.url);
              opts.eose?.(context);
              resolve();
              opts?.eoseAutoUnSub && unsub();
              opts?.eoseAutoUnSubAll && unSub(relayTask.subIds);
            });
          } catch (error) {
            reject(error);
            autoClose();
          }
        });
      },
      (url) => {
        relayTask.errorRelays.add(url);
      }
    );
    return relayTask.subIds;
  }

  async jointRelay(
    urls: ReadonlySet<string> = getDefaultRelay(),
    callBack: (relay: RelayConnect) => void,
    errorCallBack?: (url: string) => void
  ) {
    return Promise.all(
      Array.from(urls, async (url) => {
        try {
          const relayConnect = await this.realyConnectSystem.send(
            "getRelay",
            url
          );
          await callBack(relayConnect);
        } catch (error) {
          errorCallBack?.(url);
        }
      })
    );
  }
}

interface RelayConnect {
  relay: Relay;
  taskList: Set<string>;
}

function createRelayConnect(relay: Relay): RelayConnect {
  return {
    relay,
    taskList: new Set(),
  };
}
function taskAdd(relayConnect: RelayConnect, id: string) {
  relayConnect.taskList.add(id);
}
function taskDelete(relayConnect: RelayConnect, id: string) {
  relayConnect.taskList.delete(id);

  if (relayConnect.taskList.size === 0) {
    setTimeout(() => {
      if (relayConnect.taskList.size === 0) {
        relayConnect.relay.close();
      }
    }, 5000);
  }
}

class RealyConnect {
  constructor() {}

  async getRelay(url: string): Promise<RelayConnect> {
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

  async _getRelay(url: string): Promise<RelayConnect> {
    const relay = relayInit(url);
    const relayConnect = createRelayConnect(relay);
    relay.on("connect", () => {
      console.log(`连接成功:${url}`);
      relayPool[url] = relayConnect;
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
    return relayConnect;
  }
}
