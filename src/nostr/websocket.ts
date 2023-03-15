const subIds = new Set<string>();

export async function createWebsocket(url: string) {
  return new Promise<WebSocket>((resolve, reject) => {
    const ws = new WebSocket(url);
    ws.onopen = () => {
      resolve(ws);
    };
    ws.onerror = (e) => {
      reject(e);
    };
  });
}

// export async function getRelay(
//   url: string,
//   autoInit: boolean = true
// ): Promise<Relay> {
//   const relay = pool.get(url);
//   if (!relay) {
//     if (autoInit) {
//       return await initRelays(url);
//     } else {
//       throw new Error("No relay in the Pool");
//     }
//   }
//   return relay;
// }

// export function closeReq(subId: string, url: string) {
//   if (subIds.has(subId)) {
//     pool.get(url)?.closeReq(subId);
//     return;
//   }
// }
// function onEmiter() {
//   RelayEmiter.on("req");
// }
