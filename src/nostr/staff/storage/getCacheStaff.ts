import { config } from "@/nostr/nostr";
import { defaultCacheOptions, getCache, setCache } from "@/utils/cache";
import { CacheOptions } from "@/utils/cache/types";
import { Event } from "nostr-tools";
import { createStaffFactory } from "../Staff";

const cacheOption: CacheOptions = {
  duration: config.eventCacheDuration,
  ...defaultCacheOptions,
};
export default createStaffFactory()((eventId: string, opt?: CacheOptions) => {
  const _cacheOptions: CacheOptions = Object.assign({}, cacheOption, opt);
  return {
    initialization() {
      try {
        const event = getCache(eventId, _cacheOptions) as Event;
        if (event) {
          this.beltline.pushEvent(event);
        }
      } catch (error) {}
      this.beltline.addStaff({
        push(e) {
          setCache(e.id, e, _cacheOptions);
        },
      });
    },
  };
});
