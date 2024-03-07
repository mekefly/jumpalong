import { createStaff } from "../../staff";

export default createStaff((mod) =>
  mod
    .assignFeat({ subIds: new Set() })
);
