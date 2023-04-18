import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { createEvent, createEventByPrikey } from "@/nostr/event";
import { EventBeltline } from "@/nostr/eventBeltline";
import { nostrApi, relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import { Nip04, NostrApi } from "@/nostr/NostrApi";
import { ParameterizedReplaceableEventSyncAbstract } from "@/nostr/ParameterizedReplaceableEventSyncAbstract";
import { createDoNotRepeatStaff, StaffState } from "@/nostr/staff";
import createMaintainSubscription from "@/nostr/staff/createMaintainSubscription";
import createTemporaryUniqueEventStaff from "@/nostr/staff/createTemporaryUniqueEventStaff";
import {
  defaultCacheOptions,
  getCacheOrNull,
  setCache,
  useCache,
} from "@/utils/cache";
import { CacheOptions } from "@/utils/cache/types";
import { getPubkeyOrNull } from "@/utils/nostrApiUse";
import { createId } from "@/utils/utils";
import EventEmitter from "events";
import {
  Event,
  generatePrivateKey,
  getPublicKey,
  nip04,
  UnsignedEvent,
} from "nostr-tools";
import { AddressPointer } from "nostr-tools/lib/nip19";
const kind = 24133;

function getTempPrikey() {
  const prikey = localStorage.getItem("__temp_prikey") ?? generatePrivateKey();
  localStorage.setItem("__temp_prikey", prikey);
  return prikey;
}
export function getTempPubkey() {
  return getPublicKey(getTempPrikey());
}
export type RequestAuthorizationOption = {
  event: Event;
  allow: (duration?: number | undefined) => Promise<void>;
  refuse: (duration?: number | undefined) => Promise<void>;
  requistOpt: Exclude<RequestOption, "result">;
};
const notAskingAnymoreCacheOption: CacheOptions = {
  ...defaultCacheOptions,
};
export function setNotAskingAnymore(
  targetPubkey: string,
  method: Method,
  AuthorizedOrNot: boolean,
  duration: number = 7 * 24 * 3600 * 1000
) {
  setCache(`not_asking:${targetPubkey}:${method}`, AuthorizedOrNot, {
    ...notAskingAnymoreCacheOption,
    duration: duration,
  });
}

export function isNotAskingAnymore(
  targetPubkey: string,
  method: Method
): boolean | null {
  return getCacheOrNull(
    `not_asking:${targetPubkey}:${method}`,
    notAskingAnymoreCacheOption
  );
}
export function createNostrConnectEventLine(opts: { pubkey: string }) {
  const nostrConnectedSynchronizer = getNostrConnectedSynchronizer();

  const cacheKey = `createNostrConnectEventLine:${opts.pubkey}`;
  return useCache(
    cacheKey,
    () => {
      const emiter = new EventEmitter();
      const line = createEventBeltlineReactive()
        .addFilter({
          ["#p"]: [opts.pubkey],
          kinds: [kind],
        })
        .addStaff(createMaintainSubscription())
        .addStaff(createDoNotRepeatStaff())
        .addStaff(createTemporaryUniqueEventStaff(cacheKey))

        .addStaff({
          push(e: Event) {
            //拦截是自己发送的请求
            if (e.pubkey === getTempPubkey()) {
              return StaffState.BREAK;
            }
            async function name() {
              try {
                const content = await nostrApi.nip04.decrypt(
                  e.pubkey,
                  e.content
                );

                //解秘来自对方发送的请求
                const requistOpt: Exclude<RequestOption, "result"> =
                  JSON.parse(content);

                const id: string = (requistOpt as any).id;

                if (
                  !nostrConnectedSynchronizer.hasConnected(e.pubkey) &&
                  requistOpt.method !== "connect"
                ) {
                  return;
                }

                const notAsking = isNotAskingAnymore(
                  e.pubkey,
                  requistOpt.method
                );
                if (notAsking) {
                  allow();
                } else {
                  if (typeof notAsking === "boolean") {
                    refuse();
                    return;
                  } else {
                    //询问用户
                    emiter.emit("requestAuthorization", {
                      allow,
                      refuse,
                      event: e,
                      requistOpt,
                    });
                  }
                }
                async function refuse(duration?: number) {
                  if (duration) {
                    setNotAskingAnymore(
                      e.pubkey,
                      requistOpt.method,
                      false,
                      duration
                    );
                  }
                  const responseResult = {
                    id,
                    error:
                      "refuse:The user has rejected your authorization request",
                  };
                  //内容
                  const content = await nostrApi.nip04.encrypt(
                    e.pubkey,
                    JSON.stringify(responseResult)
                  );

                  //发送
                  line.publish(
                    { kind, content, tags: [["p", e.pubkey]] },
                    new Set()
                  );
                }

                async function allow(duration?: number) {
                  if (duration) {
                    setNotAskingAnymore(
                      e.pubkey,
                      requistOpt.method,
                      true,
                      duration
                    );
                  }
                  //请求的id
                  const id: string = (requistOpt as any).id;
                  let responseResult: any;
                  try {
                    const result = await onRequest({
                      senderPubkey: e.pubkey,
                      ...requistOpt,
                    });

                    responseResult = { id, result };
                  } catch (e) {
                    responseResult = { id, error: e };
                  }

                  //内容
                  const content = await nostrApi.nip04.encrypt(
                    e.pubkey,
                    JSON.stringify(responseResult)
                  );

                  //发送
                  line.publish(
                    { kind, content, tags: [["p", e.pubkey]] },
                    new Set()
                  );
                }
              } catch (error) {}
            }
            name();
          },
          feat: {
            onRequestAuthorization(
              listener: (opt: RequestAuthorizationOption) => void
            ) {
              emiter.on("requestAuthorization", listener);
            },
          },
        })
        .addReadUrl();
      return line;
    },
    {
      useLocalStorage: false,
    }
  );
}
type Pubkey = string;
type Plaintext = string;
type Ciphertext = string;
type RequestOption = //查看当前客户端具有那些权限
  {
    [key in keyof RequestMap]: {
      method: key;
    } & RequestMap[key];
  }[keyof RequestMap] & {};

type Method = keyof RequestMap;
type GetParamsType<METHOD extends Method> = RequestMap[METHOD]["params"];
type CreateOptionType<METHOD extends Method> = {
  method: METHOD;
  params: GetParamsType<METHOD>;
};
type GetResultType<METHOD extends Method> = RequestMap[METHOD]["result"];
type RequestMap = {
  describe: {
    params: [];
    result: Array<RequestOption["method"]>;
  };
  get_public_key: { params: []; result: Pubkey };
  sign_event: { params: [UnsignedEvent]; result: Event };
  connect: { params: [Pubkey]; result: void };
  disconnect: { params: []; result: void };
  delegate: {
    params: [{ kind: number; since: number; until: number }];
    result: { from: string; to: string; cond: string; sig: string };
  };
  get_relays: {
    params: [];
    result: { [url: string]: { read: boolean; write: boolean } };
  };
  nip04_encrypt: {
    params: [Pubkey, Plaintext];
    result: Ciphertext;
  };
  nip04_decrypt: {
    params: [Pubkey, Ciphertext];
    result: Plaintext;
  };
};

const ConnectedTable = ref([]);
type NostrConnectedList = Set<string>;
export function getNostrConnectedSynchronizer() {
  return useCache(
    "getNostrConnectedsynchronizer",
    () => {
      const nostrConnectedsynchronizer = new NostrConnectedSynchronizer();
      nostrConnectedsynchronizer.sync();
      return nostrConnectedsynchronizer;
    },
    { useLocalStorage: false }
  );
}
class NostrConnectedSynchronizer extends ParameterizedReplaceableEventSyncAbstract<NostrConnectedList> {
  constructor() {
    super("NostrConnectedsynchronizer", new Set());
  }
  async getAddressPointers(): Promise<AddressPointer[]> {
    const pubkey = await getPubkeyOrNull();
    if (!pubkey) return [];
    return [
      {
        kind: 30000,
        identifier: "NostrConnectedsynchronizer",
        pubkey,
      },
    ];
  }
  async serializeToData(e: Event): Promise<NostrConnectedList> {
    return new Set(
      e.tags.filter((tag) => tag[0] === "p" && tag[1]).map((tag) => tag[1])
    );
  }
  async deserializeToEvent(
    data: NostrConnectedList,
    changeAt: number
  ): Promise<Event> {
    return await createEvent({
      kind: 30000,
      created_at: changeAt,
      tags: [...Array.from(data, (p) => ["p", p])],
    });
  }

  hasConnected(pubkey: string) {
    return this.getData().has(pubkey);
  }
  connect(pubkey: string) {
    const set = this.getData();
    if (set.has(pubkey)) {
      return;
    }
    set.add(pubkey);
    this.toChanged();
    this.save();
  }
  disConnect(pubkey: string) {
    const set = this.getData();
    if (!set.has(pubkey)) {
      return;
    }
    set.delete(pubkey);
    this.toChanged();
    this.save();
  }
}
type OnRequestOptions<METHOD extends Method> = CreateOptionType<METHOD> & {
  senderPubkey: string;
};
export async function onRequest<METHOD extends Method>(
  opt: OnRequestOptions<METHOD>
): Promise<GetResultType<Method>> {
  const line = rootEventBeltline.createChild();

  const nostrConnectedsynchronizer = getNostrConnectedSynchronizer();
  const method = opt.method;
  if (method === "describe") {
    return [
      "describe",
      "get_public_key",
      "sign_event",
      "connect",
      "disconnect",
      "delegate",
      "get_relays",
      "nip04_encrypt",
      "nip04_decrypt",
    ];
  } else if (method === "get_public_key") {
    return await nostrApi.getPublicKey();
  } else if (method === "sign_event") {
    const _opt: OnRequestOptions<"sign_event"> = opt as any;
    return await nostrApi.signEvent(..._opt.params);
  } else if (method === "connect") {
    await nostrConnectedsynchronizer.connect(opt.senderPubkey);
    return;
  } else if (method === "disconnect") {
    nostrConnectedsynchronizer.disConnect(opt.senderPubkey);
    return;
  } else if (method === "get_relays") {
    return await nostrApi.getRelays();
  } else if (method === "nip04_encrypt") {
    const _opt: OnRequestOptions<"nip04_encrypt"> = opt as any;
    return await nostrApi.nip04.encrypt(..._opt.params);
  } else if (method === "nip04_decrypt") {
    const _opt: OnRequestOptions<"nip04_decrypt"> = opt as any;
    return await nostrApi.nip04.decrypt(..._opt.params);
  } else {
    throw new Error("");
  }
}
export class NostrConnectNostrApiImpl implements NostrApi {
  tempPrikey: string;
  tempPubkey: string;
  pubkey: string;

  line?: EventBeltline<any>;
  emiter: EventEmitter;

  nip04: Nip04;
  constructor(pubkey: string) {
    const slef = this;
    this.pubkey = pubkey;

    this.tempPrikey = getTempPrikey();
    this.tempPubkey = getPublicKey(this.tempPrikey);
    this.emiter = new EventEmitter();

    this.nip04 = {
      async encrypt(...rest) {
        return await slef.request({ method: "nip04_encrypt", params: rest });
      },
      async decrypt(...rest) {
        return await slef.request({ method: "nip04_decrypt", params: rest });
      },
    };
  }
  async connect() {
    return await this.request({ method: "connect", params: [this.pubkey] });
  }
  async disconnect() {
    return await this.request({ method: "disconnect", params: [] });
  }
  listen() {
    const slef = this;
    //监听回应
    return (this.line = createEventBeltlineReactive()
      .addFilter({
        authors: [this.pubkey],
        kinds: [kind],
        ["#p"]: [this.tempPubkey],
      })
      .addStaff(createMaintainSubscription())
      .addStaff({
        push(e) {
          const name = async () => {
            try {
              const resultOpt = JSON.parse(
                await nip04.decrypt(slef.tempPrikey, slef.pubkey, e.content)
              );
              const id = resultOpt.id as string;

              slef.emiter.emit(id, resultOpt);
            } catch (error) {}
          };
          name();
        },
      })
      .addReadUrl());
  }
  getLine() {
    if (this.line) {
      return this.line;
    } else {
      return this.listen();
    }
  }
  async request<METHOD extends Method>(
    opts: CreateOptionType<METHOD>
  ): Promise<GetResultType<METHOD>> {
    return new Promise(async (resolve, reject) => {
      const id = createId();

      const content = JSON.stringify({
        id,
        method: opts.method,
        params: opts.params,
      });
      const encryptContent = await nip04.encrypt(
        //当前客户端的私钥
        this.tempPrikey,
        //要请求的公钥
        this.pubkey,
        //请求体
        content
      );
      const event = createEventByPrikey(
        {
          kind: 24133,
          //当前客户端公钥
          pubkey: this.tempPubkey,
          content: encryptContent,
          tags: [["p", this.pubkey]],
        },
        //使用当前客户端的私钥签名
        this.tempPrikey
      );

      //监听收到回应
      this.emiter.once(id, (opt) => {
        if (!opt) return;
        if (opt.error) {
          reject(opt.error);
        } else {
          resolve(opt.result);
        }
      });

      //发送请求
      await this.getLine().publish(event, relayConfigurator.getWriteList());
    });
  }

  async getPublicKey(): Promise<string> {
    return this.pubkey;
    // return await this.request({ method: "get_public_key", params: [] });
  }
  async getRelays(): Promise<{
    [url: string]: { read: boolean; write: boolean };
  }> {
    return useCache(
      `getRelays:${this.pubkey}`,
      async () => {
        return await this.request({ method: "get_relays", params: [] });
      },
      {
        useLocalStorage: false,
        cacheError: false,
      }
    );
  }
  async signEvent(event: UnsignedEvent): Promise<Event> {
    return await this.request({ method: "sign_event", params: [event] });
  }
}
