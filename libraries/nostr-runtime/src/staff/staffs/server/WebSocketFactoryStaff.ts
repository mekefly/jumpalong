import { createStaff } from "../../staff";
import { createWebsocket } from "./websocket";

export default createStaff("web-socket-factory", (line) => {
  return line.assignFeat({ webSocketFactory: createWebsocket });
});
