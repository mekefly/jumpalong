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
