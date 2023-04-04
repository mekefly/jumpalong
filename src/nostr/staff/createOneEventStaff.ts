import { Event } from "nostr-tools";
import { createStaff, StaffState, StaffThisType } from ".";
import { EventBeltline } from "../eventBeltline";

export type OneEventStaff = {
  initialization(this: StaffThisType<{}>): void;
  push(this: StaffThisType<{}>, e: Event, list: Event[]): StaffState.BREAK;
  feat: OneEventStaffFeat;
};
export type OneEventStaffFeat = {
  // vue reactive 模式时，可以直接在前端这样请求
  useEvent(this: { beltline: EventBeltline<{}> }): Event | undefined;
  onHasEventOnce(
    this: {
      beltline: EventBeltline<{}>;
    },
    callback: (e: Event) => void
  ): void;
};

export default function createOneEventStaff() {
  let num = 0;
  return createStaff({
    initialization() {
      this.beltline.feat.pushEvent = (event, eventList) => {
        if (num === 0) {
          this.beltline.closeReq();
          this.beltline.offLine();
          num++;
          eventList[0] = event;
        }
      };
    },
    feat: {
      // vue reactive 模式时，可以直接在前端这样请求
      useEvent(): Event | undefined {
        return this.beltline.getList()[0];
      },
      onHasEventOnce(callback: (e: Event) => void) {
        const e = (this as any).useEvent();
        if (e) {
          callback(e);
        } else {
          this.beltline.addStaff({
            push(e) {
              callback(e);
            },
          });
        }
      },
    },
  });
}
