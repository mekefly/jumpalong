import { createStaff } from "../Staff";

type url = string;
export default createStaff((line) => {
  return line.defineEmit<`relay-closed:${url}`>();
});
