import { Relay } from "./Relay.1";
import RelayEmiter from "./RelayEmiter";

export const subIds = new Set<string>();
export const pool = new Map<string, Relay>();

try {
  (window as any).reqCount = 0;
  (window as any).subIds = subIds;
  (window as any).RelayPool = pool;
} catch (error) {}

export async function initRelays(url: string) {
  return new Promise<Relay>((resolve, reject) => {
    const ws = new WebSocket(url);
    ws.onopen = () => {
      const relay = new Relay(ws);
      pool.set(url, relay);
      resolve(relay);
    };
    ws.onerror = (e) => {
      reject(e);

      pool.get(url)?.close();
      pool.delete(url);
    };
    ws.onclose = () => {
      pool.delete(url);
    };
  });
}
export async function getRelay(
  url: string,
  autoInit: boolean = true
): Promise<Relay> {
  const relay = pool.get(url);
  if (!relay) {
    if (autoInit) {
      return await initRelays(url);
    } else {
      throw new Error("No relay in the Pool");
    }
  }
  return relay;
}

export function closeReq(subId: string, url: string) {
  if (subIds.has(subId)) {
    pool.get(url)?.closeReq(subId);
    return;
  }
}
function onEmiter() {
  RelayEmiter.on("req");
}
