import { config } from "@/nostr/nostr";
import { defaultCacheOptions, setCache } from "@/utils/cache";
import { createStaffFactory } from "../Staff";

const option = {
  duration: config.eventCacheDuration,
  ...defaultCacheOptions,
};
export default createStaffFactory()(() => {
  return {
    push(e) {
      setCache(e.id, e, option);
    },
  };
});
