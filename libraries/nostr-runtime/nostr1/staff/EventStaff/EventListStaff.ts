import { EventBeltline } from "@/nostr/eventBeltline";
import { Event } from "nostr-tools";
import { createStaff, GetFeatType, PushContext } from "../Staff1";

export type EventListFeat = GetFeatType<ReturnType<typeof EventListStaff>>;

export default function EventListStaff() {
  return createStaff(<FEAT extends {}>(line: EventBeltline<FEAT>) => {
    const eventList: Event[] = [];
    return line
      .assignFeat({
        eventList,
        toPush: ((line, e, eventList) => eventList.push(e)) as ToPush<
          typeof line
        >,
        setToPush(toPush: ToPush<typeof line>) {
          this.toPush = toPush;
        },
        map<U>(
          callbackfn: (value: Event, index: number, array: Event[]) => U
        ): U[] {
          return this.eventList.map(callbackfn);
        },
        getList() {
          return this.eventList;
        },
      })
      .on("afterPush", (line, event, context) => {
        if (context.state) {
          line.feat.toPush(line as any, event, line.feat.eventList, context);
        }
      })
      .on("addExtends", (slef, line, opt) => {
        if (!opt.preventPushHistory) return;

        // 从extendsTo 添加当前 event
        for (const event of (line.feat as any)?.getList?.() ?? []) {
          slef.pushEvent(event);
        }
      });
  });
}

type ToPush<LINE extends EventBeltline<any>> = (
  line: LINE,
  event: Event,
  eventList: Event[],
  context: PushContext
) => void;
