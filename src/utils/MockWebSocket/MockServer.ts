import EventEmitter from "events";
import { MockWebSocket } from "./MockWebSocket";

export const mockServer = new Map<string, MockServer>();
export function mockWebSocket() {
  try {
  } catch (error) {}
}
type EventMap = {
  message: string | ArrayBufferLike | Blob | ArrayBufferView;
  reqOpen: MockWebSocket;
  close: MockWebSocket;
};
type eType = keyof EventMap;
export class MockServer {
  constructor(url: string) {
    try {
      window.WebSocket = MockWebSocket as any;
    } catch (error) {
      try {
        global.WebSocket = MockWebSocket as any;
      } catch (error) {}
    }
    mockServer.set(url, this);
  }
  connectedList: Set<MockWebSocket> = new Set();
  eventEmitter = new EventEmitter();
  emit<e extends eType>(type: e, v: EventMap[e]) {
    this.eventEmitter.emit(type, v);
  }
  on<e extends eType>(
    type: e,
    callBack: (this: typeof this, v: EventMap[e]) => void
  ) {
    this.eventEmitter.on(type, callBack.bind(this));
  }
  allowConnections(mockWebSocket: MockWebSocket) {
    this.connectedList.add(mockWebSocket);

    mockWebSocket.emit("open", new Event("open", {}));
  }
  close(mockWebSocket: MockWebSocket) {
    this.connectedList.delete(mockWebSocket);

    mockWebSocket.emit("close", new CloseEvent("close", {}));
  }
  send(mockWebSocket: MockWebSocket, data: any) {
    mockWebSocket.emit("message", new MessageEvent("message", { data: data }));
  }
}
