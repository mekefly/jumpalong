import { getChannelMetadataBeltlineByChannelId } from "@/api/channel";
import { useCache } from "@/utils/cache";
import { debounce } from "@/utils/utils";
import { Event } from "nostr-tools";
import { AddressPointer } from "nostr-tools/lib/nip19";
import { createEvent } from "./event";
import { ParameterizedReplaceableEventSyncAbstract } from "./ParameterizedReplaceableEventSyncAbstract";
import { ChannelMetadata } from "./staff/createUseChannelMetadata";
import { deserializeTagE } from "./tag";
import { userKey } from "./user";
export function getFollowChannelConfiguration() {
  return useCache(
    "getFollowChannelConfiguration",
    () => {
      const followChannel = reactive(new FollowChannel());
      setTimeout(() => {
        followChannel.sync();
      });
      return followChannel;
    },
    {
      useLocalStorage: false,
    }
  );
}

export type ChannelConfigurationData = {
  channelMeta: ChannelMetadata;
  eventId: string;
};
type ChannelConfigurationType = Map<string, ChannelConfigurationData>;
export class FollowChannel extends ParameterizedReplaceableEventSyncAbstract<ChannelConfigurationType> {
  identifier: string = "follower-channel";
  kind: number = 30001;
  constructor() {
    super("follower-channel", new Map());
  }
  getAddressPointers(): AddressPointer[] {
    return [
      {
        identifier: this.identifier,
        kind: this.kind,
        pubkey: userKey.value.publicKey,
      },
    ];
  }
  serializeToData(e: Event): ChannelConfigurationType {
    const channelConfiguration: ChannelConfigurationType = new Map();
    const tagEs = deserializeTagE(e.tags);
    for (const tag of tagEs) {
      const { eventId, relay, marker } = tag;
      const data = this.getData();
      const channelConfigurationData: ChannelConfigurationData = {
        channelMeta: { relayUrls: [relay] },
        eventId,
      };
      const oldChannelConfigurationData = channelConfiguration.get(eventId);

      if (!oldChannelConfigurationData) {
        this.reqMetadata(eventId, channelConfigurationData);
      }

      channelConfiguration.set(eventId, channelConfigurationData);
    }
    return channelConfiguration;
  }
  deserializeToEvent(data: ChannelConfigurationType, createAt: number): Event {
    const tags: string[][] = [];
    tags.push(["d", this.identifier]);

    for (const [eventId, channelConfiguration] of data.entries()) {
      const relayUrls = channelConfiguration.channelMeta.relayUrls;
      if (relayUrls) {
        const url = relayUrls[0];
        if (url) {
          tags.push(["e", eventId, url]);
          continue;
        }
      }
      tags.push(["e", eventId]);
    }
    return createEvent({
      kind: this.kind,
      tags,
    });
  }
  hasJoin(eventId: string) {
    return this.getData().has(eventId);
  }
  joinChannel(
    eventId: string,
    opt?: { relays?: [string]; channelMetadata?: ChannelMetadata }
  ) {
    if (!eventId) return;
    const channelConfiguration = this.getData();

    const channel = channelConfiguration.get(eventId);
    if (channel) {
      return;
    }
    const changeId = this.toChanged();

    const channelMetadata: ChannelConfigurationData = {
      eventId,
      channelMeta: opt?.channelMetadata ?? {},
    };

    if (!opt?.channelMetadata) {
      this.reqMetadata(eventId, channelMetadata, changeId);
    }

    channelConfiguration.set(eventId, channelMetadata);

    this.save();
  }
  private reqMetadata(
    eventId: string,
    channelMetadata: ChannelConfigurationData,
    changeId?: number
  ) {
    const line = getChannelMetadataBeltlineByChannelId(eventId);

    const debounceUpdateMetadata = debounce(
      (metadata: ChannelMetadata, subId?: string) => {
        //如果已经更改，就停止更新
        if (changeId && this.isReChange(changeId)) {
          line.closeReq();
          return;
        }

        Object.assign(channelMetadata.channelMeta, metadata);
      },
      3000
    );
    line.feat.onHasMetadata(debounceUpdateMetadata);
  }

  leaveChannel(eventId: string) {
    if (!eventId) return;

    // 每改变一次加一次，如果中间有新的更新，就会强制停止同步

    const channelConfiguration = this.getData();

    if (!channelConfiguration.has(eventId)) return;
    this.toChanged();

    channelConfiguration.delete(eventId);

    this.save();
  }
}
