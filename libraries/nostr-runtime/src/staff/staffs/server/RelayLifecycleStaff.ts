import { createStaff } from "../../staff";

type url = string;
export default createStaff((line) => {
  return line.defineEmit<`relay-closed:${url}`>();
});
