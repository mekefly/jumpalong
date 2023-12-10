import { objectGet } from "@/utils/utils";
import { Event } from "nostr-tools";
import { createStaff, StaffState, type StaffThisType } from ".";
import { EventBeltline } from "r:/Users/meke/Documents/study/jumpalong/src/nostr/eventBeltline";

export const JOIN_CHANNEL_CONTENT = "+";
type ChannelLikeDataStaff = {
  push(this: StaffThisType<{}>, event: Event): StaffState.BREAK;
  feat: {
    channelDataList: Set<ChannelLikeData>;
    getChannelIds(this: { beltline: EventBeltline<{}> }): Set<string>;
    getChannelLikeList(this: {
      beltline: EventBeltline<{}>;
    }): Set<ChannelLikeData>;
  };
};

/**
 * 制作喜欢的频道列表流水线工人
 * @returns
 */
export default function createChannelLikeDataStaff(): ChannelLikeDataStaff {
  return createStaff({
    push(event) {
      if (event.content === JOIN_CHANNEL_CONTENT) {
        objectGet<Set<ChannelLikeData>>(
          this.beltline.feat,
          "channelDataList"
        ).add(createChannelLikeData(event));
      }
      return StaffState.BREAK;
    },
    feat: {
      channelDataList: new Set() as Set<ChannelLikeData>,
      getChannelIds() {
        return new Set(
          Array.from(
            objectGet<Set<ChannelLikeData>>(
              this.beltline.feat,
              "channelDataList"
            ),
            (item) => {
              return item.channelId;
            }
          )
        );
      },
      getChannelLikeList() {
        return objectGet<Set<ChannelLikeData>>(
          this.beltline.feat,
          "channelDataList"
        );
      },
    },
  });
}
function createChannelLikeData(event: Event): ChannelLikeData {
  const data: Partial<ChannelLikeData> = {
    joinId: event.id,
    joinPublisher: event.pubkey,
  };

  for (const tag of event.tags) {
    const t = tag[0];
    if (t === "e") {
      data.channelId = tag[1];
    } else if (t === "p") {
      data.channelCreator = tag[2];
    }
  }

  return data as any;
}

export type ChannelLikeData = {
  joinId: string;
  channelId: string;
  relayUrl?: string;
  channelCreator?: string;
  joinPublisher?: string;
};
