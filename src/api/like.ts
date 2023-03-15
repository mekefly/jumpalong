import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { userKey } from "../nostr/user";

export function getLikeBeltline(urls?: Set<string>) {
  return createEventBeltlineReactive({})
    .addFilter({
      authors: [userKey.value.publicKey],
      kinds: [7],
    })

    .addReadUrl()
    .addRelayUrls(urls);
}
