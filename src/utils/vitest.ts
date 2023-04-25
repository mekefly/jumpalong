import { EventBeltline } from "@/nostr/eventBeltline";
import { Event, Filter } from "nostr-tools";
import { Relay } from "../nostr/Relay";
import { ReversePromise } from "../utils/promise";
export function expectCalled(
  fn: Function = () => {},
  expectNum: number = 1,
  timeout: number = 1000
) {
  let num = 0;
  const p = new ReversePromise<void>();

  setTimeout(() => {
    p.toReject(`在${timeout}ms内,需要执行次数${expectNum},实际执行次数${num}`);
  }, timeout);
  return {
    async expectCalled() {
      return p.promise;
    },
    fn(...rest: any[]) {
      num++;
      if (num === expectNum) {
        setTimeout(() => {
          p.toResolve();
        }, 0);
      }
      fn(...rest);
    },
  };
}

export function clearLocalStorage() {
  localStorage.clear();
}

export function blockRequest(
  r: Partial<Relay1>,
  cleoseReq?: typeof EventBeltline.closeReq,
  getRelay?: (url: string) => any
) {
  EventBeltline.getRelay = async function (url): Promise<Relay> {
    getRelay?.(url);
    return Object.assign(new Relay1(), r);
  };
  EventBeltline.closeReq = cleoseReq ?? (() => {});
}
class Relay1 implements Relay {
  ws: WebSocket = {} as any;
  subIds: Set<string> = new Set();
  handleMessage(ev: MessageEvent<string>): void {
    throw new Error("Method not implemented.");
  }
  send(v: [string, ...any[]]): void {
    throw new Error("Method not implemented.");
  }
  req(filters: Filter[]): string {
    throw new Error("Method not implemented.");
  }
  publish(e: Event): void {
    throw new Error("Method not implemented.");
  }
  closeReq(subId: string): void {
    throw new Error("Method not implemented.");
  }
  close(): void {
    throw new Error("Method not implemented.");
  }
}
