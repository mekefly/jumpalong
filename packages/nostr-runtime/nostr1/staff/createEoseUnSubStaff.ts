import { createStaff } from "./Staff1";

/**
 * 自动停止订阅
 * @returns
 */
export default function createEoseUnSubStaff() {
  return createStaff({
    initialization() {
      this.beltline.onAfterReq(({ subId }) => {
        this.beltline.getRelayEmiter().once("eose", subId, () => {
          this.beltline.closeReqBySubid(subId);
        });
      });
    },
  });
}
