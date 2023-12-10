import { Event } from "nostr-tools";
import { createStaffFactory } from "./Staff1";
import { CreateLocalStorageStaffFeatType } from "./storage/createLocalStorageStaff";

export default createStaffFactory<Partial<CreateLocalStorageStaffFeatType>>()(
  () => {
    const map = new Map<string, Event>();
    return {
      push(newEvent) {
        const pubkey = newEvent.pubkey as string;
        let oldEvent = map.get(pubkey);
        // 久的不存在或新的大于旧的，就更新
        if (oldEvent) {
          //新大于旧的
          if (newEvent.created_at > oldEvent.created_at) {
            //从存储上删除老的
            this.beltline.feat.removeItem?.(oldEvent.pubkey);
            //设置新的
            map.set(pubkey, newEvent);
          }
        } else {
          map.set(pubkey, newEvent);
        }
      },
    };
  }
);
