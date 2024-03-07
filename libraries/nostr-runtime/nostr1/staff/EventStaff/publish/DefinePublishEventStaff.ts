import { Event } from "nostr-tools";
import { createStaff } from "../../Staff";

export default createStaff((line) => {
  return line.defineEmit<"publish",[string,Event],void>();
});
