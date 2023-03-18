import { config } from "@/nostr/nostr";
import { defaultCacheOptions, getCache, setCache } from "@/utils/cache";
import { CacheOptions } from "@/utils/cache/types";
import { Event } from "nostr-tools";
import { createStaffFactory } from "../Staff";

const option = {
  duration: config.eventCacheDuration,
  ...defaultCacheOptions,
};
export default createStaffFactory()((eventId: string, opt?: CacheOptions) => {
  return {
    initialization() {
      try {
        const event = getCache(
          eventId,
          Object.assign(
            {
              useLocalStorage: true,
              useMemoryCache: true,
              duration: Infinity,
            },
            opt
          )
        ) as Event;
        if (event) {
          this.beltline.pushEvent(event);
        }
      } catch (error) {}
    },
    push(e) {
      setCache(e.id, e, option);
    },
  };
});
