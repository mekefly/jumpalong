import { getIncludeMergeByFilters } from "@/utils/nostr";
import { timeout } from "@/utils/utils";
import autoAddRelayurlByPubkeyStaff from "./autoAddRelayurlByPubkeyStaff";
import { createStaff } from "./Staff";

export default function autoAddRelayUrlByFilter(
  include: Set<"ids" | "#e" | "authors" | "#p"> = new Set([
    "ids",
    "#e",
    "authors",
    "#p",
  ])
) {
  let isStop = false;
  return createStaff({
    async initialization() {
      const filters = this.beltline.getFilters();

      const pubkeys: Set<string> = getIncludeMergeByFilters(
        ["authors", "#p"].filter((k: any) => include.has(k)) as any,
        filters
      );

      for (const pubkey of pubkeys) {
        await timeout(3000);
        if (isStop) {
          return;
        }
        this.beltline.addStaff(autoAddRelayurlByPubkeyStaff(pubkey));
      }

      const eventIds: Set<string> = getIncludeMergeByFilters(
        ["ids", "#e"].filter((k: any) => include.has(k)) as any,
        filters
      );

      for (const eventId of eventIds) {
        await timeout(3000);
        if (isStop) {
          return;
        }
        this.beltline.addStaff(autoAddRelayurlByPubkeyStaff(eventId));
      }
    },
    feat: {
      stopAutoAddRelayUrlByFilter() {
        isStop = true;
      },
    },
  });
}
