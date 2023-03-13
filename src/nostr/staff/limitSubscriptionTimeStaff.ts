import { nowSecondTimestamp } from "@/utils/utils";
import { Filter } from "nostr-tools";
import { createStaffFactory } from "./Staff";

export default createStaffFactory()(
  (filters: Filter[], second: number = 60 * 30) => {
    return {
      initialization() {
        const newFilter = olderFilter(filters);
        this.beltline.addFilters(newFilter);
      },
    };

    function olderFilter(filters: Filter[]) {
      const newFilter = filters.map((filter) => {
        return {
          ...filter,
          since: nowSecondTimestamp() - second,
        } as Filter;
      });
      return newFilter;
    }
  }
);
