import { createStaff } from "../Staff";

export default createStaff((line) => {
  return line.defineEmit<
    "ok",
    [eventId: string, { ok: boolean; message: string; url: string }]
  >();
});
