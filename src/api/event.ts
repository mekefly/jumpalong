import { createEvent } from "@/nostr/event";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import createOneEventStaff from "@/nostr/staff/createOneEventStaff";
import setCacheStaff from "@/nostr/staff/storage/setCacheStaff";
import { userKey } from "@/nostr/user";
import { getCache, useCache } from "@/utils/cache";
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
  return useCache("getEventLineById" + eventId, () => {
    const line = createEventBeltlineReactive({
      describe: "获取id通过id",
    })
      .addFilter({ ids: [eventId], limit: 1 })
      .addStaff(setCacheStaff())
      .addStaff(createOneEventStaff());
    // .addStaff(createAutomaticRandomRequestStaff());

    if (hasEvent()) return line;

    const req = () => {
      if (hasEvent()) return;

      if (opt?.url) {
        line.addRelayUrls(opt.url);

        setTimeout(() => {
          const e = line.feat.useEvent();
          if (e) return;
          line.addReadUrl();
        }, 2000);
      } else {
        line.addReadUrl();
      }

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

    function hasEvent() {
      if (Boolean(line.feat.useEvent())) {
        return true;
      }
      const cacheEvent: Event = getCache(eventId, {});
      if (cacheEvent) {
        line.pushEvent(cacheEvent);
        return true;
      }
      return false;
    }

    return line;
  });
}
