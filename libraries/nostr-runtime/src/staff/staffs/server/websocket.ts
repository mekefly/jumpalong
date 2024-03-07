//@LoggerScope;

export async function createWebsocket(url: string) {
  return new Promise<WebSocket>((resolve, reject) => {
    logger.http('Start connecting:', url)
    try {
      const u = new URL(url)
      try {
        const ws = new WebSocket(u)

        ws.onopen = () => {
          logger.http('Successfully connected:', url)
          resolve(ws)
        }
        ws.onerror = e => {
          logger.http('connect failed:', url)
          reject(e)
        }
      } catch (error) {
        logger.error('WebSocket', error)
      }
    } catch (error) {
      logger.error('Incorrect connection', url)
    }
  })
}
