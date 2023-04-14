import { injectNostrApi } from "./nostr";
import { NostrApiImpl } from "./NostrApi";

export function injectWindowNostr() {
  injectNostrApi({
    nostrApi: new NostrApiImpl(() => {
      return new Promise((resolve) => {
        if ((window as any).nostr) {
          resolve((window as any).nostr);
        } else {
          setTimeout(() => resolve((window as any).nostr), 2000);
        }
      });
    }),
  });
}
