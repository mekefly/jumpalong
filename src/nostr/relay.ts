import relayConfigurator from "@/api/relayConfigurator";
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
  SubEventOptions,
} from "../api/relays";
import { useAsyncCache, useCallbackCache } from "../utils/cache";
import { AsyncReCacheOptions } from "../utils/cache/types";
import { withDefault } from "../utils/utils";
import { PublishRelayTask, rootTask, SubRelayTask, taskMap } from "./relayTask";

export const relayPool: Record<string, RelayConnect | undefined> = reactive({});
// const subEventEmitter = new EventEmitter();

export function unSub(id: string | string[]) {
  if (typeof id === "string") {
    id = [id];
  }
  id.forEach((id) => {
    const [taskId, url] = deserializationUnSubId(id);
    const task: SubRelayTask | PublishRelayTask = taskMap.get(taskId) as any;
    if (!task) return;
    if (task.type === "sub") {
      const context = task.subContext.get(url);
      if (!context) return;
      context.sub?.unsub();
      taskDelete(context.relayConnect, id);
    }
  });
}
export function serializeUnSubId(taskId: string, url: string) {
  return JSON.stringify([taskId, url]);
}
export function deserializationUnSubId(id: string): [string, string] {
  try {
    return JSON.parse(id);
  } catch (error) {
    return ["", ""];
  }
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
          const id = serializeUnSubId(relayTask.id, relayConnect.relay.url);
          let pub = relayConnect.relay.publish(event);

          relayTask.pubMap.set(relayConnect.relay.url, pub);

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

  async sub(filters: Filter[], opts: SubOptions = {}) {
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
          const id = serializeUnSubId(relayTask.id, relayConnect.relay.url);
          const autoClose = () => taskDelete(relayConnect, id);
          try {
            const relay = relayConnect.relay;
            let sub = relayConnect.relay.sub(filters, {
              alreadyHaveEvent: (id) =>
                (opts.blockAlreadyHaveEvent ?? false) &&
                relayTask.eventIds.has(id),
            });

            const unsub = () => {
              sub.unsub();
              autoClose();
            };

            relayTask.subContext.set(relay.url, { sub, relayConnect });
            relayTask.subIds.push(id);
            taskAdd(relayConnect, id);

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

export interface RelayConnect {
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

export type SubOptions = SubscriptionOptions &
  SubEventOptions &
  AsyncReCacheOptions;
