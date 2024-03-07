import { nowSecondTimestamp } from "../../utils/utils";
import { createStaff, StaffState } from "./Staff1";

/**
 * 创建时间非法过滤器
 * @returns
 */

export function createFilterGreaterThanTheCurrenttimeStaff() {
  return createStaff({
    push(e) {
      if (e.created_at > nowSecondTimestamp()) {
        return StaffState.BREAK;
      }
    },
  });
}
