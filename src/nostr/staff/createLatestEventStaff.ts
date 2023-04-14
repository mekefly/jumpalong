import { EventEmitter } from "events";
import { Event } from "nostr-tools";
import { EventBeltline } from "../eventBeltline";
import { createStaff, StaffState } from "./index";

/**
 * 只获取最新的event替换事件过滤器
 * @returns
 */

export type LatestEventStaff = {
  push(
    event: Event,
    eventList: Event[],
    context: {
      lastState: StaffState;
      subId?: string;
    }
  ): StaffState.BREAK;
  feat: LatestEventStaffFeat;
};
export type LatestEventStaffFeat = {
  isHas(this: { beltline: EventBeltline<{}> }): boolean;
  getLatestEvent(this: { beltline: EventBeltline<{}> }): Event | undefined;
  onUpdated(
    this: { beltline: EventBeltline<{}> },
    listener: (event: Event) => void
  ): void;
  onHasLatestEvent(
    this: { beltline: EventBeltline<{}> },
    listener: (event: Event, subId?: string) => void
  ): void;
  onHasLatestEventOnce(
    this: { beltline: EventBeltline<{}> },
    listener: (event: Event, subId?: string) => void
  ): void;
};

export function createLatestEventStaff() {
  const eventEmiter = new EventEmitter();
  eventEmiter.setMaxListeners(1000);
  return createStaff({
    push(event, eventList, { lastState, subId }) {
      const oldV = eventList[0];
      if (!oldV || event.created_at > oldV.created_at) {
        eventList[0] = event;
        eventEmiter.emit("update", event, subId);
      }
      return StaffState.BREAK;
    },
    feat: {
      isHas() {
        return !!this.beltline.getList()[0];
      },
      getLatestEvent(): Event | undefined {
        return this.beltline.getList()[0];
      },
      onUpdated(listener: (event: Event) => void) {
        eventEmiter.on("update", listener);
      },
      onHasLatestEvent(listener: (event: Event, subId?: string) => void) {
        const e = this.beltline.getList()[0];
        if (e) {
          listener(e);
        }
        eventEmiter.on("update", listener);
      },
      onHasLatestEventOnce(listener: (event: Event) => void) {
        const e = this.beltline.getList()[0];
        if (e) {
          listener(e);
        } else {
          eventEmiter.once("update", listener);
        }
      },
    },
  });
}
