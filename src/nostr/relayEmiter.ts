import EventEmitter from "events";
import { Event, Filter } from "nostr-tools";
interface RelayEmiterResponseEventMap {
  eose: {
    url: string;
  };
  ok: { ok: boolean; message: string; url: string };
  notice: { url: string; message: string };
  event: { url: string; event: Event; subId: string };
}
interface RelayEmiterRequestEventMap {
  req: {
    subId: string;
    filters: Filter[];
    url: string;
  };
  closeReq: {
    url: string;
    subId: string;
  };
  publish: {
    event: Event;
    url: string;
  };
  close: { url: string };
}
type ExcludeUndefined<T> = keyof T extends infer K
  ? K extends keyof T
    ? T[K] extends undefined | void
      ? K
      : never
    : never
  : never;

export class RelayEmiter {
  private eventEmiter = new EventEmitter();

  constructor() {
    this.eventEmiter.setMaxListeners(1000);
  }
  emit<E extends keyof RelayEmiterResponseEventMap>(
    type: E,
    subId: string,
    v: RelayEmiterResponseEventMap[E]
  ): void;
  emit<E extends ExcludeUndefined<RelayEmiterResponseEventMap>>(
    type: E,
    subId: string
  ): void;
  emit<E extends keyof RelayEmiterResponseEventMap>(
    type: E,
    subId: any,
    v?: any
  ) {
    this.eventEmiter.emit(this.createEventName(type, subId), v);
  }
  emitEvent(subId: string, opt: RelayEmiterResponseEventMap["event"]) {
    this.eventEmiter.emit("event", opt);
    this.emit("event", subId, opt);
  }
  onEvent(callBack: (v: RelayEmiterResponseEventMap["event"]) => void) {
    this.eventEmiter.on("event", callBack);
  }
  on<E extends keyof RelayEmiterResponseEventMap>(
    type: E,
    subId: string,
    callBack: (v: RelayEmiterResponseEventMap[E]) => void
  ) {
    this.eventEmiter.on(this.createEventName(type, subId), callBack);
  }
  once<E extends keyof RelayEmiterResponseEventMap>(
    type: E,
    subId: string,
    callBack: (v: RelayEmiterResponseEventMap[E]) => void
  ) {
    this.eventEmiter.once(this.createEventName(type, subId), callBack);
  }
  removeListener<E extends keyof RelayEmiterResponseEventMap>(
    type: E,
    subId: string,
    callBack: (v: RelayEmiterResponseEventMap[E]) => void
  ) {
    this.eventEmiter.removeListener(
      this.createEventName(type, subId),
      callBack
    );
  }
  onRequest<E extends keyof RelayEmiterRequestEventMap>(
    type: E,
    callback: (v: RelayEmiterRequestEventMap[E]) => void
  ) {
    this.eventEmiter.on(type, callback);
  }
  emitRequest<E extends keyof RelayEmiterRequestEventMap>(
    type: E,
    v: RelayEmiterRequestEventMap[E]
  ) {
    this.eventEmiter.emit(type, v);
  }
  removeAllListener(subId: string) {
    ["eose", "event", "notice", "ok"].forEach((key) =>
      this.eventEmiter.removeAllListeners(
        this.createEventName(key as any, subId)
      )
    );
  }
  createEventName(type: keyof RelayEmiterResponseEventMap, subId: string) {
    return `${type}:${subId}`;
  }
}
const relayEmiter = new RelayEmiter();

export default relayEmiter;
