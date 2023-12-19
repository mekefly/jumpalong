import { Filter } from "nostr-tools";
import { createDoNotRepeatStaff } from "../createDoNotRepeatStaff";
import PopLimit from "../PopLimit";
import { createStaffFactory } from "../Staff1";
import { StorageInterface } from "./StorageInterfaceStaff";

export default createStaffFactory<StorageInterface>()(
  (filters: Filter[], limit: number = 1000) => {
    return {
      async initialization() {
        const slef = this.beltline;

        const line = this.beltline
          .createChild()
          .addStaff(createDoNotRepeatStaff())
          .addFilters(filters)
          .createChild({})
          .addStaffOfReverseSortByCreateAt()
          .addStaff(PopLimit(limit));

        line.feat.onLimitPop((e) => {
          this.beltline.feat.deleteItemById(e.id as string);
        });

        //这里用await无影响，会自动根据过滤器把历史中的事件同步过去
        const storeLine = await slef.feat.useStoreLine(filters);
        line.addStaff({
          afterPush(e) {
            storeLine.pushEvent(e);
          },
        });
      },
    };
  }
);
