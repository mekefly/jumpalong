import { ReversePromise } from "@/utils/promise";
import { createStaff } from "../Staff";

export default createStaff((line) => {
  let promise: ReversePromise<void> | undefined = undefined;
  return line.assignFeat({
    pause() {
      promise = new ReversePromise();
    },
    continue() {
      if (!promise) return;
      promise.toResolve();
      promise = undefined;
    },
    async pauseWaiting() {
      await promise
    },
  });
});
