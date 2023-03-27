import { createStaffFactory } from "./Staff";

export default createStaffFactory()(() => {
  return {
    feat: {
      withEvent() {
        return this.beltline.getList().length > 0;
      },
    },
  };
});
