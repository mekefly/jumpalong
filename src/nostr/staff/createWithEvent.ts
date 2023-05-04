import { timeout } from "@/utils/utils";
import { createStaffFactory } from "./Staff";

export default createStaffFactory()(() => {
  return {
    feat: {
      withEvent() {
        return this.beltline.getList().length > 0;
      },
      async timeoutWithEvent(overtime: number = 2000) {
        await timeout(overtime);
        return (this.beltline.feat as any).withEvent();
      },
    },
  };
});
