import { createStaffFactory } from "./Staff";

export default createStaffFactory()(() => {
  return {
    initialization() {
      this.beltline.onAfterReq(({ url }) => {
        this.beltline.getRelayEmiter().once("close", url, ({ url }) => {
          this.beltline.req(url, this.beltline.getFilters());
        });
      });
    },
  };
});
