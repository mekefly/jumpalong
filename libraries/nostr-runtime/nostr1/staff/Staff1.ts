import { type Event } from "nostr-tools";
import { EventMapType, type EventBeltline } from "../eventBeltline";

export enum StaffState {
  NEXT,
  BREAK,
  CONTINUE,
  PREVENT_CIRCULAR_REFERENCES,
}
/**
 *  //添加类型
 *  createStaff((line) => {
 *      line.assignFeat({yy:22})
 *     // ...
 *     return line
 *  })
 *
 *  //拒绝添加类型，相当于私有作用域，此函数内暴露
 *  createStaff((line) => {
 *     line.addStaff(()=>{})
 *     // ...
 *  })
 *
 *  //类型限制，只有添加了{xx:1}类型的line才能添加此staff
 *  type xFeat = {xx:1}
 *  type yFeat = {yy:2}
 *  const xx =  createStaff(<FEAT extends xFeat>(line: EventBeltline<FEAT>) => {
 *     return line.assignFeat({yy:2} as yFeat)
 *  })
 *  // typeof xx === Staff<EventBeltline<xFeat && yFeat>>
 * @param staff
 * @returns
 */
export function createStaff<
  RETURN_TYPE = void,
  FEAT extends object = {},
  EVENTMAP extends EventMapType = {}
>(
  staff: Staff<EventBeltline<FEAT>, RETURN_TYPE>
): Staff<EventBeltline<FEAT>, RETURN_TYPE> {
  return staff;
}

export function createStaffFactory<
  STAFF_FACTORY extends (...rest: any[]) => Staff<any, any>
>(staffFactory: STAFF_FACTORY): STAFF_FACTORY {
  return staffFactory;
}

export type PushContext = {
  subId?: string;
  url?: string;
};

export type OnPush<
  LINE extends EventBeltline<any>,
  ReturnType = void,
  Opt = {}
> = (line: LINE, event: Event, context: PushContext & Opt) => ReturnType;

export type StateContext = { state: boolean };

export type BeforePush<LINE extends EventBeltline<any>> = OnPush<LINE, void>;
export type AfterPush<LINE extends EventBeltline<any>> = OnPush<
  LINE,
  void,
  StateContext
>;
export type PushFilter<LINE extends EventBeltline<any>> = OnPush<
  LINE,
  boolean | void
>;

export type Staff<
  LINE extends EventBeltline<any> = EventBeltline<{}>,
  ReturnType = LINE
> = (line: LINE) => ReturnType;

export type FeatType<FEAT extends object = {}> = FEAT & {
  beltline: EventBeltline<FEAT>;
};

export type GetFeatType<S extends Staff<EventBeltline<any>>> = S extends Staff<
  EventBeltline<infer FEAT1>,
  EventBeltline<infer FEAT2>
>
  ? FEAT1 & FEAT2
  : never;
type xxx = GetFeatType<Staff<EventBeltline<{}>>>;
