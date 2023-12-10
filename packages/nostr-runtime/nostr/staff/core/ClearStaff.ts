import { createStaff } from "../Staff";

export default createStaff((line) => {
  return line.defineEmit("clear").assignFeat({
    clear() {
      this.emit("clear");
    },
  });
});
