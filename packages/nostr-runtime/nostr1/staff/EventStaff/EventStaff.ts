import { Event } from "nostr-tools";
import { createStaff } from "../Staff";

export default createStaff((mod) => {
  let _mod = mod
    .defineEmit<
      "event",
      [subId: string, event: Event, url: string],
      boolean | void
    >()
    .defineEmit<
      `event:${string}`,
      [subId: string, event: Event, url: string],
      boolean
    >()
    .assignFeat({
      /**
       * 发送一个event
       * @param subId
       * @param event
       * @param url
       */
      emitEvent(subId: string, event: Event, url: string = "local") {
        let createStopBubbling = (type: string) => (stop: boolean | void) => {
          console.log("stop", stop);
          if (stop === true) {
            this.stop(type as any);
          }
        };
        this.emit("event", [subId, event, url], {
          returnListener: createStopBubbling("event"),
        });
        this.emit(`event:${subId}`, [subId, event, url], {
          returnListener: createStopBubbling(`event:${subId}`),
        });
      },
    });

  return _mod;
});
