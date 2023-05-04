import { EventBeltline } from "@/nostr/eventBeltline";
import { nostrApi, rootEventBeltline, TYPES } from "@/nostr/nostr";
import {
  createDoNotRepeatStaff,
  createStaffFactory,
  StaffState,
} from "@/nostr/staff";
import createMaintainSubscription from "@/nostr/staff/createMaintainSubscription";
import createTemporaryUniqueEventStaff from "@/nostr/staff/createTemporaryUniqueEventStaff";
import {
  defaultCacheOptions,
  getCacheOrNull,
  setCache,
  useCache,
} from "@/utils/cache";
import { CacheOptions } from "@/utils/cache/types";
import EventEmitter from "events";
import { inject, injectable } from "inversify";
import {
  Event,
  generatePrivateKey,
  getPublicKey,
  UnsignedEvent,
} from "nostr-tools";
import { NostrConnectedSynchronizer } from "../nostr/Synchronizer/NostrConnectedSynchronizer";
import CreateEventBeltline from "./CreateEventBeltline";
export const kind = 24133 as any;
export const CategorizedPeopleListKind = 30000 as any;

@injectable()
export class NostrConnect {
  constructor(
    @inject(TYPES.RootEventBeltline)
    private rootEventBeltline: EventBeltline,
    @inject(TYPES.CreateEventBeltline)
    private createEventBeltline: CreateEventBeltline,
    @inject(TYPES.NostrConnectedSynchronizer)
    private nostrConnectedSynchronizer: NostrConnectedSynchronizer
  ) {}
  emiter: EventEmitter = new EventEmitter();
  createNostrConnectEventLine(opts: { pubkey: string }) {
    const cacheKey = `createNostrConnectEventLine:${opts.pubkey}`;
    return useCache(
      cacheKey,
      () => {
        const line = this.createEventBeltline
          .createEventBeltlineReactive()
          .addFilter({
            ["#p"]: [opts.pubkey],
            kinds: [kind],
          })
          .addStaff(createMaintainSubscription())
          .addStaff(createDoNotRepeatStaff())
          .addStaff(createTemporaryUniqueEventStaff(cacheKey))

          .addStaff(this.cleateNostrConnectStaff())
          .addReadUrl();
        return line;
      },
      {
        useLocalStorage: false,
      }
    );
  }
  private cleateNostrConnectStaff() {
    const slef = this;
    return createStaffFactory()(() => {
      return {
        push(e: Event) {
          //拦截是自己发送的请求
          if (e.pubkey === getTempPubkey()) {
            return StaffState.BREAK;
          }
          slef.toPush(e, this.beltline);
        },
        feat: {
          onRequestAuthorization(
            listener: (opt: RequestAuthorizationOption) => void
          ) {
            slef.emiter.on("requestAuthorization", listener);
          },
        },
      };
    })();
  }

  private async toPush(event: Event, line: EventBeltline) {
    try {
      const content = await nostrApi.nip04.decrypt(event.pubkey, event.content);

      //解秘来自对方发送的请求
      const requistOpt: Exclude<RequestOption, "result"> = JSON.parse(content);

      const id: string = (requistOpt as any).id;

      if (
        !this.nostrConnectedSynchronizer.hasConnected(event.pubkey) &&
        requistOpt.method !== "connect"
      ) {
        return;
      }

      const notAsking = isNotAskingAnymore(event.pubkey, requistOpt.method);
      if (notAsking) {
        this.allow(event, id, requistOpt, line);
      } else {
        if (typeof notAsking === "boolean") {
          this.refuse(event, id, requistOpt, line);
          return;
        } else {
          //询问用户
          this.emiter.emit("requestAuthorization", {
            allow: (duration?: number) =>
              this.allow(event, id, requistOpt, line, duration),
            refuse: (duration?: number) =>
              this.refuse(event, id, requistOpt, line, duration),
            event: event,
            requistOpt,
          });
        }
      }
    } catch (error) {}
  }
  private async refuse(
    event: Event,
    id: string,
    requistOpt: RequestOption,
    line: EventBeltline,
    duration?: number
  ) {
    if (duration) {
      setNotAskingAnymore(event.pubkey, requistOpt.method, false, duration);
    }
    const responseResult = {
      id,
      error: "refuse:The user has rejected your authorization request",
    };
    //内容
    const content = await nostrApi.nip04.encrypt(
      event.pubkey,
      JSON.stringify(responseResult)
    );

    //发送
    line.publish(
      //@ts-ignore
      { kind, content, tags: [["p", event.pubkey]] },
      new Set()
    );
  }
  private async allow(
    event: Event,
    id: string,
    requistOpt: RequestOption,
    line: EventBeltline,
    duration?: number
  ) {
    if (duration) {
      setNotAskingAnymore(event.pubkey, requistOpt.method, true, duration);
    }
    //请求的id
    let responseResult: any;
    try {
      const result = await this.onRequest({
        senderPubkey: event.pubkey,
        ...requistOpt,
      });

      responseResult = { id, result };
    } catch (e) {
      responseResult = { id, error: e };
    }

    //内容
    const content = await nostrApi.nip04.encrypt(
      event.pubkey,
      JSON.stringify(responseResult)
    );

    //发送
    line.publish(
      { kind: kind as any, content, tags: [["p", event.pubkey]] },
      new Set()
    );
  }

  private async onRequest<METHOD extends Method>(
    opt: OnRequestOptions<METHOD>
  ): Promise<GetResultType<Method>> {
    const line = rootEventBeltline.createChild();

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
      await this.nostrConnectedSynchronizer.connect(opt.senderPubkey);
      return;
    } else if (method === "disconnect") {
      this.nostrConnectedSynchronizer.disConnect(opt.senderPubkey);
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
}

export function getTempPrikey() {
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
type Pubkey = string;
type Plaintext = string;
type Ciphertext = string;
type RequestOption = //查看当前客户端具有那些权限
  {
    [key in keyof RequestMap]: {
      method: key;
    } & RequestMap[key];
  }[keyof RequestMap] & {};

export type Method = keyof RequestMap;
type GetParamsType<METHOD extends Method> = RequestMap[METHOD]["params"];
export type CreateOptionType<METHOD extends Method> = {
  method: METHOD;
  params: GetParamsType<METHOD>;
};
export type GetResultType<METHOD extends Method> = RequestMap[METHOD]["result"];
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
export type NostrConnectedList = Set<string>;
type OnRequestOptions<METHOD extends Method> = CreateOptionType<METHOD> & {
  senderPubkey: string;
};
