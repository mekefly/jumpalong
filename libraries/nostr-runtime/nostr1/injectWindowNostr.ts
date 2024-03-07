import { retry } from "@/utils/utils";
import { injectNostrApi } from "./nostr";
import { NotFoundNostrApiError } from "./nostrApi/error";
import { NostrApiImpl } from "./nostrApi/NostrApiImpl";

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
        return Promise.reject(new NotFoundNostrApiError("Not Found Nostr"));
      }
    });
  });
}
