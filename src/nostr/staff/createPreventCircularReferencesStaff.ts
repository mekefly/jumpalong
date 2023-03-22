import { Event } from "nostr-tools";
import { createStaff, StaffState, StaffThisType } from "./Staff";

/**
 * extends 防止循环依赖
 * @returns
 */

export type PreventCircularReferencesStaff = {
  push(this: StaffThisType<{}>, event: Event): StaffState | undefined;
};

export function createPreventCircularReferencesStaff(): PreventCircularReferencesStaff {
  const set = new WeakSet();

  return createStaff({
    push(event) {
      if (set.has(event)) {
        return StaffState.PREVENT_CIRCULAR_REFERENCES;
      }
      set.add(event);
    },
  });
}
