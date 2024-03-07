import { type Event } from "nostr-tools";
import { Nip04 } from "../../types/Nip04";
import { NostrApi } from "../../types/NostrApi";
import { NotFoundNostrApiError } from "./error";

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
        if (!nip04.encrypt)
          throw new NotFoundNostrApiError("Not found encrypt");
        return nip04.encrypt(...rest);
      },
      async decrypt(...rest) {
        const nip04 = await getNip04();
        if (!nip04.decrypt)
          throw new NotFoundNostrApiError("Not found decrypt");
        return nip04.decrypt(...rest);
      },
    };
  }
  async getPublicKey(): Promise<string> {
    const nostrApi = await this.getNostrApi();
    if (!nostrApi.getPublicKey)
      throw new NotFoundNostrApiError("Not found getPublicKey");

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

    if (!nostrApi.signEvent)
      throw new NotFoundNostrApiError("Not found signEvent");
    const cloneEvent = JSON.parse(JSON.stringify(event));

    return nostrApi.signEvent(cloneEvent);
  }
}
