import relayConfigurator from "@/api/relayConfigurator";
import { createStaffFactory } from "./Staff";

export default createStaffFactory()(() => {
  return {
    feat: {
      addReadUrl() {
        this.beltline.addRelayUrls(relayConfigurator.getReadList());
      },
    },
  };
});
