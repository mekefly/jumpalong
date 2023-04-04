import { createEvent } from "@/nostr/event";
import { PublishOpt } from "@/nostr/eventBeltline";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import createEoseUnSubStaff from "@/nostr/staff/createEoseUnSubStaff";
import createOneEventStaff from "@/nostr/staff/createOneEventStaff";
import createTimeoutUnSubStaff from "@/nostr/staff/createTimeoutUnSubStaff";
import createWithEvent from "@/nostr/staff/createWithEvent";
import getCacheStaff from "@/nostr/staff/storage/getCacheStaff";
import { userKey } from "@/nostr/user";
import { useCache } from "@/utils/cache";
import { merageSet, syncInterval } from "@/utils/utils";
import { Event } from "nostr-tools";
// import { relayQuery } from "../nostr";
import { createEventBeltlineReactive } from "../nostr/createEventBeltline";
type EventDeletionOptions = {} & PublishOpt;
export async function eventDeletion(
  eventId: string[],
  relayUrls?: Set<string>,
  opt?: EventDeletionOptions
) {
  return new Promise<void>((resolve, reject) => {
    const event = createEvent({
      kind: 5,
      pubkey: userKey.value.publicKey,
      tags: eventId.map((id) => ["e", id]),
    });
    rootEventBeltline
      .createChild()
      .publish(
        event,
        merageSet(relayConfigurator.getWriteList(), relayUrls ?? new Set()),
        opt
      );
  });
}
export function eventDeletionOne(
  eventId: string,
  opt?: { urls?: Set<string> } & EventDeletionOptions
) {
  eventDeletion([eventId], opt?.urls, opt);
}

export async function publishEvent(
  event: Event
  // options: PublishEventOptions = {}
) {
  rootEventBeltline
    .createChild()
    .publish(event, relayConfigurator.getWriteList());
}

export function getEventLineById(
  eventId: string,
  opt?: { urls?: Set<string> }
) {
  return useCache(
    "getEventLineById" + eventId,
    () => {
      const line = createEventBeltlineReactive({
        describe: "获取Event通过id",
      })
        .addFilter({ ids: [eventId], limit: 1 })
        .addStaff(createOneEventStaff())
        .addStaff(createWithEvent())
        .addStaff(createEoseUnSubStaff())
        .addStaff(createTimeoutUnSubStaff());

      line.addStaff(getCacheStaff(eventId));
      if (line.feat.withEvent()) return line;

      line.addExtends(rootEventBeltline);
      if (line.feat.withEvent()) return line;

      const req = () => {
        if (line.feat.withEvent()) return;

        if (opt?.urls && opt.urls.size > 0) {
          line.addRelayUrls(opt.urls);
          setTimeout(() => {
            if (line.feat.withEvent()) return;
            line.addReadUrl();
          }, 2000);
        } else {
          line.addReadUrl();
        }
      };

      syncInterval(`getEventLineById:${eventId}`, () => {
        req();
      });

      return line;
    },
    {
      useLocalStorage: false,
    }
  );
}
