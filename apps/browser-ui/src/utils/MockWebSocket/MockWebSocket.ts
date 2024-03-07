import { EventEmitter } from "events";
import { mockServer, MockServer } from "./MockServer";

const mockWebsocket = new Map<string, MockWebSocket[]>();
export class MockWebSocket implements WebSocket {
  url: string;
  server: MockServer | null = null;
  eventEmitter = new EventEmitter();
  constructor(url: string) {
    //存在就push，不存在就set目的是放进去
    this.url = url;

    mockWebsocket.get(url)?.push(this) ?? mockWebsocket.set(url, [this]);
    const server = mockServer.get(this.url);
    if (!server) {
      this.readyState = 3;
      setTimeout(() => {
        this.onerror?.(new Event("error"));
      });
      return;
    }
    this.server = server;

    this.server.emit("reqOpen", this);
    this.addEventListener("close", (...rest) => {
      this.CLOSED = 1;
      this.onclose?.(...rest);
    });

    this.addEventListener("message", (...rest) => {
      this.CLOSED = 1;
      this.onmessage?.(...rest);
    });

    this.addEventListener("open", (...rest) => {
      this.OPEN = 1;
      this.onopen?.(...rest);
    });

    this.addEventListener("error", (...rest) => {
      this.CLOSED = 1;
      this.onerror?.(...rest);
    });
  }
  emit<K extends keyof WebSocketEventMap>(
    type: K,
    value: WebSocketEventMap[K]
  ): void;
  emit(type: string, value: any) {
    this.eventEmitter.emit(type, value);
  }
  binaryType: BinaryType = "arraybuffer";
  bufferedAmount: number = 0;
  extensions: string = "";
  onclose: ((this: WebSocket, ev: CloseEvent) => any) | null = null;
  onerror: ((this: WebSocket, ev: Event) => any) | null = null;
  onmessage: ((this: WebSocket, ev: MessageEvent<any>) => any) | null = null;
  onopen: ((this: WebSocket, ev: Event) => any) | null = null;
  protocol: string = "wss://";
  readyState: number = 0;
  close(code?: number | undefined, reason?: string | undefined): void {
    this.server?.close(this);
    this.CLOSED = 1;
  }
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    mockServer.get(this.url)?.emit("message", data);
  }
  CLOSED: number = 0;
  CLOSING: number = 0;
  CONNECTING: number = 0;
  OPEN: number = 0;
  addEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions | undefined
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions | undefined
  ): void;
  addEventListener(type: string, listener: any): void {
    this.eventEmitter.on(type, listener);
  }
  removeEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | EventListenerOptions | undefined
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions | undefined
  ): void;
  removeEventListener(
    type: string,
    listener: unknown,
    options?: unknown
  ): void {
    this.eventEmitter.removeListener(type, listener as any);
  }
  dispatchEvent(event: Event): boolean {
    throw new Error("Method not implemented.");
  }
}
