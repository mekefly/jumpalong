import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { createEventByPrikey } from "@/nostr/event";
import { EventBeltline } from "@/nostr/eventBeltline";
import { TYPES, relayConfigurator } from "@/nostr/nostr";
import { Nip04, NostrApi } from "@/nostr/nostrApi/NostrApi";
import createMaintainSubscription from "@/nostr/staff/createMaintainSubscription";
import { useCache } from "@/utils/cache";
import { createId } from "@/utils/utils";
import EventEmitter from "events";
import { inject, injectable } from "inversify";
import { Event, UnsignedEvent, getPublicKey, nip04 } from "nostr-tools";
import CreateEventBeltline from "../../api/CreateEventBeltline";
import {
  CreateOptionType,
  GetResultType,
  Method,
  getTempPrikey,
  kind,
} from "../../api/NostrConnect";

@injectable()
export class NostrConnectNostrApiImpl implements NostrApi {
  tempPrikey: string;
  tempPubkey: string;
  pubkey: string;

  line?: EventBeltline<any>;
  emiter: EventEmitter;

  nip04: Nip04;

  @inject(TYPES.CreateEventBeltline)
  createEventBeltline!: CreateEventBeltline;
  constructor(pubkey: string) {
    logger.debug("NostrConnectNostrApiImpl", this);
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
          kind: kind,
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
