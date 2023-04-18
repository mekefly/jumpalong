import { defaultCacheOptions, getCacheOrNull, setCache } from "@/utils/cache";
import { CacheOptions } from "@/utils/cache/types";
import { debounce } from "@/utils/utils";
import { createStaffFactory, StaffState } from "./Staff";

const cacheOption: CacheOptions = {
  ...defaultCacheOptions,
  duration: 1000 * 60,
};
export default createStaffFactory()((key: string) => {
  const _key = `TemporaryUniqueEvent:${key}`;

  const opt = {
    set: new Set<string>((getCacheOrNull(_key) as any) ?? undefined),
    addId(id: string) {
      this.set.add(id);
      this.updateSet(this.set);
    },
    updateSet: debounce((set: Set<string>) => {
      setCache(_key, [...set], cacheOption);
    }, 1000),
  };
  return {
    push(e) {
      if (opt.set.has(e.id)) return StaffState.BREAK;
      opt.addId(e.id);
    },
  };
});
