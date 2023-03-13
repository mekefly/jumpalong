import { EventBeltline } from "@/nostr/eventBeltline";
import { Event, Filter } from "nostr-tools";
import { createStaff, createStaffFactory } from "..";
import PopLimit from "../PopLimit";

const prefix = "event-id";

export default createStaffFactory()(() => {
  return {
    feat: {
      async setItem(event: Event): Promise<void> {
        localStorage.setItem(`${prefix}:${event.id}`, JSON.stringify(event));
      },
      async getItemById(id: string): Promise<Event> {
        throw new Error("");
      },
      async deleteItemById(id: string): Promise<void> {
        window.localStorage.removeItem(id);
      },
      setByFilters() {
        throw new Error("");
      },
      getByFilters() {
        throw new Error("");
      },
      async useStoreLine(filters: Filter[]): Promise<EventBeltline> {
        console.log("createLocalStorageStaff");

        const line = this.beltline
          .createChild({ addExtendsFromParent: false })
          .addFilters(filters);

        const len = localStorage.length;
        for (let i = 0; i < len; i++) {
          try {
            const key = localStorage.key(i);
            if (!key) {
              continue;
            }
            if (!key.startsWith(`${prefix}:`)) continue;

            const cacheString = localStorage.getItem(key);
            if (!cacheString) continue;
            const cache: any = JSON.parse(cacheString) as Event;
            console.log("createLocalStorageStaffCache");

            this.beltline.pushEvent(cache);
            //坚挺添加放入存储
          } catch (error) {}
        }

        //坚挺添加放入存储
        line.addStaff({
          push(e) {
            localStorage.setItem(`${prefix}:${e.id}`, JSON.stringify(e));
          },
        });

        return line;
      },
    },
  };
});

export function xx(filters: Filter[], limit: number) {
  return createStaff({
    initialization() {
      const len = localStorage.length;

      const line = this.beltline
        .addFilters(filters)
        .createChild({})
        .addStaffOfSortByCreateAt()
        .addStaff(PopLimit(limit));

      //初始化加载存储
      for (let i = 0; i < len; i++) {
        try {
          const key = localStorage.key(i);
          if (!key) {
            continue;
          }
          if (!key.startsWith(`${prefix}:`)) continue;

          const cacheString = localStorage.getItem(key);
          if (!cacheString) return;
          const cache: any = JSON.parse(cacheString) as Event;

          line.pushEvent(cache);
          //坚挺添加放入存储
        } catch (error) {}
      }

      const list = line.getList();

      for (let i = list.length - 1; i >= 0; i--) {
        this.beltline.pushEvent(list[i]);
      }

      //坚挺添加放入存储
      this.beltline
        .createChild({})
        .addFilters(filters)
        .addStaff({
          push(e) {
            localStorage.setItem(`${prefix}:${e.id}`, JSON.stringify(e));
          },
        });
    },
  });
}
