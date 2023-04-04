import { getIncludeMergeByFilters } from "@/utils/nostr";
import { timeout } from "@/utils/utils";
import { Filter } from "nostr-tools";
import autoAddRelayurlByEventIdStaff from "./autoAddRelayurlByEventIdStaff";
import autoAddRelayurlByPubkeyStaff from "./autoAddRelayurlByPubkeyStaff";
import { createStaff } from "./Staff";

type AutoAddRelayUrlByFilterOptions = {
  include?: Set<"ids" | "#e" | "authors" | "#p">;
  filters?: Filter[];
};
export default function autoAddRelayUrlByFilter(
  opts?: AutoAddRelayUrlByFilterOptions
) {
  const {
    filters: filter1 = [],
    include = new Set(["ids", "#e", "authors", "#p"]),
  } = opts ?? {};
  let isStop = false;
  return createStaff({
    async initialization() {
      const filters = [...this.beltline.getFilters(), ...filter1];

      const pubkeys: Set<string> = getIncludeMergeByFilters(
        ["authors", "#p"].filter((k: any) => include.has(k)) as any,
        filters
      );

      for (const pubkey of pubkeys) {
        await timeout(1000);
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
        await timeout(1000);
        if (isStop) {
          return;
        }
        this.beltline.addStaff(autoAddRelayurlByEventIdStaff(eventId));
      }
    },
    feat: {
      stopAutoAddRelayUrlByFilter() {
        isStop = true;
      },
    },
  });
}
