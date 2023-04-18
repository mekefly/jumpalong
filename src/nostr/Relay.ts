import {
  validateEvent,
  verifySignature,
  type Event,
  type Filter,
} from "nostr-tools";
import { type RelayEmiter } from "./RelayEmiter";
import { RelayPool } from "./RelayPool";

export class Relay {
  ws: WebSocket;
  pool: RelayPool;
  subIds: Set<string> = new Set();
  private timeout: any = undefined;
  private isClose: boolean = false;
  private relayEmiter: RelayEmiter;
  publishIds: Set<string> = new Set();

  constructor(ws: WebSocket, relayEmiter: RelayEmiter, pool: RelayPool) {
    this.ws = ws;
    this.ws.onmessage = this.handleMessage.bind(this);
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

            if (!validateEvent(event)) {
              console.error("Incomplete event");
              return;
            }
            if (!verifySignature(event)) {
              console.error("Event signature error");
              return;
            }

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

    this.addSubId(subId);
    try {
      this.send(["REQ", subId, ...filters]);
    } catch (error) {
      this.deleteSubId(subId);
    }

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
    }, 60000);
  }

  closeReq(subId: string) {
    if (!this.subIds.has(subId)) return;

    this.deleteSubId(subId);
    this.send(["CLOSE", subId]);
  }

  addSubId(subId: string) {
    if (this.isClose) {
      this.isClose = true;
      this.pool.getPool().set(this.ws.url, this);
    }
    this.subIds.add(subId);
    this.pool.allSubIds.add(subId);
  }
  deleteSubId(subId: string) {
    if (!this.subIds.has(subId)) return;

    this.subIds.delete(subId);
    this.pool.allSubIds.delete(subId);

    this.relayEmiter.removeAllListener(subId);

    this.autoClose();
  }
  close() {
    if (this.isClose) return;
    this.isClose = true;

    for (const subId of this.subIds) {
      this.deleteSubId(subId);
    }
    this.ws.close();
    this.pool.close(this.ws.url);
    this.relayEmiter.emit("close", this.ws.url, { url: this.ws.url });
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
    }, 60000); //60秒没有操作就关闭连接
  }
}
