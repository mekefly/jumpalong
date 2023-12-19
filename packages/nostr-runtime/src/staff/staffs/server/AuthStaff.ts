import { Event } from "nostr-tools";
import { createStaff } from "../../staff";

export default createStaff((line) => {
  return line.defineEmit<"auth",[url:string,event:Event]>();
});
