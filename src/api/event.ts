import { getEventHash, signEvent, type Event } from "nostr-tools";
import { type CallBackT } from "../utils/types";
import { useEvent } from "../utils/use";
import { jointRelay, relayConfigurator, sub } from "./relays";
import { userKey } from "./user";

export async function sendShortTextNote(
  content: string,
  options: {
    relayUrls?: Set<string>;
    event?: Partial<Event>;
  } = {}
) {
  const event = createEvent({
    kind: 1,
    content,
    ...options?.event,
  });

  publishEvent(event, {
    relayUrls: options.relayUrls,
    ok() {
      console.log("发送成功");
    },
  });
}

export function getShortTextEvent(options?: { relayUrls?: Set<string> }) {
  const eventOps = useEvent();
  sub(
    [
      {
        kinds: [1],
        authors: [userKey.value.publicKey],
      },
    ],
    { even: eventOps.pushEvent, relayUrls: options?.relayUrls }
  );
  return eventOps;
}

export function getGlobalShortTextEvent(
  pubkey?: string,
  options?: { relayUrls?: Set<string> }
) {
  const eventOps = useEvent();
  const { unSubAll } = sub(
    [
      {
        kinds: [1],
        authors: pubkey ? [pubkey] : undefined,
      },
    ],
    {
      even: (e, { sub }) => {
        eventOps.pushEvent(e);

        if (eventOps.events.value.length > 20) {
          unSubAll();
        }
      },
      relayUrls: options?.relayUrls,
    }
  );
  return eventOps;
}

export function createEvent(options: Partial<Event>) {
  const { privateKey, publicKey } = userKey.value;
  let event: Event = Object.assign(
    {
      kind: 1,
      pubkey: publicKey,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: "",
    },
    options
  );

  event.id = getEventHash(event);
  event.sig = signEvent(event, privateKey);
  return event;
}

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
    publishEvent(event, {
      relayUrls,
      ok() {
        resolve();
      },
    });
  });
}
export function publishEvent(
  event: Event,
  options: {
    relayUrls?: Set<string>;
    ok?: CallBackT<Event>;
    failed?: CallBackT<Event>;
  } = {}
) {
  const { relayUrls, ok: ok, failed } = options;
  jointRelay(relayUrls ?? relayConfigurator.getWriteList(), (relay) => {
    let pub = relay.publish(event);
    ok && pub.on("ok", ok);
    failed && pub.on("failed", failed);
  });
}
