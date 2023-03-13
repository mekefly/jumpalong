import EventEmitter from "events";
import { Event } from "nostr-tools";
import { createStaffFactory } from "./Staff";

export default createStaffFactory()((limit: number) => {
  const eventEmiter = new EventEmitter();
  return {
    afterPush(event: Event, eventList) {
      if (eventList.length > limit) {
        const popEvent = eventList.pop();
        eventEmiter.emit("limit-pop", popEvent);
      }
    },
    feat: {
      onLimitPop(callBack: (e: Event) => void) {
        eventEmiter.on("limit-pop", callBack);
      },
    },
  };
});
