import { Filter } from "nostr-tools";
import { createStaff } from "../../Staff";

export default createStaff((mod) =>
  mod
    .defineEmit<"sub", [subId: string, url: string, filter: Filter[]]>()
    .defineEmit<"desub", [subId: string,url:string],any>()
);
