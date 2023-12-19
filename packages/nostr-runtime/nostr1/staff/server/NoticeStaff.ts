import { createStaff } from "../Staff";

export default createStaff((line) => {
  return line.defineEmit<"notice",[message:string,url:string]>();
});
