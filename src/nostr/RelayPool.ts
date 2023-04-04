import { createTaskQueue } from "@/utils/utils";
import {
  validateEvent,
  verifySignature,
  type Event,
  type Filter,
} from "nostr-tools";
import { relayEmiter } from "./nostr";
import { type RelayEmiter } from "./RelayEmiter";
import { createWebsocket } from "./websocket";
(window as any).sendCount = 0;
export class RelayPool {
  private pool!: Map<string, Relay>;
  private relayEmiter!: RelayEmiter;
  public allSubIds!: Set<string>;
  constructor(
    relayEmiter: RelayEmiter,
    opt?: {
      self?: any;
    }
  ) {
    const seft = opt?.self ?? {};
    seft.__proto__ = (this as any).__proto__;

    seft.relayEmiter = relayEmiter;
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
        this.pool.get(url)?.close();
        this.pool.delete(url);
        this.getRelayFromPool(url)?.close();
      };
      ws.onclose = () => {
        this.close(url);
      };

      const relay = new Relay(ws, relayEmiter, this);
      this.pool.set(url, relay);

      res(relay);
    });
  }
  close(url: string) {
    this.getRelayFromPool(url)?.close();
    this.pool.delete(url);
  }
}

export class Relay {
  [x: string]: any;
  ws: WebSocket;
  pool: RelayPool;
  subIds: Set<string> = new Set();
  private timeout: any = undefined;
  private isClose: boolean = false;
  private relayEmiter: RelayEmiter;
  publishIds: Set<string> = new Set();

  constructor(ws: WebSocket, relayEmiter: RelayEmiter, pool: RelayPool) {
    const taskQueue = createTaskQueue();
    this.taskQueue = taskQueue;
    this.ws = ws;
    this.ws.onmessage = (messageEvent) => {
      taskQueue.unShift(() => {
        this.handleMessage(messageEvent);
      });
    };
    this.relayEmiter = relayEmiter;
    this.pool = pool;
  }
  handleMessage(ev: MessageEvent<string>) {
    try {
      const data = JSON.parse(ev.data);
      console.debug(this.ws.url, data);
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
            this.closePublish(eventId);
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
    (window as any).sendCount++;
    this.ws.send(JSON.stringify(v));
  }
  createSubId() {
    return Math.random().toString().slice(2);
  }
  req(filters: Filter[], subId = this.createSubId()) {
    console.debug("websocket:req:", filters, this.ws.url);

    this.send(["REQ", subId, ...filters]);

    this.addSubId(subId);
    return subId;
  }
  closePublish(id: string) {
    if (!this.publishIds.has(id)) return;

    this.publishIds.delete(id);
    this.autoClose();
  }
  publish(e: Event) {
    console.debug("websocket:publish", this.ws.url, e);
    this.send(["EVENT", e]);
    this.publishIds.add(e.id);

    //超时
    setTimeout(() => {
      this.closePublish(e.id);
    }, 60_000);
  }

  closeReq(subId: string) {
    if (!this.subIds.has(subId)) return;

    this.send(["CLOSE", subId]);
    this.deleteSubId(subId);
  }

  addSubId(subId: string) {
    this.subIds.add(subId);
    this.pool.allSubIds.add(subId);

    this.clearAutoClose();
  }
  deleteSubId(subId: string) {
    this.subIds.delete(subId);
    this.pool.allSubIds.delete(subId);

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
    this.pool.close(this.ws.url);
  }
  clearAutoClose() {
    clearTimeout(this.timeout);
    this.timeout = undefined;
  }
  autoClose() {
    if (this.subIds.size > 0 || this.publishIds.size > 0) return;
    this.timeout = setTimeout(() => {
      if (this.subIds.size > 0 || this.publishIds.size > 0) return;
      this.close();
    }, 60_000); //60秒没有操作就关闭连接
  }
}
