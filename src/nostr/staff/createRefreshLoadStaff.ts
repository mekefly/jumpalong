import { createCounter, nowSecondTimestamp } from "@/utils/utils";
import { Event, Filter } from "nostr-tools";
import { EventBeltline } from "../eventBeltline";
import { createDoNotRepeatStaff } from "./createDoNotRepeatStaff";
import createEoseUnSubStaff from "./createEoseUnSubStaff";
import createTimeoutUnSubStaff from "./createTimeoutUnSubStaff";
import { createStaffFactory, StaffState } from "./Staff";

export default createStaffFactory()((filters: Filter[], limit: number = 20) => {
  const pushEventArgv = new WeakMap<
    Event,
    { event: Event; opt: { subId?: string; url?: string } }
  >();

  let expectingNewEventCounters = createCounter(limit);

  let refreshBufferLine: EventBeltline;
  let loadBufferLine: EventBeltline;

  //load
  let loadTimeIncrement = 600;
  let loadUnitl = nowSecondTimestamp();
  let loadIntervalId: any;

  //refresh
  let refreshTimeIncrement = 600;
  let refreshSince = nowSecondTimestamp();
  let refreshIntervalId: any;

  return {
    initialization() {
      // const urls = this.beltline.getRelayUrls();
      const slef = this.beltline;
      //刷新
      refreshBufferLine = slef
        .createChild()
        .addStaff(createDoNotRepeatStaff())
        .addStaff({
          push(event, _, { subId, url }) {
            if (!url) return;
            saveEventParameters(event, subId, url);

            //const 是当不够时，就从刚添加的列表里添加，不往待添加区放
            if (expectingNewEventCounters.count < limit) {
              slef.pushEvent(event, { subId, url });
              return StaffState.BREAK;
            }
          },
        })
        .addStaffOfReverseSortByCreateAt(); //用来存储待刷新的列表

      //加载
      loadBufferLine = slef
        .createChild()
        .addStaff(createDoNotRepeatStaff())
        .addStaff({
          push(event, _, { subId, url }) {
            if (!url) return;

            saveEventParameters(event, subId, url);

            //const 是当不够时，就从刚添加的列表里添加，不往待添加区放
            expectingNewEventCounters.reduce();

            if (expectingNewEventCounters.count < limit) {
              slef.pushEvent(event, { subId, url });
              return StaffState.BREAK;
            }
          },
        })
        .addStaffOfReverseSortByCreateAt(); //用来存储待刷新的列表
    },
    feat: {
      refresh() {
        if (filters.length === 0) return;
        const urls = this.beltline.getRelayUrls();
        const slef = this.beltline;

        const targetBufferLine = refreshBufferLine;

        //试图从待添加列表里添加内容
        const list = targetBufferLine.getList();
        //最旧的20个pop出来，原因是这两个生产线排序方式不一样
        const pushList = list.splice(list.length - limit, limit);
        //等待刷新列表不存在
        if (pushList.length < limit) {
          expectingNewEventCounters.set(pushList.length);

          req(
            targetBufferLine,
            urls,
            (id) => (refreshIntervalId = id),
            () => refreshIntervalId,

            (n) => (refreshTimeIncrement = n),
            () => refreshTimeIncrement,

            (clearIntervalId) => {
              //从这个时间开始获取
              const since = refreshSince;
              //until获取到这个时间
              const until = refreshSince + loadTimeIncrement;
              if (until > Date.now()) {
                //2023-1-1,定义如果获取的消息小于这个时间，就禁止再继续获取更旧的消息了
                clearIntervalId();
              }
              //标记已获取到这个时间了
              refreshSince = until;

              return filters.map((filter) => ({
                ...filter,
                since,
                until,
              }));
            }
          );
        }
        pushToEvent(pushList, slef);
      },
      load() {
        if (filters.length === 0) return;

        const urls = this.beltline.getRelayUrls();
        const slef = this.beltline;
        const targetBufferLine = loadBufferLine;

        //试图从待添加列表里添加内容
        const list = targetBufferLine.getList();
        //最新的20个pop出来
        const pushList = list.splice(list.length - limit, limit);

        //等待刷新列表不够本次请求量数据量时
        if (pushList.length < limit) {
          if (expectingNewEventCounters.count > limit * 2) {
            loadTimeIncrement = loadTimeIncrement / 2;
            if (loadTimeIncrement < 60) loadTimeIncrement = 60;
          }
          expectingNewEventCounters.clear();
          expectingNewEventCounters.set(pushList.length);

          //方案二根据时间刷新，但不必担心任何顺序问题，对方可能发送顺序不一定的，所以此方案将更厉害

          req(
            targetBufferLine,
            urls,

            (id) => (loadIntervalId = id),
            () => loadIntervalId,

            (n) => (loadTimeIncrement = n),
            () => loadTimeIncrement,

            (clearIntervalId) => {
              //从这个时间开始获取
              const since = loadUnitl - loadTimeIncrement;
              //获取到这个时间
              const until = loadUnitl;

              if (since < 1672502400) {
                //2023-1-1,定义如果获取的消息小于这个时间，就禁止再继续获取更旧的消息了
                clearIntervalId();
              }
              //标记已获取到了这个时间
              loadUnitl = since;

              return filters.map((filter) => ({
                ...filter,
                since,
                until,
              }));
            }
          );
        }
        //将等待区的数据放到展示区
        pushToEvent(pushList, slef);
      },
    },
  };

  function req(
    targetLine: EventBeltline,
    urls: Set<string>,
    setIntervalId: (id: any) => void,
    getIntervalId: () => any,
    setTimeIncrement: (s: number) => void,
    getTimeIncrement: () => number,
    createFilters: (clearInterval: () => void) => Filter[] | void
  ) {
    const _clearInterval = () => clearInterval(getIntervalId());

    _clearInterval();

    setIntervalId(setInterval(toReq, 2000));
    setTimeout(() => toReq);

    function toReq() {
      if (expectingNewEventCounters.count >= limit) {
        _clearInterval();
        return;
      } else {
        setTimeIncrement(getTimeIncrement() * 2);
      }

      const _filter = createFilters(_clearInterval);
      if (!_filter) return;
      if (urls.size === 0) return;

      for (const url of urls) {
        targetLine.addExtends(
          targetLine
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
    subId: string | undefined,
    url: string | undefined
  ) {
    pushEventArgv.set(event, { event, opt: { subId, url } });
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
});
