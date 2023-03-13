import { userKey } from "@/nostr/user";
import * as secp256k1 from "@noble/secp256k1";
import { Event, getEventHash, signEvent } from "nostr-tools";

export function validateEvent(event: Event): boolean {
  if (typeof event.content !== "string") return false;
  if (typeof event.created_at !== "number") return false;
  if (typeof event.pubkey !== "string") return false;
  if (!event.pubkey.match(/^[a-f0-9]{64}$/)) return false;

  if (!Array.isArray(event.tags)) return false;
  for (let i = 0; i < event.tags.length; i++) {
    let tag = event.tags[i];
    if (!Array.isArray(tag)) return false;
    for (let j = 0; j < tag.length; j++) {
      if (typeof tag[j] === "object") return false;
    }
  }

  return true;
}
export function verifySignature(event: Event & { sig: string }): boolean {
  return secp256k1.schnorr.verifySync(
    event.sig,
    getEventHash(event),
    event.pubkey
  );
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
