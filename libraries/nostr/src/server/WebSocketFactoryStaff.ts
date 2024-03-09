import { createWebsocket } from './websocket'
import { createStaff } from '@jumpalong/core'

export default createStaff('web-socket-factory', line => {
  return line.assignFeat({ webSocketFactory: createWebsocket })
})
