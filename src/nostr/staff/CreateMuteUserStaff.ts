import { getMuteListEventSync } from "../MuteList";
import { createStaffFactory, StaffState } from "./Staff";

const muteList = getMuteListEventSync();
export default createStaffFactory()(() => {
  return {
    push(e) {
      if (muteList.getData().publicList.has(e.pubkey)) return StaffState.BREAK;
    },
  };
});
