import { Event } from "nostr-tools";
import { createStaff, StaffState, StaffThisType } from ".";

/**
 * event重复过滤器
 * @returns
 */
export type DoNotRepeatStaff = {
  push(this: StaffThisType<{}>, e: Event): StaffState | undefined;
};
export function createDoNotRepeatStaff(): DoNotRepeatStaff {
  const set = new Set<string>();
  return createStaff({
    push(e: Event) {
      const id = e.id as string;
      if (set.has(id)) {
        return StaffState.BREAK;
      }
      set.add(id);
    },
  }) as any;
}
