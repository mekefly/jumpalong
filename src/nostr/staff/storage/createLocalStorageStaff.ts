import { arrayRemove } from "@/utils/utils";
import { utils } from "@noble/secp256k1";
import { Event, Filter } from "nostr-tools";
import { createStaffFactory, FeatType, StaffThisType } from "..";
import PopLimit from "../PopLimit";

const prefix = "event-id:";
class LocalStorageFilter {
  filters: Filter[];
  filtersKey: string;
  eventIdList: string[];
  list: null | Event[] = null;
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
    this.clearAll();
  }
  getWholeEvent() {
    const list: Event[] = [];

    for (const eventId of this.eventIdList) {
      try {
        const str = localStorage.getItem(this.createKey(eventId));
        if (!str) break;
        const event = JSON.parse(str);
        list.push(event);
      } catch (error) {}
    }
    return list;
  }
  clearAll() {
    const localStorage = window.localStorage;
    const len = localStorage.length;

    for (let i = 0; i < len; i++) {
      try {
        const key = localStorage.key(i);
        if (key?.startsWith(prefix)) {
          localStorage.removeItem(key);
          continue;
        }
        if (!key?.startsWith("LocalStorageFilter")) {
          continue;
        }

        const cacheString = localStorage.getItem(key);
        if (!cacheString) {
          continue;
        }
        const cacheKey: any = JSON.parse(cacheString);
        if (Array.isArray(cacheKey)) {
          for (const id of cacheKey) {
            localStorage.removeItem(this.createKey(id));
          }
          localStorage.removeItem(key);
        }
      } catch (error) {}
    }
  }
  createKey(eventId: string) {
    return `${prefix}${eventId}`;
  }
  setItem(e: Event) {
    localStorage.setItem(this.createKey(e.id as string), JSON.stringify(e));
    this.eventIdList.push(e.id as string);
    this.updateList();
  }
  getItem(eventId: string) {
    localStorage.getItem(this.createKey(eventId));
  }
  removeItem(eventId: string) {
    localStorage.removeItem(this.createKey(eventId));
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
};

export default createStaffFactory()(
  (limit: number = 1000): CreateLocalStorageStaffType => {
    let localStorageFilter: LocalStorageFilter | null = null as any;
    return {
      initialization() {
        const localStorageFilter = new LocalStorageFilter(
          this.beltline.getFilters()
        );

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
