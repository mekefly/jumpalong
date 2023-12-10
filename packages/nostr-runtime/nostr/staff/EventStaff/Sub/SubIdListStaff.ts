import { Filter } from "nostr-tools";
import { createStaff } from "../../Staff";

export default createStaff((mod) =>
  mod
    .assignFeat({ subIds: new Set() })
);
