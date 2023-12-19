import SubStaff from "../EventStaff/SubStaff";
import { createStaff } from "../Staff";
import EoseStaff from "./EoseStaff";
import NoticeStaff from "./NoticeStaff";
import OkStaff from "./OkStaff";

export default createStaff(
  OkStaff,
  NoticeStaff,
  EoseStaff,
  SubStaff,
  (line) => {
    return line;
  }
);
