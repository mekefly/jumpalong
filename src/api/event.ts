import { createEvent } from "@/nostr/event";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import createOneEventStaff from "@/nostr/staff/createOneEventStaff";
import createLocalStorageStaff from "@/nostr/staff/storage/createLocalStorageStaff";
import { userKey } from "@/nostr/user";
import { useCache } from "@/utils/cache";
import { syncInterval } from "@/utils/utils";
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
  return useCache("getEventLineById" + eventId, () => {
    const line = createEventBeltlineReactive({
      describe: "获取id通过id",
    })
      .addStaff(createLocalStorageStaff(1))
      .addFilter({ ids: [eventId], limit: 1 })
      .addStaff(createOneEventStaff());
    // .addStaff(createAutomaticRandomRequestStaff());

    console.log("getEventLineById");

    const e = line.feat.useEvent() ?? line.feat.getItem(eventId);
    console.log("getEventLineById", e);

    if (e) return;
    const req = () => {
      const e = line.feat.useEvent() ?? line.feat.getItem(eventId);
      if (e) return;

      line.addReadUrl();
      // line.feat.startAutomaticRandomRequestStaff();
      // //得到结果就关闭
      // line.feat.onHasEventOnce(() => {
      //   line.feat.stopAutomaticRandomRequestStaff();
      //   line.closeReq();
      // });
    };

    syncInterval(`getEventLineById:${eventId}`, () => {
      req();
    });

    return line;
  });
}
