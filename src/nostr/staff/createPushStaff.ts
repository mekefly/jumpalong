import { createStaffFactory } from "./Staff";

export default createStaffFactory()(() => {
  return {
    initialization() {
      this.beltline.feat.pushEvent = function (e, eventList) {
        eventList.push(e);
      };
    },
  };
});
