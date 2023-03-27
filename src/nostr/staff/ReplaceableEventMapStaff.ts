import replaceableEventMap from "../ReplaceableEventMap";
import { LatestEventStaffFeat } from "./createLatestEventStaff";
import { createStaffFactory } from "./Staff";
export default createStaffFactory<LatestEventStaffFeat>()(
  (type: 10002 | 0, pubkey: string) => {
    return {
      initialization() {
        const map = replaceableEventMap[`kind${type}`];
        const event = map.getByPubkey(pubkey);
        if (event) {
          this.beltline.pushEvent(event);
        }

        this.beltline.feat.onHasLatestEvent((e) => {
          map.add(e);
        });
      },
      push() {},
    };
  }
);
