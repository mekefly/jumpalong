import { inject, injectable } from "inversify";
import { TYPES } from "./nostr";
import { Relay } from "./Relay";
import { type RelayEmiter } from "./RelayEmiter";
import { createWebsocket } from "./websocket";
const logger = loggerScope;

(window as any).sendCount = 0;
//logger-scope
@injectable()
export class RelayPool {
  private pool!: Map<string, Relay>;

  public allSubIds!: Set<string>;
  constructor(
    @inject(TYPES.RelayEmiter)
    private relayEmiter: RelayEmiter
  ) {
    const seft = reactive(this) as any;

    seft.allSubIds = new Set();
    seft.pool = new Map<string, Relay>();

    seft.listen();

    return seft;
  }
  async listen() {
    this.relayEmiter.onRequest("req", async ({ url, subId, filters }) => {
      const relay = await this.getRelay(url);
      relay.req(filters, subId);
    });
    this.relayEmiter.onRequest("closeReq", async ({ url, subId }) => {
      this.allSubIds.delete(subId);

      const relay = this.getRelayFromPool(url);
      if (!relay) {
        return;
      }
      relay.closeReq(subId);
    });
    this.relayEmiter.onRequest("publish", async ({ url, event }) => {
      const relay = await this.getRelay(url);
      relay.publish(event);
    });
    this.relayEmiter.onRequest("close", async ({ url }) => {
      const relay = this.getRelayFromPool(url);
      if (!relay) {
        return;
      }
      relay.close();
    });
  }

  public getPool() {
    return this.pool;
  }
  public async getRelay(url: string) {
    const relay = this.pool.get(url);
    if (!relay) {
      return await this.createRelayPool(url);
    }
    return relay;
  }
  public getRelayFromPool(url: string) {
    const relay = this.pool.get(url);
    return relay;
  }
  private async createRelayPool(url: string) {
    return new Promise<Relay>(async (res, rej) => {
      const ws = await createWebsocket(url);

      ws.onerror = (e) => {
        this.close(url);
      };
      ws.onclose = () => {
        this.close(url);
      };

      const relay = new Relay(ws, this.relayEmiter, this);
      this.pool.set(url, relay);

      res(relay);
    });
  }
  close(url: string) {
    if (!this.pool.has(url)) return;
    this.getRelayFromPool(url)?.close();
    this.pool.delete(url);
  }
}
