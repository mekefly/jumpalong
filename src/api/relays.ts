import { createEvent } from "@/nostr/event";
import { relayInit, type Event, type Relay } from "nostr-tools";
import { reactive } from "vue";
// import { relayQuery } from "../nostr";
import { relayConfigurator } from "../nostr/nostr";
import { defaultUrls } from "../nostr/relayConfigurator";
import { userKey } from "../nostr/user";
import { useAsyncCache } from "../utils/cache";
import { type CallBackT } from "../utils/types";
import { publishEvent } from "./event";

/**
 * 连接池
 */
export const relayPool: Record<string, Relay | undefined> = reactive({});

/**
 * 出错连接
 */
export const failedUrl = reactive(new Set<string>([]));

async function getRelay(url: string): Promise<Relay> {
  if (failedUrl.has(url)) {
    throw new Error("之前已出错");
  }
  let relay = relayPool[url];
  if (!!relay) {
    return relay;
  }

  return useAsyncCache(
    url,
    _getRelay,
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

async function _getRelay(url: string): Promise<Relay> {
  const relay = relayInit(url);
  relay.on("connect", () => {
    console.log(`连接成功:${url}`);
    relayPool[url] = relay;
  });
  relay.on("error", () => {
    relayPool[url] = undefined;
    delete relayPool[url];
    console.log("连接出错:", url);
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

export async function jointRelay(
  urls: ReadonlySet<string> = relayConfigurator.getReadList().size
    ? relayConfigurator.getReadList()
    : new Set(defaultUrls),
  callBack: (relay: Relay) => void
) {
  await Array.from(urls, async (url) => {
    if (!url) {
      return;
    }
    try {
      const relay = await getRelay(url);
      callBack(relay);
    } catch (error) {}
  });
}

export function getRecommendRelay(even: CallBackT<Event>) {
  jointRelay(undefined, (relay) => {
    let sub = relay.sub([
      {
        kinds: [2],
        authors: [userKey.value.publicKey],
      },
    ]);

    sub.on("event", even);
  });
}

// export async function getRelayListMetadataByPubkey(pubkey: string) {
//   return new Promise<[Set<string>, Set<string>]>(async (resolve, reject) => {
//     const subIdList = await (
//       await relayQuery
//     ).send("sub", [{ kinds: [10002], authors: [pubkey] }], {
//       describe: "获取用户的中继配置信息",
//       useCache: true,
//       even(e, { subId }) {
//         resolve(generateReadWriteList(e));
//         unSub(subIdList);
//       },
//       eose({ subId }) {
//         unSub(subId);
//       },
//     });
//   });
// }

export function sendRelayListMetadata(urls: string[]) {
  const event = createEvent({
    kind: 10002,
    tags: urls.map((url) => ["r", url, "read"]),
  });

  publishEvent(event);
}

type Context = { subId: string; fromUrl: string };
export interface TaskEventOptions {
  describe?: string;
}
export interface SubEventOptions extends TaskEventOptions {
  even?: (event: Event, context: Context) => void;
  eose?: (context: Context) => void;
  relayUrls?: ReadonlySet<string>;
  useCache?: boolean;
  cacheDuration?: number;
  eoseAutoUnSub?: boolean;
  evenAutoUnSub?: boolean;
  eoseAutoUnSubAll?: boolean;
  evenAutoUnSubAll?: boolean;
  blockAlreadyHaveEvent?: boolean;
}
export interface PublishEventOptions extends TaskEventOptions {
  relayUrls?: Set<string>;
  ok?: CallBackT<void>;
  failed?: CallBackT<void>;
}
// export async function sub(
//   filters: Filter[],
//   opts: SubscriptionOptions & SubEventOptions = {}
// ) {
//   return await (await relayQuery).send("sub", filters, opts);
// }

export function getDefaultRelay() {
  return relayConfigurator.getReadList().size
    ? relayConfigurator.getReadList()
    : new Set(defaultUrls);
}

export const defaultSubEvent: SubEventOptions = {
  eoseAutoUnSub: true,
  blockAlreadyHaveEvent: true,
  relayUrls: new Set(),
};
