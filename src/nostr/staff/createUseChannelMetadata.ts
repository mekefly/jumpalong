import { Event } from "nostr-tools";
import { createStaff } from ".";
import { EventBeltline } from "../eventBeltline";
import { deserializeTagR } from "../tag";
import { LatestEventStaffFeat } from "./createLatestEventStaff";

export default function createUseChannelMetadata(): {
  feat: {
    useMetadata(this: {
      beltline: EventBeltline<LatestEventStaffFeat>;
    }): ChannelMetadata;
    onHasMetadata(
      this: { beltline: EventBeltline<LatestEventStaffFeat> },
      callback: (channelMetaData: ChannelMetadata, subId?: string) => void
    ): void;
  };
} {
  return createStaff({
    feat: {
      useMetadata() {
        const event = this.beltline.feat.getLatestEvent();
        if (!event) return {};
        return parseMetadata(event);
      },
      onHasMetadata(
        callback: (channelMetaData: ChannelMetadata, subId?: string) => void
      ) {
        this.beltline.feat.onHasLatestEvent((event, subId) => {
          callback(parseMetadata(event), subId);
        });
      },
    },
  });
}

/**
 * https://github.com/nostr-protocol/nips/blob/master/28.md
 */
export function parseMetadata(event: Event): ChannelMetadata {
  let data: ChannelMetadata = {};
  try {
    const s = deserializeTagR(event.tags);
    data.relayUrls = [...s];
    event && (data = JSON.parse(event.content));
  } catch (error) {}
  return data;
}

/**
 * https://github.com/nostr-protocol/nips/blob/master/28.md
 */
export type ChannelMetadata = {
  name?: string; //- Channel name
  about?: string; //- Channel description
  picture?: string; //- URL of channel picture
  relayUrls?: string[];
};
