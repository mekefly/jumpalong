import { createEvent } from "@/nostr/event";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import createOneEventStaff from "@/nostr/staff/createOneEventStaff";
import { userKey } from "@/nostr/user";
import { useCache } from "@/utils/cache";
import { Event } from "nostr-tools";
// import { relayQuery } from "../nostr";
import { createEventBeltlineReactive } from "../nostr/createEventBeltline";

export async function eventDeletion(
  eventId: string[],
  relayUrls?: Set<string>
) {
  return new Promise<void>((resolve, reject) => {
    const event = createEvent({
      kind: 5,
      pubkey: userKey.value.publicKey,
      tags: eventId.map((id) => ["e", id]),
    });
    rootEventBeltline
      .createChild()
      .publish(event, relayConfigurator.getWriteList());
  });
}

export async function publishEvent(
  event: Event
  // options: PublishEventOptions = {}
) {
  rootEventBeltline
    .createChild()
    .publish(event, relayConfigurator.getWriteList());
}

export function getEventLineById(eventId: string) {
  const line = createEventBeltlineReactive({
    describe: "获取id通过id",
  })
    .addFilter({ ids: [eventId], limit: 1 })
    .addStaff(createOneEventStaff());
  // .addStaff(createAutomaticRandomRequestStaff());

  setTimeout(() => {
    const e = line.feat.useEvent();

    if (e) return;

    useCache(
      `getEventLineById:${eventId}`,
      () => {
        line.addReadUrl();
        setTimeout(() => {
          // line.feat.startAutomaticRandomRequestStaff();
          // //得到结果就关闭
          // line.feat.onHasEventOnce(() => {
          //   line.feat.stopAutomaticRandomRequestStaff();
          //   line.closeReq();
          // });
        }, 100);
        return true;
      },
      {
        duration: 100000, //100秒内只会请求一次
      }
    );
  }, 100);

  return line;
}
