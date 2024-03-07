import { EventLine } from "@/nostr/EventLine";

import type PoolStaff from "./PoolStaff";
import { StaffConfigType } from "../Staff";
import { Event, Filter, validateEvent, verifySignature } from "nostr-tools";
import EventStaff from "../EventStaff/EventStaff";
import type NoticeStaff from "./NoticeStaff";
import EoseStaff from "./EoseStaff";
import RelayEmitterStaff from "./RelayEmitterStaff";
import RelayLifecycleStaff from "./RelayLifecycleStaff";

export class Relay {
  ws: WebSocket;
  line: EventLine<
    StaffConfigType<typeof PoolStaff> &
      StaffConfigType<typeof RelayEmitterStaff> &
      StaffConfigType<typeof RelayLifecycleStaff> &
      StaffConfigType<typeof EventStaff>
  >;
  subIds: Set<string> = new Set();
  private timeout: any = undefined;
  private isClose: boolean = false;
  publishIds: Set<string> = new Set();

  constructor(ws: WebSocket, line: EventLine<any>) {
    this.ws = ws;
    this.ws.onmessage = this.handleMessage.bind(this);
    this.line = line;
  }
  handleMessage(ev: MessageEvent<string>) {
    try {
      const data = JSON.parse(ev.data);

      logger.debug("handleMessage", this.ws.url, data);

      let subId = "";
      if (Array.isArray(data)) {
        switch (data[0]) {
          case "EVENT":
            subId = data[1];
            let event = data[2];

            if (!validateEvent(event)) {
              logger.error("Incomplete event");
              return;
            }
            if (!verifySignature(event)) {
              logger.error("Event signature error");
              return;
            }

            this.line.emitEvent(subId, event, this.ws.url);
            break;
          case "NOTICE":
            this.line.emit("notice", [data[1], this.ws.url]);
            break;
          case "EOSE":
            subId = data[1];
            this.line.emit("eose", [subId, this.ws.url]);
            break;
          case "OK":
            let eventId: string = data[1];

            this.line.emit("ok", [
              eventId,
              {
                ok: data[2] as any,
                message: data[3],
                url: this.ws.url,
              },
            ]);
            this.closePublish(eventId);
            break;
          case "AUTH":
            const challenge = data[1];
            this.line.emit("auth", [this.ws.url, challenge]);
            break;
          default:
            break;
        }
      }
    } catch (error) {
      return;
    }
  }
  auth(event: Event) {
    this.send(["AUTH", event]);
  }
  send(v: [string, ...any]) {
    logger.http("send:", v[0], this.ws.url, v);
    (window as any).sendCount++;
    this.ws.send(JSON.stringify(v));
  }
  createSubId() {
    return Math.random().toString().slice(2);
  }
  req(filters: Filter[], subId = this.createSubId()) {
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
      this.line.getPool().set(this.ws.url, this);
    }
    this.subIds.add(subId);
    this.line.allSubIds.add(subId);
  }
  deleteSubId(subId: string) {
    if (!this.subIds.has(subId)) return;

    this.subIds.delete(subId);
    this.line.allSubIds.delete(subId);

    this.line.removeAllListener(`event:${subId}`);

    this.autoClose();
  }
  close() {
    if (this.isClose) return;
    this.isClose = true;

    for (const subId of this.subIds) {
      this.deleteSubId(subId);
    }
    this.ws.close();
    this.line.closeRelay(this.ws.url);
    this.line.emit(`relay-closed:${this.ws.url}`);
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
