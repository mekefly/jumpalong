import DefineSubEventStaff from "../../../src/staff/staffs/sub/DefineSubEventStaff";
import { createStaff } from "../Staff";
import WebSocketStaff from "./WebSocketFactoryStaff";
import { Relay } from "./Relay";
import DefinePublishEventStaff from "../EventStaff/publish/DefinePublishEventStaff";
import CloseRelayStaff from "./CloseRelayStaff";
import AuthStaff from "./AuthStaff";

export default createStaff(
  WebSocketStaff,
  AuthStaff,
  CloseRelayStaff,
  DefineSubEventStaff,
  DefinePublishEventStaff,
  (line) => {
    let l = line.assignFeat({
      pool: new Map<string, Relay>(),
      allSubIds: new Set(),
      async listen() {
        this.on("sub", async (subId, url, filters) => {
          const relay = await this.getRelay(url);
          relay.req(filters, subId);
        });
        this.on("desub", async (subId, url) => {
          this.allSubIds.delete(subId);

          const relay = this.getRelayFromPool(url);
          if (!relay) {
            return;
          }
          relay.closeReq(subId);
        });
        this.on("publish", async (url, event) => {
          const relay = await this.getRelay(url);
          relay.publish(event);
        });
        this.on("closeRelay", async (url) => {
          const relay = this.getRelayFromPool(url);
          if (!relay) {
            return;
          }
          relay.close();
        });
        this.on("auth", async (url, event) => {
          const relay = await this.getRelay(url);
          relay.auth(event);
        });
      },
      getPool() {
        return this.pool;
      },
      async getRelay(url: string) {
        const relay = this.pool.get(url);
        if (!relay) {
          return await this.createRelay(url);
        }
        return relay;
      },
      getRelayFromPool(url: string) {
        const relay = this.pool.get(url);
        return relay;
      },
      closeRelay(url: string) {
        if (!this.pool.has(url)) return;
        this.getRelayFromPool(url)?.close();
        this.pool.delete(url);
      },
      async createRelay(url: string) {
        return new Promise<Relay>(async (res, rej) => {
          const ws = await this.webSocketFactory(url);

          ws.onerror = ws.onclose = () => {
            this.closeRelay(url);
          };

          const relay = new Relay(ws, this);
          this.pool.set(url, relay);

          res(relay);
        });
      },
    });
    l.out().listen()
    return l
  }
);
