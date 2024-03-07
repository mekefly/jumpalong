import { createStaff } from "../../staff";

export default createStaff((line) => {
  return line.defineEmit<"notice",[message:string,url:string]>();
});
