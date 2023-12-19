import { Filter } from "nostr-tools";
import { createStaff } from "../../Staff";

export default createStaff((mod) => {
  return mod.assignFeat({
    filters: new Map<string, Filter>(),
  });
});
