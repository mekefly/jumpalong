import { createStaff } from "../Staff";

export default createStaff((line) => {
  return line.defineEmit<"eose", [subId:string,url: string]>();
});
