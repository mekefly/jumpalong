import ReplaceableEventMap from "@/nostr/ReplaceableEventMap";
import { LatestEventStaffFeat } from "../createLatestEventStaff";
import { createStaffFactory } from "../Staff";
export default createStaffFactory<LatestEventStaffFeat>()((eventid: string) => {
  return {
    initialization() {
      const event = ReplaceableEventMap.channelMetadataEventMap.get(eventid);
      if (event) {
        this.beltline.pushEvent(event);
      }
      this.beltline.feat.onHasLatestEvent((e) => {
        ReplaceableEventMap.channelMetadataEventMap.set(eventid, e);
      });
    },
  };
});
