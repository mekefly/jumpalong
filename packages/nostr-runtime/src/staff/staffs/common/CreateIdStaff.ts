import { createStaff } from "../../../staff/staff";
import { createId } from "@jumpalong/shared";

export default createStaff((line) => line.defineFeat("createId", createId));
