const logger = loggerScope;
export async function createWebsocket(url: string) {
  return new Promise<WebSocket>((resolve, reject) => {
    try {
      const u = new URL(url);
      try {
        logger.http("Start connecting:", url);
        const ws = new WebSocket(u);
        ws.onopen = () => {
          logger.http("Successfully connected:", url);
          resolve(ws);
        };
        ws.onerror = (e) => {
          logger.http("connect failed:", url);
          reject(e);
        };
      } catch (error) {}
    } catch (error) {
      logger.error("Incorrect connection", url);
    }
  });
}
