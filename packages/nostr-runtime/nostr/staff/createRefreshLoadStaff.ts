import { defaultCacheOptions, getCacheOrNull, setCache } from "@/utils/cache";
import { createCounter, debounce, nowSecondTimestamp } from "@/utils/utils";
import { Event, Filter } from "nostr-tools";
import { EventBeltline } from "../eventBeltline";
import { createDoNotRepeatStaff } from "./createDoNotRepeatStaff";
import createEoseUnSubStaff from "./createEoseUnSubStaff";
import createEventSourceTracers from "./createEventSourceTracers";
import createTimeoutUnSubStaff from "./createTimeoutUnSubStaff";
import { createStaffFactory, FeatType, StaffThisType } from "./Staff1";

export type BufferOpt = {
  bufferLine: EventBeltline;
  bufferCounter: ReturnType<typeof createCounter>;
  timeIncrement: number;
  until: number;
  since: number;
  createTime: number;
  minSince: number;
  intervalId: any;
  isLoading: boolean;
};
type EventArg = { event: Event; opt: { subId?: string; url?: string } };

export type RefreshLoadStaff = {
  initialization(this: StaffThisType<object>): void;
  feat: RefreshLoadStaffFeat;
};
export type RefreshLoadStaffFeat = {
  loadBufferOpt: BufferOpt;
  refreshBufferOpt: BufferOpt;
  refresh(this: FeatType<object>): void;
  load(this: FeatType<object>): void;
  firstLoad(this: FeatType<object>): void;
};
const createCacheKey = (filters: Filter[]) =>
  `createRefreshLoadStaff:${JSON.stringify(filters)}`;
const cacheOptions = { ...defaultCacheOptions, duration: 1000 * 60 };

export default createStaffFactory()(
  (
    filters: Filter[],
    limit: number = 20,
    opts?: {
      eventBeltline: EventBeltline<any>;
      interval: number;
      loadBufferOpt: Partial<BufferOpt>;
      refreshBufferOpt: Partial<BufferOpt>;
    }
  ): RefreshLoadStaff => {
    const pushEventArgv = new WeakMap<Event, EventArg>();
    const cacheKey = createCacheKey(filters);

    const bufferOpt: {
      loadBufferOpt: BufferOpt;
      refreshBufferOpt: BufferOpt;
    } = (getCacheOrNull(cacheKey, cacheOptions) as any) ?? {
      loadBufferOpt: opts?.loadBufferOpt,
      refreshBufferOpt: {
        minSince: nowSecondTimestamp(),
        ...opts?.refreshBufferOpt,
      },
    };

    //load
    const loadBufferOpt = createBufferOpt(bufferOpt.loadBufferOpt);

    //refresh
    const refreshBufferOpt = createBufferOpt(bufferOpt.refreshBufferOpt);

    return {
      initialization() {
        // const urls = this.beltline.getRelayUrls();
        const slef = opts?.eventBeltline ?? this.beltline;

        //刷新
        //[3,2,1,0] 先将最旧的拿出来，然后拿到新的那里
        initializationEventLine(slef, refreshBufferOpt, true);

        //加载
        // [0,1,2,3] 先将最新的拿出来，所以是正序
        initializationEventLine(slef, loadBufferOpt, false);
      },
      feat: {
        loadBufferOpt,
        refreshBufferOpt,
        firstLoad() {
          const loadBufferOpt = (this.beltline.feat as any)
            .loadBufferOpt as BufferOpt;
          loadBufferOpt.isLoading = true;

          const slef = this.beltline;
          const prestrainLine = slef
            .createChild()
            .addFilters(filters.map((filter) => ({ ...filter, limit })))
            .addStaff(createEoseUnSubStaff())
            .addStaff(createTimeoutUnSubStaff())
            .addStaff({
              push() {
                if (loadBufferOpt.bufferCounter.count + 1 >= limit) {
                  loadBufferOpt.isLoading = false;
                }
              },
            });
          setTimeout(() => {
            loadBufferOpt.isLoading = false;
          }, 20);

          slef.onAddRelayUrlsAfter((urls) => {
            prestrainLine.addRelayUrls(urls);
          });
          prestrainLine.addRelayUrls(slef.getRelayUrls());

          loadBufferOpt.bufferLine.addExtends(prestrainLine);
        },
        refresh() {
          const createFilters: CreateFilters = (clearIntervalId, bufferOpt) => {
            //从这个时间开始获取
            const since = bufferOpt.until;
            //until获取到这个时间
            const until = bufferOpt.until + bufferOpt.timeIncrement;
            //截止时间大于当前时间，就停止
            if (until > nowSecondTimestamp()) {
              clearIntervalId();

              //获取到未来，就自动减少获取范围
              bufferOpt.timeIncrement = bufferOpt.timeIncrement / 2;
              if (bufferOpt.timeIncrement < 60) {
                bufferOpt.timeIncrement = 60;
              }

              // 开始时间比现在还大，直接禁止请求
              if (since > nowSecondTimestamp()) {
                bufferOpt.until = nowSecondTimestamp();
                return;
              }
            } else {
              //如果获取到未来的某个时间，就不应该更新这个属性
              bufferOpt.until = until;
            }

            return filters.map((filter) => ({
              ...filter,
              since,
              until,
            }));
          };

          toPush(
            (this.beltline.feat as any).refreshBufferOpt,
            this.beltline as any,
            createFilters
          );
        },
        load() {
          const createFilters: CreateFilters = (clearIntervalId, bufferOpt) => {
            //获取到这个时间
            const until = bufferOpt.since;

            //从这个时间开始获取
            const since = (bufferOpt.since =
              bufferOpt.since - bufferOpt.timeIncrement);

            //1640966400 === '2022-1-1'
            //获取的时间小于此时间，就停止下一次请求
            if (since < 1640966400) {
              clearIntervalId();

              //since-until since要更小,所以相当与请求的最后时间太过小了，就禁止请求
              if (until < 1640966400) {
                return;
              }
            }
            return filters.map((filter) => ({
              ...filter,
              since,
              until,
            }));
          };
          toPush(
            (this.beltline.feat as any).loadBufferOpt,
            this.beltline as any,
            createFilters
          );
        },
      },
    };

    function clearReq(bufferOpt: BufferOpt) {
      clearInterval(bufferOpt.intervalId);
      bufferOpt.isLoading = false;
    }
    function toPush(
      bufferOpt: BufferOpt,
      slef: EventBeltline<{
        loadBufferOpt: BufferOpt;
        refreshBufferOpt: BufferOpt;
      }>,
      createFilters: CreateFilters
    ) {
      clearReq(bufferOpt);
      if (filters.length === 0) return;

      const urls = slef.getRelayUrls();

      //试图从待添加列表里添加内容
      const list = bufferOpt.bufferLine.getList();
      //最新的20个pop出来
      const pushList = list.splice(list.length - limit, limit);

      //等待刷新列表不够本次请求量数据量时
      if (pushList.length < limit) {
        //方案二根据时间刷新，但不必担心任何顺序问题，对方可能发送顺序不一定的，所以此方案将更厉害
        req(bufferOpt, urls, pushList.length, (...rest) => {
          const v = createFilters(...rest);
          setOptCache(slef);
          return v;
        });
      }
      //将等待区的数据放到展示区
      pushToEvent(pushList, slef);
    }

    function setOptCache(
      slef: EventBeltline<{
        loadBufferOpt: BufferOpt;
        refreshBufferOpt: BufferOpt;
      }>
    ) {
      setCache(
        cacheKey,
        {
          loadBufferOpt: {
            timeIncrement: slef.feat.loadBufferOpt.timeIncrement,
          },
          refreshBufferOpt: {
            timeIncrement: slef.feat.refreshBufferOpt.timeIncrement,
          },
        },
        cacheOptions
      );
    }

    function req(
      bufferOpt: BufferOpt,
      urls: Set<string>,
      count: number,
      createFilters: CreateFilters
    ) {
      //如果获取到的内容太多，就消减时间

      if (bufferOpt.bufferCounter.count > limit) {
        bufferOpt.timeIncrement = Math.floor(
          bufferOpt.timeIncrement / (bufferOpt.bufferCounter.count / limit)
        );
      }

      if (bufferOpt.timeIncrement < 60) {
        bufferOpt.timeIncrement = 60;
      }
      bufferOpt.bufferCounter.set(count);

      clearReq(bufferOpt);

      bufferOpt.isLoading = true;

      bufferOpt.intervalId = setInterval(toReq, opts?.interval ?? 3000);

      setTimeout(() => toReq(true));

      function toReq(stop?: boolean) {
        bufferOpt.isLoading = true;
        if (bufferOpt.bufferCounter.count >= limit) {
          clearReq(bufferOpt);
          return;
        } else {
          if (!stop) bufferOpt.timeIncrement = bufferOpt.timeIncrement * 2;
        }

        const _filter = createFilters(() => clearReq(bufferOpt), bufferOpt);
        if (!_filter) return;
        if (urls.size === 0) return;

        for (const url of urls) {
          bufferOpt.bufferLine.addExtends(
            bufferOpt.bufferLine
              .createChild()
              .addStaff(createTimeoutUnSubStaff())
              .addStaff(createEoseUnSubStaff())
              .addFilters(_filter)
              .addRelayUrl(url)
          );
        }
      }
    }

    function saveEventParameters(
      event: Event,
      opt: { subId?: string; url?: string }
    ) {
      pushEventArgv.set(event, { event, opt });
    }

    function pushToEvent(pushList: Event[], pushTarget: EventBeltline<{}>) {
      for (const event of pushList) {
        const pushArgv = popPushArgv(event);

        pushTarget.pushEvent(event, pushArgv?.opt);
      }
    }

    function popPushArgv(event: Event) {
      const pushArgv = pushEventArgv.get(event);
      pushEventArgv.delete(event);
      return pushArgv;
    }

    function createBufferOpt(opt?: Partial<BufferOpt>): BufferOpt {
      return Object.assign(
        {
          bufferLine: undefined as any as EventBeltline,
          bufferCounter: createCounter(0),
          timeIncrement: 1200,
          until: nowSecondTimestamp(),
          since: nowSecondTimestamp(),
          createTime: nowSecondTimestamp(),
          minSince: 1640966400,
          intervalId: undefined as any,
          isLoading: false,
        },
        opt
      );
    }

    function initializationEventLine(
      slef: EventBeltline,
      bufferOpt: BufferOpt,
      isReverseSort: boolean
    ) {
      const pushEventList = debounce(() => {
        //试图从待添加列表里添加内容
        const list = bufferOpt.bufferLine.getList();
        //最新的limit个pop出来
        const pushList = list.splice(list.length - limit, limit);

        //将等待区的数据放到展示区
        pushToEvent(pushList, slef);
      }, (opts?.interval ?? 3000) + 1000);
      bufferOpt.bufferLine = slef
        .createChild()
        .addStaff(createDoNotRepeatStaff())
        .addStaff({
          push(event, _, opt) {
            saveEventParameters(event, opt);

            bufferOpt.bufferCounter.reduce();

            //const 是当不够时，就从刚添加的列表里添加，不往待添加区放
            pushEventList();
          },
        });
      isReverseSort
        ? bufferOpt.bufferLine.addStaffOfReverseSortByCreateAt()
        : bufferOpt.bufferLine.addStaffOfSortByCreateAt();
      //用来存储待刷新的列表
    }
  }
);
type CreateFilters = (
  clearInterval: () => void,
  bufferOpt: BufferOpt
) => Filter[] | void;

export const createEventSourceTracersForRefreshLoadStaff =
  createStaffFactory<RefreshLoadStaffFeat>()(() => {
    return {
      initialization() {
        this.beltline.feat.loadBufferOpt.bufferLine.addStaff(
          createEventSourceTracers(),
          { unshift: true }
        );
        this.beltline.feat.refreshBufferOpt.bufferLine.addStaff(
          createEventSourceTracers(),
          { unshift: true }
        );
      },
    };
  });
