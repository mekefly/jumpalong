import { createStaff, StaffState } from "./Staff";

/**
 * 垃圾过滤器
 * @returns
 */
export function createGarbageFilter() {
  const set = new Set<string>();
  return createStaff({
    push(e) {
      if (set.has(e.content)) {
        return StaffState.BREAK;
      }
      set.add(e.content);
    },
  });
}
