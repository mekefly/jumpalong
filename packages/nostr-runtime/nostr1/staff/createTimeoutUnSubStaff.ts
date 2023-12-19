import { createStaffFactory } from "./Staff1";

/**
 * 超时停止订阅
 */
export default createStaffFactory()((timeout: number = 30 * 1000) => {
  return {
    initialization() {
      this.beltline.onAfterReq(({ subId }) => {
        setTimeout(() => {
          this.beltline.closeReqBySubid(subId);
        }, timeout);
      });
    },
  };
});
