import replaceableEventMap from "../ReplaceableEventMap";
import { createLatestEventStaff } from "./createLatestEventStaff";
import { createStaffFactory } from "./Staff";

export default createStaffFactory()((type: 10002 | 0) => {
  return {
    initialization() {
      const line = this.beltline
        .createChild()
        .addFilter({ kinds: [type] })
        .addStaff(createLatestEventStaff());

      line.feat.onHasLatestEvent((e) => {
        replaceableEventMap[`kind${type}`].add(e);
      });

      line.addExtends(this.beltline);
    },
    push() {},
  };
});
