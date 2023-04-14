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
  signEvent(event: Partial<Event>): Promise<Event>;
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
  NotLogin, //0
  WindowNostr, //1
  PrivateKey, //2
}
export function getNostrApiMode() {
  const mode = localStorage.getItem("__nostr_api_mode");
  if (mode === String(NostrApiMode.WindowNostr)) {
    return NostrApiMode.WindowNostr;
  } else if (mode === String(NostrApiMode.PrivateKey)) {
    return NostrApiMode.PrivateKey;
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
      nip04.encrypt(this.getPrikey(), _pubkey, ciphertext)
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

    return nostrApi.getPublicKey();
  }
  async getRelays(): Promise<{
    [url: string]: { read: boolean; write: boolean };
  }> {
    const nostrApi = await this.getNostrApi();
    try {
      return nostrApi.getRelays?.call(window) ?? {};
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

export class NotFoundError extends Error {}
