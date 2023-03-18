import { createEvent } from "@/nostr/event";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import createOneEventStaff from "@/nostr/staff/createOneEventStaff";
import getCacheStaff from "@/nostr/staff/storage/getCacheStaff";
import setCacheStaff from "@/nostr/staff/storage/setCacheStaff";
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

export function getEventLineById(eventId: string, opt?: { url?: Set<string> }) {
  return useCache(
    "getEventLineById" + eventId,
    () => {
      const line = createEventBeltlineReactive({
        describe: "获取Event通过id",
      })
        .addFilter({ ids: [eventId], limit: 1 })
        .addStaff(createOneEventStaff())
        .addStaff(getCacheStaff(eventId));

      if (hasEvent()) return line;
      line.addStaff(setCacheStaff()).addExtends(rootEventBeltline);

      if (hasEvent()) return line;

      const req = () => {
        if (hasEvent()) return;

        if (opt?.url && opt.url.size > 0) {
          line.addRelayUrls(opt.url);
          setTimeout(() => {
            if (hasEvent()) return;
            line.addReadUrl();
          }, 2000);
        } else {
          line.addReadUrl();
        }
      };

      syncInterval(`getEventLineById:${eventId}`, () => {
        req();
      });

      function hasEvent() {
        return Boolean(line.feat.useEvent());
      }

      return line;
    },
    {
      useLocalStorage: false,
    }
  );
}
