import { createStaff } from "../../staff";

export default createStaff((line) => {
  return line.defineEmit("closeRelay",["url"]);
});
