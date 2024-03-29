import replaceableEventMap from "@/nostr/ReplaceableEventMap";
import { AddressPointer } from "nostr-tools/lib/nip19";
import { LatestEventStaffFeat } from "../createLatestEventStaff";
import { createStaffFactory } from "../Staff";

export default createStaffFactory<LatestEventStaffFeat>()(
  (addressPointer: AddressPointer) => {
    function createTagAValue() {
      return `${addressPointer.kind}:${addressPointer.pubkey}:${addressPointer.identifier}`;
    }
    return {
      initialization() {
        try {
          const event = replaceableEventMap.replaceable.get(createTagAValue());
          if (event) {
            this.beltline.pushEvent(event);
          }
        } catch (error) {}
        this.beltline.feat.onHasLatestEvent((e) => {
          replaceableEventMap.replaceable.set(createTagAValue(), e);
        });
      },
    };
  }
);
