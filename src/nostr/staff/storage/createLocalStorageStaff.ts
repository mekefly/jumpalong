import { config } from "@/nostr/nostr";
import {
  defaultCacheOptions,
  deleteCache,
  getCache,
  setCache,
} from "@/utils/cache";
import { AsyncReCacheOptions } from "@/utils/cache/types";
import { arrayRemove } from "@/utils/utils";
import { utils } from "@noble/secp256k1";
import { Event, Filter } from "nostr-tools";
import { createStaffFactory, FeatType, StaffThisType } from "..";
import PopLimit from "../PopLimit";

const cache = new Map<string, Event>();
class LocalStorageFilter {
  filters: Filter[];
  filtersKey: string;
  eventIdList: string[];
  list: null | Event[] = null;
  cacheOptions: AsyncReCacheOptions = {
    ...defaultCacheOptions,
    duration: config.localStorage.duration,
  };
  constructor(filters: Filter[]) {
    this.filters = filters;
    let k = JSON.stringify(filters);
    if (k.length > 256) {
      const a = utils.taggedHashSync(k);

      this.filtersKey = `LocalStorageFilter:${utils.sha256(a)}`;
    } else {
      this.filtersKey = `LocalStorageFilter:${k}`;
    }

    const str = localStorage.getItem(this.filtersKey);

    try {
      this.eventIdList = str ? JSON.parse(str) : [];
    } catch (error) {
      this.eventIdList = [];
    }
    // this.clearAll();
  }
  getWholeEvent() {
    const list: Event[] = [];

    for (const eventId of this.eventIdList) {
      try {
        const event = this.getItem(eventId);
        if (!event) break;
        list.push(event);
      } catch (error) {}
    }
    return list;
  }
  clear() {
    for (const eventId of this.eventIdList) {
      this.removeItem(eventId);
    }
  }
  createKey(eventId: string) {
    return eventId;
  }
  setItem(e: Event) {
    const key = this.createKey(e.id as string);

    setCache(key, e, this.cacheOptions);
    this.eventIdList.push(e.id as string);
    this.updateList();
  }
  getItem(eventId: string): Event | undefined {
    try {
      const cache = getCache(this.createKey(eventId), this.cacheOptions);
      return cache;
    } catch (error) {
      //缓存不存在或过期清楚
      this.removeItem(eventId);
    }
  }
  removeItem(eventId: string) {
    deleteCache(this.createKey(eventId));
    arrayRemove(this.eventIdList, eventId);
    this.updateList();
  }
  updateList() {
    localStorage.setItem(this.filtersKey, JSON.stringify(this.eventIdList));
  }
}

export type CreateLocalStorageStaffType = {
  initialization(this: StaffThisType<object>): void;
  feat: CreateLocalStorageStaffFeatType;
};
export type CreateLocalStorageStaffFeatType = {
  removeItem(this: FeatType<object>, eventId: string): void;
  getItem(eventId: string): Event | undefined;
};

export default createStaffFactory()(
  (limit: number = 1000): CreateLocalStorageStaffType => {
    let localStorageFilter: LocalStorageFilter = null as any;
    return {
      initialization() {
        localStorageFilter = new LocalStorageFilter(this.beltline.getFilters());
        if (limit === 0) {
          return;
        }

        const list = localStorageFilter.getWholeEvent();
        for (const event of list) {
          this.beltline.pushEvent(event);
        }

        const line = this.beltline
          .createChild({})
          .addStaff({
            push(e) {
              localStorageFilter.setItem(e);
            },
          })
          .addStaffOfReverseSortByCreateAt()
          .addStaff(PopLimit(limit))
          .addExtends(this.beltline);

        line.feat.onLimitPop((e) => {
          localStorageFilter.removeItem(e.id as string);
        });
      },
      feat: {
        removeItem(eventId: string) {
          localStorageFilter?.removeItem(eventId);
        },
        getItem(eventId: string) {
          console.debug(
            "getItem",
            eventId,
            "localStorageFilter",
            localStorageFilter,
            "event",
            localStorageFilter?.getItem(eventId)
          );

          return localStorageFilter?.getItem(eventId);
        },
      },
    };
  }
);

// export function xx(filters: Filter[], limit: number) {
//   return createStaff({
//     initialization() {
//       const len = LocalStorageFilter.length;

//       const line = this.beltline
//         .addFilters(filters)
//         .createChild({})
//         .addStaffOfSortByCreateAt()
//         .addStaff(PopLimit(limit));

//       //初始化加载存储
//       for (let i = 0; i < len; i++) {
//         try {
//           const key = LocalStorageFilter.key(i);
//           if (!key) {
//             continue;
//           }
//           if (!key.startsWith(`${prefix}:`)) continue;

//           const cacheString = LocalStorageFilter.getItem(key);
//           if (!cacheString) return;
//           const cache: any = JSON.parse(cacheString) as Event;

//           line.pushEvent(cache);
//           //坚挺添加放入存储
//         } catch (error) {}
//       }

//       const list = line.getList();

//       for (let i = list.length - 1; i >= 0; i--) {
//         this.beltline.pushEvent(list[i]);
//       }

//       //坚挺添加放入存储
//       this.beltline
//         .createChild({})
//         .addFilters(filters)
//         .addStaff({
//           push(e) {
//             LocalStorageFilter.setItem(`${prefix}:${e.id}`, JSON.stringify(e));
//           },
//         });
//     },
//   });
// }
