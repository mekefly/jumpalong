import { TYPES } from "../nostr";
import { createStaffFactory, StaffState } from "./Staff";

export default createStaffFactory()(() => {
  return {
    push(e) {
      const muteListSynchronizer = this.beltline
        .getNostrContainer()
        .get(TYPES.MuteListSynchronizer);

      if (muteListSynchronizer.getMuteList().publicList.has(e.pubkey))
        return StaffState.BREAK;
    },
  };
});
