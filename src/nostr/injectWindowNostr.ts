import { retry } from "@/utils/utils";
import { injectNostrApi } from "./nostr";
import { NostrApiImpl, NotFoundError } from "./nostrApi/NostrApi";

export function injectWindowNostr() {
  injectNostrApi({
    nostrApi: createNostrApiImpl(),
  });
}
export function createNostrApiImpl() {
  return new NostrApiImpl(() => {
    return retry(async () => {
      if ((window as any).nostr) {
        return (window as any).nostr;
      } else {
        return Promise.reject(new NotFoundError("Not Found Nostr"));
      }
    });
  });
}
