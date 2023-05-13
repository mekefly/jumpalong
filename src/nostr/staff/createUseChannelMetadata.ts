import { Metadata } from "@/types/MetaData";
import { Event } from "nostr-tools";
import { createStaffFactory } from ".";
import { deserializeTagR } from "../tag";
import { LatestEventStaffFeat } from "./createLatestEventStaff";

export default createStaffFactory<LatestEventStaffFeat>()(<
  D extends Metadata
>() => {
  return {
    feat: {
      useMetadata<Defaul = Partial<D>>(d: Defaul = {} as Defaul): D | Defaul {
        //@ts-ignore
        const event = this.beltline.feat.getLatestEvent();
        if (!event) return d as any;
        return parseMetadata<D>(event);
      },
      onHasMetadata(callback: (metadata: D, subId?: string) => void) {
        this.beltline.feat.onHasLatestEvent((event, subId) => {
          callback(parseMetadata<D>(event), subId);
        });
      },
    },
  };
});

/**
 * https://github.com/nostr-protocol/nips/blob/master/28.md
 */
export function parseMetadata<D extends Metadata>(event: Event): D {
  let data: any = {} as any;
  try {
    const s = deserializeTagR(event.tags);
    data = JSON.parse(event.content);
    (data.relayUrls ?? (data.relayUrls = [])).push([...s]);
  } catch (error) {}
  return data;
}
