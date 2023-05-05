import { inject, injectable } from "inversify";
import { Filter } from "nostr-tools";
import { createStaff, createStaffFactory, StaffThisType } from ".";
import { EventBeltline } from "../eventBeltline";
import { relayConfigurator, TYPES } from "../nostr";
import createEoseUnSubStaff from "./createEoseUnSubStaff";
import { LatestEventStaffFeat } from "./createLatestEventStaff";

export type AutomaticRandomRequestStaff = {
  initialization(this: StaffThisType<{}>): void;
  feat: AutomaticRandomRequestStaffFeat;
};
export type AutomaticRandomRequestStaffFeat = {
  startAutomaticRandomRequestStaff: () => void;
  stopAutomaticRandomRequestStaff: () => void;
};
@injectable()
export class AutoRandomRequestStaff {
  interval = 3_000;
  maximumTimes = 30;
  setToBeAdded = new Set<string>();
  added = new Set();
  count = 0;
  timer: NodeJS.Timer | undefined = undefined;
  private eventBeltline!: EventBeltline;
  filterMap = new Map<string, Filter>();

  constructor(
    @inject(TYPES.RootEventBeltline)
    private rootEventBeltline: EventBeltline
  ) {}
  stop() {
    clearInterval(this.timer);
    this.timer = undefined;
  }
  getIndex() {
    return Math.floor(Math.random() * this.setToBeAdded.size);
  }
  init() {}
  getEventBeltline() {
    return (
      this.eventBeltline ??
      (this.eventBeltline = this.rootEventBeltline.createChild())
    );
  }
  startProcessing() {
    this.count = 0;
    this.init();

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
      const index = this.getIndex();
      const randomUrl = Array.from(this.setToBeAdded)[index];

      // 维护已添加列表和等待添加的列表
      this.added.add(randomUrl);
      this.setToBeAdded.delete(randomUrl);

      const filters = Array.from(this.filterMap, ([k, v]) => v);

      // 请求数据
      const child = this.eventBeltline
        .createChild()
        .addFilters(filters)
        .addStaff(createEoseUnSubStaff())
        .addRelayUrls(new Set<string>().add(randomUrl));

      //超时停止订阅
      setTimeout(() => {
        child.closeReq();
      }, 20_000);

      this.getEventBeltline().addExtends(child);
    }, this.interval);
  }

  addFilter(filters: Filter[]) {
    for (const filter of filters) {
      this.filterMap.set(JSON.stringify(filter), filter);
    }
    this.startProcessing();
  }
  removeFilters(filters: Filter[]) {
    if (!filters) return;

    for (const filter of filters) {
      this.filterMap.delete(JSON.stringify(filter));
    }
  }
}

//随缘算法

/**
 * 自动随机添加url，主要用于查找用户所在的中继线索的时候使用
 * @param opt
 * @returns
 */
export default function createAutomaticRandomRequestStaff() {
  let filters: Filter[] | null = null;
  let isStop = false;

  let autoRandomRequestStaff: AutoRandomRequestStaff;

  function stopAutomaticRandomRequestStaff() {
    isStop = true;
    if (!filters) return;
    autoRandomRequestStaff.removeFilters(filters);
  }
  function startAutomaticRandomRequestStaff(this: { beltline: EventBeltline }) {
    isStop = false;
    filters = this.beltline.getFilters();
    const line = this.beltline
      .createChild()
      .addFilters(filters)
      .addExtends(autoRandomRequestStaff.getEventBeltline());

    this.beltline.addExtends(line);

    if (isStop) return; //执行上面代码可能已经有需要的数据了,如果已经符合停止条件，就会立刻停止
    autoRandomRequestStaff.addFilter(filters);
  }

  return createStaff({
    initialization() {
      autoRandomRequestStaff = this.beltline
        .getNostrContainer()
        .get(TYPES.AutoRandomRequestStaff);

      startAutomaticRandomRequestStaff.apply(this);
    },
    feat: {
      startAutomaticRandomRequestStaff,
      stopAutomaticRandomRequestStaff,
    },
    onClose() {
      stopAutomaticRandomRequestStaff();
    },
  });
}

/**
 * 坚听请求到一次就关闭，一般用于可替换事件
 */
export const createAutomaticRandomRequestWithEventAutoClose =
  createStaffFactory<AutomaticRandomRequestStaffFeat & LatestEventStaffFeat>()(
    () => {
      return {
        initialization() {
          this.beltline.feat.onHasLatestEventOnce(() => {
            this.beltline.feat.stopAutomaticRandomRequestStaff();
          });
        },
      };
    }
  );
