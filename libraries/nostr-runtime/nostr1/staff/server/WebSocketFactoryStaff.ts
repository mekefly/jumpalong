import { createWebsocket } from "@/nostr/server/websocket";
import { createStaff } from "../Staff";
import { sn } from "../../../utils/staff";

export default createStaff("web-socket-factory",(line) => {
  return line.assignFeat({ webSocketFactory: createWebsocket });
});
