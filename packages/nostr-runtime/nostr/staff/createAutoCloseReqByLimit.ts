import { createStaff } from "./Staff1";

export default function createAutoCloseReqByLimit(limit: number) {
  let n = 0;
  return createStaff({
    push(_, eventList) {
      if (eventList.length >= limit && n === 0) {
        n++;
        this.beltline.close();
      }
    },
  });
}
