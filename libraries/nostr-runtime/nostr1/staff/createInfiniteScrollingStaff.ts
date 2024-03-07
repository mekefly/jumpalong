import { Filter } from "nostr-tools";
import { nowSecondTimestamp } from "../../utils/utils";
import { createEventBeltline } from "../createEventBeltline";
import { EventBeltline } from "../eventBeltline";
import createEoseUnSubStaff from "./createEoseUnSubStaff";
import { createStaff } from "./index";

type InfiniteScrolling = {
  feat: InfiniteScrollingFeat;
};

type InfiniteScrollingFeat = {
  getMore(this: { beltline: EventBeltline<{}> }): void;
};

export default function createInfiniteScrolling(): InfiniteScrolling {
  const initialTime = nowSecondTimestamp();
  let lastTime = initialTime;
  let dynamicAcquisitionTime = 1024;
  let lastLine: EventBeltline<any> | null = null;
  let numberOfEvents = 0;
  let plannedQuantity = 30;

  return createStaff({
    feat: {
      getMore() {
        dynamicChangeTime();

        const filters = this.beltline.getFilters();
        const newFilter = olderFilter(filters);

        const line = createEventBeltline({})
          .addStaff(createEoseUnSubStaff())
          .addStaff({
            push() {
              numberOfEvents++;
            },
          })
          .setParent(this.beltline)
          .addFilters(newFilter);

        line.addRelayUrls(this.beltline.getRelayUrls());
      },
    },
  });

  /**
   * 根据获取到的dvent数量然后去动态的调控请求的时间限制
   */
  function dynamicChangeTime() {
    if (numberOfEvents <= plannedQuantity / 2) {
      dynamicAcquisitionTime = dynamicAcquisitionTime * 2;
    } else if (numberOfEvents >= plannedQuantity * 2) {
      dynamicAcquisitionTime = Math.floor(dynamicAcquisitionTime / 2);
    } else {
      dynamicAcquisitionTime = Math.floor(
        dynamicAcquisitionTime * (plannedQuantity / numberOfEvents)
      );
    }
    numberOfEvents = 0;
  }

  function olderFilter(filters: Filter[]) {
    const since = lastTime - dynamicAcquisitionTime;

    const newFilter = filters.map((filter) => {
      filter.since = since;
      return {
        ...filter,
        since,
        until: lastTime,
      } as Filter;
    });
    //更新上一次的时间
    lastTime = since;
    return newFilter;
  }
}
