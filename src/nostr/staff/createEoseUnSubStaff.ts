import { relayEmiter } from "../nostr";
import { createStaff } from "./Staff";

export default function createEoseUnSubStaff() {
  return createStaff({
    initialization() {
      this.beltline.onAfterReq(({ subId }) => {
        relayEmiter.once("eose", subId, () => {
          this.beltline.closeReqBySubid(subId);
        });
      });
    },
  });
}
