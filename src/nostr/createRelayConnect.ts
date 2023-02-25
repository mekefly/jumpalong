import { Relay } from "nostr-tools";

export function createRelayConnect(relay: Relay) {
  return { relay, taskCount: 0 };
}
