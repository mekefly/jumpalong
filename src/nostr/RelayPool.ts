import { Event, Filter, validateEvent, verifySignature } from "nostr-tools";
import relayEmiter, { RelayEmiter } from "./RelayEmiter";
import { createWebsocket } from "./websocket";

export class RelayPool {
  private pool = new Map<string, Relay>();
  private relayEmiter: RelayEmiter;
  constructor(relayEmiter: RelayEmiter) {
    this.relayEmiter = relayEmiter;

    this.listen();
  }
  async listen() {
    this.relayEmiter.onRequest("req", async ({ url, subId, filters }) => {
      const relay = await this.getRelay(url);
      relay.req(filters, subId);
    });
    this.relayEmiter.onRequest("closeReq", async ({ url, subId }) => {
      const relay = await this.getRelay(url);
      relay.closeReq(subId);
    });
    this.relayEmiter.onRequest("publish", async ({ url, event }) => {
      const relay = await this.getRelay(url);
      relay.publish(event);
    });
    this.relayEmiter.onRequest("close", async ({ url }) => {
      const relay = await this.getRelay(url);
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
        this.pool.get(url)?.close();
        this.pool.delete(url);
      };
      ws.onclose = () => {
        this.pool.delete(url);
      };

      const relay = new Relay(ws, relayEmiter);
      this.pool.set(url, relay);

      res(relay);
    });
  }
}

export class Relay {
  ws: WebSocket;
  subIds: Set<string> = new Set();
  private timeout: any = undefined;
  private isClose: boolean = false;
  private relayEmiter: RelayEmiter;

  constructor(ws: WebSocket, relayEmiter: RelayEmiter) {
    this.ws = ws;
    this.ws.onmessage = this.handleMessage.bind(this);
    this.relayEmiter = relayEmiter;
  }
  handleMessage(ev: MessageEvent<string>) {
    try {
      const data = JSON.parse(ev.data);
      console.log(data);
      logger.for("Relay:onMessage:data").debug(data);

      let subId = "";
      if (Array.isArray(data)) {
        switch (data[0]) {
          case "EVENT":
            subId = data[1];
            let event = data[2];

            if (!validateEvent(event)) return;
            if (!verifySignature(event)) return;

            this.relayEmiter.emitEvent(subId, {
              url: this.ws.url,
              event,
              subId,
            });
            break;
          case "NOTICE":
            this.relayEmiter.emit("notice", subId, {
              message: data[1],
              url: this.ws.url,
            });
            break;
          case "EOSE":
            subId = data[1];
            this.relayEmiter.emit("eose", subId, {
              url: this.ws.url,
            });
            break;
          case "OK":
            let eventId: string = data[1];

            this.relayEmiter.emit("ok", eventId, {
              ok: data[2] as any,
              message: data[3],
              url: this.ws.url,
            });
            break;
          case "AUTH":
            break;
          default:
            break;
        }
      }
    } catch (error) {
      return;
    }
  }
  send(v: [string, ...any]) {
    (window as any).reqCount++;
    this.ws.send(JSON.stringify(v));
  }
  createSubId() {
    return Math.random().toString().slice(2);
  }
  req(filters: Filter[], subId = this.createSubId()) {
    console.log("websocket:req:", filters, this.ws.url);

    this.send(["REQ", subId, ...filters]);

    this.addSubId(subId);
    return subId;
  }
  publish(e: Event) {
    this.send(["EVENT", e]);
  }
  closeReq(subId: string) {
    if (!this.subIds.has(subId)) return;

    this.send(["CLOSE", subId]);
    this.deleteSubId(subId);
  }

  addSubId(subId: string) {
    this.subIds.add(subId);
    this.subIds.add(subId);

    this.clearAutoClose();
  }
  deleteSubId(subId: string) {
    this.subIds.delete(subId);
    this.subIds.delete(subId);
    this.relayEmiter.removeAllListener(subId);

    this.autoClose();
  }
  close() {
    if (this.isClose) return;

    for (const subId of this.subIds) {
      this.deleteSubId(subId);
    }
    this.isClose = true;
    this.ws.close();
  }
  clearAutoClose() {
    clearTimeout(this.timeout);
    this.timeout = undefined;
  }
  autoClose() {
    if (this.subIds.size !== 0) return;
    this.timeout = setTimeout(() => {
      if (this.subIds.size !== 0) return;
      this.close();
    }, 10_000);
  }
}
