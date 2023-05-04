const logger = loggerScope;
export async function createWebsocket(url: string) {
  return new Promise<WebSocket>((resolve, reject) => {
    try {
      const u = new URL(url);
      try {
        const ws = new WebSocket(u);
        ws.onopen = () => {
          resolve(ws);
        };
        ws.onerror = (e) => {
          reject(e);
        };
      } catch (error) {}
    } catch (error) {
      logger.error("Incorrect connection", url);
    }
  });
}
