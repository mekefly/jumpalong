import { type Event } from "nostr-tools";
import { type EventBeltline } from "../eventBeltline";

export enum StaffState {
  NEXT,
  BREAK,
  CONTINUE,
  PREVENT_CIRCULAR_REFERENCES,
}
export function createStaff<STAFF extends Staff>(staff: STAFF): STAFF {
  return staff as any;
}
export function createStaffFactory<Feat extends object>(): <
  createStaff extends (...rest: any[]) => Staff<Feat>
>(
  staff: createStaff
) => createStaff {
  return _createStaffFactory;
}

function _createStaffFactory(v: any) {
  return v;
}

export type Staff<FEAT extends object = {}> = {
  beforePush?: (event: Event, eventList: Event[]) => void;
  push?: (
    this: StaffThisType<FEAT>,
    event: Event,
    eventList: Event[],
    context: {
      lastState: StaffState;
      subId?: string;
      url?: string;
    }
  ) => StaffState | void;
  afterPush?: (
    this: StaffThisType<FEAT>,
    event: Event,
    eventList: Event[],
    lastState: StaffState
  ) => StaffState | void;
  initialization?: (this: StaffThisType<FEAT>) => any;
  feat?: Record<
    string,
    | ((this: FeatType<FEAT>, ...rest: any) => any)
    | object
    | string
    | number
    | boolean
    | Array<any>
  >;
  onClose?: (this: StaffThisType<FEAT>) => void;
};

export type FeatType<FEAT extends object = {}> = FEAT & {
  beltline: EventBeltline<FEAT>;
  pushEvent: (
    this: FeatType,
    event: Event,
    eventList: Event[],
    context: {
      lastState: StaffState;
      subId?: string;
      url?: string;
    }
  ) => void;
};
export type StaffThisType<FEAT extends object = {}> = {
  beltline: EventBeltline<FEAT>;
};
