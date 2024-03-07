import { createStaff } from "../Staff";

export default createStaff((line) => {
  return line.defineEmit("closeRelay",["url"]);
});
