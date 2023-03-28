import { createCounter, nowSecondTimestamp } from "@/utils/utils";
import { Event, Filter } from "nostr-tools";
import { EventBeltline } from "../eventBeltline";
import { createDoNotRepeatStaff } from "./createDoNotRepeatStaff";
import createEoseUnSubStaff from "./createEoseUnSubStaff";
import createTimeoutUnSubStaff from "./createTimeoutUnSubStaff";
import { createStaffFactory, StaffState } from "./Staff";

type BufferOpt = {
  bufferLine: EventBeltline;
  bufferCounter: ReturnType<typeof createCounter>;
  timeIncrement: number;
  until: number;
  since: number;
  intervalId: any;
};
type EventArg = { event: Event; opt: { subId?: string; url?: string } };

export default createStaffFactory()((filters: Filter[], limit: number = 20) => {
  const pushEventArgv = new WeakMap<Event, EventArg>();

  //load
  const loadOpt = createBufferOpt();

  //refresh
  const refreshOpt = createBufferOpt();

  return {
    initialization() {
      // const urls = this.beltline.getRelayUrls();
      const slef = this.beltline;
      //刷新
      refreshOpt.bufferLine = slef
        .createChild()
        .addStaff(createDoNotRepeatStaff())
        .addStaff({
          push(event, _, opt) {
            saveEventParameters(event, opt);

            refreshOpt.bufferCounter.reduce();
            //const 是当不够时，就从刚添加的列表里添加，不往待添加区放
            if (refreshOpt.bufferCounter.count < limit) {
              slef.pushEvent(event, opt);
              return StaffState.BREAK;
            }
          },
        })
        .addStaffOfReverseSortByCreateAt(); //用来存储待刷新的列表

      //加载
      loadOpt.bufferLine = slef
        .createChild()
        .addStaff(createDoNotRepeatStaff())
        .addStaff({
          push(event, _, opt) {
            saveEventParameters(event, opt);

            //const 是当不够时，就从刚添加的列表里添加，不往待添加区放
            loadOpt.bufferCounter.reduce();

            if (loadOpt.bufferCounter.count < limit) {
              slef.pushEvent(event, opt);
              return StaffState.BREAK;
            }
          },
        })
        .addStaffOfReverseSortByCreateAt(); //用来存储待刷新的列表
    },
    feat: {
      refresh() {
        const createFilters: CreateFilters = (clearIntervalId) => {
          //从这个时间开始获取
          const since = refreshOpt.until;
          //until获取到这个时间
          const until = refreshOpt.until + refreshOpt.timeIncrement;
          //截止时间大于当前时间，就停止
          if (until > nowSecondTimestamp()) {
            clearIntervalId();

            //获取到未来，就自动减少获取范围
            refreshOpt.timeIncrement = refreshOpt.timeIncrement / 2;
            if (refreshOpt.timeIncrement < 60) {
              refreshOpt.timeIncrement = 60;
            }

            // 开始时间比现在还大，直接禁止请求
            if (since > nowSecondTimestamp()) {
              return;
            }
          } else {
            //如果获取到未来的某个时间，就不应该更新这个属性
            refreshOpt.until = until;
          }

          return filters.map((filter) => ({
            ...filter,
            since,
            until,
          }));
        };

        toPush(refreshOpt, this.beltline, createFilters);
      },
      load() {
        const createFilters: CreateFilters = (clearIntervalId) => {
          //获取到这个时间
          const until = loadOpt.since;

          //从这个时间开始获取
          const since = (loadOpt.since = loadOpt.since - loadOpt.timeIncrement);

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
        toPush(loadOpt, this.beltline, createFilters);
      },
    },
  };

  function toPush(
    bufferOpt: BufferOpt,
    slef: EventBeltline,
    createFilters: CreateFilters
  ) {
    if (filters.length === 0) return;

    const urls = slef.getRelayUrls();

    //试图从待添加列表里添加内容
    const list = bufferOpt.bufferLine.getList();
    //最新的20个pop出来
    const pushList = list.splice(list.length - limit, limit);

    //等待刷新列表不够本次请求量数据量时
    if (pushList.length < limit) {
      //方案二根据时间刷新，但不必担心任何顺序问题，对方可能发送顺序不一定的，所以此方案将更厉害
      req(
        bufferOpt,
        urls,
        pushList.length,

        createFilters
      );
    }
    //将等待区的数据放到展示区
    pushToEvent(pushList, slef);
  }

  function req(
    bufferOpt: BufferOpt,
    urls: Set<string>,
    count: number,
    createFilters: CreateFilters
  ) {
    const _clearInterval = () => clearInterval(bufferOpt.intervalId);
    //如果获取到的内容太多，就消减时间
    if (bufferOpt.bufferCounter.count > limit * urls.size) {
      bufferOpt.timeIncrement = bufferOpt.timeIncrement / 2;
    }
    if (bufferOpt.timeIncrement < 60) {
      bufferOpt.timeIncrement = 60;
    }
    bufferOpt.bufferCounter.set(count);

    _clearInterval();

    bufferOpt.intervalId = setInterval(toReq, 2000);

    setTimeout(() => toReq);

    function toReq() {
      if (bufferOpt.bufferCounter.count >= limit) {
        _clearInterval();
        return;
      } else {
        bufferOpt.timeIncrement = bufferOpt.timeIncrement * 2;
      }

      const _filter = createFilters(_clearInterval);
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

  function pushToEvent(pushList: Event[], pushTarget: EventBeltline<object>) {
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

  function createBufferOpt(): BufferOpt {
    return {
      bufferLine: undefined as any as EventBeltline,
      bufferCounter: createCounter(limit),
      timeIncrement: 600,
      until: nowSecondTimestamp(),
      since: nowSecondTimestamp(),
      intervalId: undefined as any,
    };
  }
});
type CreateFilters = (clearInterval: () => void) => Filter[] | void;
