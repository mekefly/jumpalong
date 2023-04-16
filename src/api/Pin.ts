import { createLatestEventStaff } from "@/nostr/staff/createLatestEventStaff";
import { useCache } from "@/utils/cache";
import {
  createTextEventBeltline,
  CreateTextEventBeltlineOption,
} from "./shortTextEventBeltline";

export function createPinEventLine(
  opts: { pubkey: string } & Partial<CreateTextEventBeltlineOption>
) {
  return useCache(
    `createTipEventLine:${opts.pubkey}`,
    () => {
      const line = createTextEventBeltline({
        filters: [{ kinds: [10001], authors: [opts.pubkey] }],
        ...opts,
      }).addStaff(createLatestEventStaff());

      return line;
    },
    {
      useLocalStorage: false,
    }
  );
}
