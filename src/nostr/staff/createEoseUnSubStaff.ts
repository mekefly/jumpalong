import RelayEmiter from "../RelayEmiter";
import { createStaff } from "./Staff";

export default function createEoseUnSubStaff() {
  return createStaff({
    initialization() {
      this.beltline.onAfterReq(({ subId }) => {
        RelayEmiter.once("eose", subId, () => {
          this.beltline.closeReqBySubid(subId);
        });
      });
    },
  });
}
