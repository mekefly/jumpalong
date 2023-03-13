import { relayConfigurator } from "@/api/relayConfigurator";
import { Filter } from "nostr-tools";
import { createStaff, StaffThisType } from ".";
import root from "../eventBeltline";
import createEoseUnSubStaff from "./createEoseUnSubStaff";

export type AutomaticRandomRequestStaff = {
  initialization(this: StaffThisType<{}>): void;
  feat: AutomaticRandomRequestStaffFeat;
};
export type AutomaticRandomRequestStaffFeat = {
  startAutomaticRandomRequestStaff: () => void;
  stopAutomaticRandomRequestStaff: () => void;
};
class AutoRandomRequestStaff {
  interval = 3_000;
  maximumTimes = 30;
  setToBeAdded = new Set<string>();
  added = new Set();
  count = 0;
  timer: NodeJS.Timer | undefined = undefined;

  filterMap = new Map<string, Filter>();

  stop() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  startProcessing() {
    this.count = 0;

    //已经运行阻止再次运行
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.count++;

      let size = this.setToBeAdded.size;

      if (size <= 0) {
        this.setToBeAdded = new Set(relayConfigurator.getOtherList());
        size = this.setToBeAdded.size;
      }

      //工人是懒惰的，干一定量的活就偷偷打盹
      if (
        size <= 0 ||
        this.filterMap.size <= 0 ||
        this.count > this.maximumTimes
      ) {
        this.stop();
        return;
      }

      //随机index
      const index = Math.floor(Math.random() * size);
      const randomUrl = Array.from(this.setToBeAdded)[index];

      // 维护已添加列表和等待添加的列表
      this.added.add(randomUrl);
      this.setToBeAdded.delete(randomUrl);

      const filters = Array.from(this.filterMap, ([k, v]) => v);

      // 请求数据
      root
        .addFilters(filters)
        .addStaff(createEoseUnSubStaff())
        .addRelayUrls(new Set<string>().add(randomUrl));
    }, this.interval);
  }

  addFilter(filters: Filter[]) {
    for (const filter of filters) {
      autoRandomRequestStaff.filterMap.set(JSON.stringify(filter), filter);
    }
    autoRandomRequestStaff.startProcessing();
  }
  removeFilters(filters: Filter[]) {
    if (!filters) return;

    for (const filter of filters) {
      autoRandomRequestStaff.filterMap.delete(JSON.stringify(filter));
    }
  }
}
export const autoRandomRequestStaff = new AutoRandomRequestStaff();

//随缘算法

/**
 * 自动随机添加url，主要用于查找用户所在的中继线索的时候使用
 * @param opt
 * @returns
 */
export default function createAutomaticRandomRequestStaff() {
  let filters: Filter[] | null = null;

  function stopAutomaticRandomRequestStaff() {
    if (!filters) return;
    autoRandomRequestStaff.removeFilters(filters);
  }

  return createStaff({
    initialization() {
      (this.beltline.feat as any).startAutomaticRandomRequestStaff();
    },
    feat: {
      startAutomaticRandomRequestStaff() {
        const filters = this.beltline.getFilters();
        autoRandomRequestStaff.addFilter(filters);
      },
      stopAutomaticRandomRequestStaff,
    },
    onClose() {
      stopAutomaticRandomRequestStaff();
    },
  });
}
