import { createEventTemplate } from "@/utils/nostr";
import {
  getEventHash,
  getPublicKey,
  nip04,
  signEvent,
  type Event,
  type UnsignedEvent,
} from "nostr-tools";

export interface NostrApi {
  getPublicKey(): Promise<string>;
  getRelays(): Promise<{
    [url: string]: { read: boolean; write: boolean };
  }>;
  signEvent(event: UnsignedEvent): Promise<Event>;
  nip04: Nip04;
}
export interface Nip04 {
  /**
   *
   * @param pubkey  对方的公钥
   * @param plaintext 密文
   */
  encrypt(pubkey: string, plaintext: string): Promise<string>;
  /**
   *
   * @param pubkey 对方的公钥
   * @param ciphertext 明文
   */
  decrypt(pubkey: string, ciphertext: string): Promise<string>;
}
export enum NostrApiMode {
  NotLogin, //0 没有登录
  WindowNostr, //1 window.nostr登录 https://github.com/nostr-protocol/nips/blob/master/07.md
  PrivateKey, //2 私钥登录
  NostrContent, //3 远程登录 https://github.com/nostr-protocol/nips/blob/master/46.md
}
export function getNostrApiMode() {
  const mode = localStorage.getItem("__nostr_api_mode");
  if (mode === String(NostrApiMode.WindowNostr)) {
    return NostrApiMode.WindowNostr;
  } else if (mode === String(NostrApiMode.PrivateKey)) {
    return NostrApiMode.PrivateKey;
  } else if (mode === String(NostrApiMode.NostrContent)) {
    return NostrApiMode.NostrContent;
  } else {
    return NostrApiMode.NotLogin;
  }
}
export function setNostrApiMode(nostrApiMode: NostrApiMode) {
  localStorage.setItem("__nostr_api_mode", String(nostrApiMode));
}

export class PriKeyNostApiImpl implements NostrApi {
  private pubkey?: string;
  public getPrikey: () => string;

  public nip04: Nip04;

  constructor(prikey?: string) {
    this.getPrikey = () => {
      if (!prikey) throw new Error("Not prikey");
      return prikey;
    };
    prikey && (this.pubkey = getPublicKey(prikey));
    this.nip04 = new PriKeyNip04(this.getPrikey);
  }

  public async getPublicKey() {
    if (!this.pubkey) throw new Error("Not pubkey");

    return this.pubkey;
  }
  public async getRelays(): Promise<{
    [url: string]: { read: boolean; write: boolean };
  }> {
    return {};
  }
  public async signEvent(event: Event) {
    let _event: UnsignedEvent & Partial<Event> = Object.assign(
      {
        kind: 1,
        pubkey: this.getPublicKey(),
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: "",
      },
      event
    );

    !_event.id && (_event.id = getEventHash(_event));
    _event.sig = signEvent(event, this.getPrikey());
    return Promise.resolve(_event as Event);
  }
}
class PriKeyNip04 implements Nip04 {
  private getPrikey: () => string;
  constructor(getPrikey: () => string) {
    this.getPrikey = getPrikey;
  }

  public async encrypt(_pubkey: string, plaintext: string) {
    return Promise.resolve(nip04.encrypt(this.getPrikey(), _pubkey, plaintext));
  }
  public async decrypt(_pubkey: string, ciphertext: string) {
    return Promise.resolve(
      nip04.decrypt(this.getPrikey(), _pubkey, ciphertext)
    );
  }
}

export class NostrApiImpl implements NostrApi {
  private getNostrApi: () => Promise<Partial<NostrApi>>;

  public nip04: Nip04;

  constructor(nostrApi?: () => Promise<Partial<NostrApi>>) {
    this.getNostrApi =
      nostrApi ??
      (async () => {
        return {};
      });
    const getNip04: () => Promise<Partial<Nip04>> = async () => {
      return (await this.getNostrApi()).nip04 ?? {};
    };

    this.nip04 = {
      async encrypt(...rest) {
        const nip04 = await getNip04();
        if (!nip04.encrypt) throw new NotFoundError("Not found encrypt");
        return nip04.encrypt(...rest);
      },
      async decrypt(...rest) {
        const nip04 = await getNip04();
        if (!nip04.decrypt) throw new NotFoundError("Not found decrypt");
        return nip04.decrypt(...rest);
      },
    };
  }
  async getPublicKey(): Promise<string> {
    const nostrApi = await this.getNostrApi();
    if (!nostrApi.getPublicKey)
      throw new NotFoundError("Not found getPublicKey");

    return await nostrApi.getPublicKey();
  }
  async getRelays(): Promise<{
    [url: string]: { read: boolean; write: boolean };
  }> {
    const nostrApi = await this.getNostrApi();
    try {
      return nostrApi.getRelays?.() ?? {};
    } catch (error) {
      return {};
    }
  }
  async signEvent(event: Partial<Event>): Promise<Event> {
    const nostrApi = await this.getNostrApi();

    if (!nostrApi.signEvent) throw new NotFoundError("Not found signEvent");
    const cloneEvent = JSON.parse(JSON.stringify(event));

    return nostrApi.signEvent(cloneEvent);
  }
}

export class NotFoundError extends Error {
  constructor(err: string) {
    super(`NotFoundError:${err}`);
  }
}

export const apiNameList = [
  "nostr",
  "getPublicKey",
  "getRelays",
  "signEvent",
  "nip04",
  "nip04.encrypt",
  "nip04.decrypt",
] as const;
export type ApiListType = Array<typeof apiNameList[any]>;

export function testNostr(_withNameApi: ApiListType, nostr: Partial<NostrApi>) {
  if (!nostr) return;

  _withNameApi.push("nostr");

  if (!nostr.getPublicKey) {
    return;
  }

  try {
    nostr.getPublicKey().then((pubkey) => {
      _withNameApi.push("getPublicKey");

      testNip04(nostr.nip04, _withNameApi, pubkey);
      testSignEvent(pubkey, _withNameApi, nostr);
    });
  } catch (error) {}

  if (nostr.getRelays) {
    try {
      nostr.getRelays().then(() => {
        _withNameApi.push("getRelays");
      });
    } catch (error) {}
  }
}
export function testSignEvent(
  pubkey: string,
  _withNameApi: ApiListType,
  nostr: Partial<NostrApi>
) {
  if (nostr.signEvent) {
    try {
      nostr
        .signEvent(
          createEventTemplate({
            kind: 1,
            content: "33",
            pubkey,
          })
        )
        .then(() => {
          _withNameApi.push("signEvent");
        });
    } catch (error) {}
  }
}
async function testNip04(
  nip04: Partial<Nip04> | undefined,
  _withNameApi: ApiListType,
  pubkey: string
) {
  if (!nip04) return;
  try {
    _withNameApi.push("nip04");

    //加密
    if (!nip04.encrypt) {
      return;
    }
    const testText = "test";
    const plaintext = await nip04.encrypt(pubkey, testText);
    _withNameApi.push("nip04.encrypt");

    //解秘
    if (!nip04.decrypt) {
      return;
    }
    const text = await nip04.decrypt(pubkey, plaintext);

    if (text !== testText) {
      return;
    }
    _withNameApi.push("nip04.decrypt");
  } catch (error) {}
}
