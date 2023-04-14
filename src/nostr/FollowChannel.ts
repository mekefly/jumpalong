import { getChannelMetadataBeltlineByChannelId } from "@/api/channel";
import { getEventLineById } from "@/api/event";
import { getUserRelayUrlConfigByPubkey } from "@/api/user";
import { useCache } from "@/utils/cache";
import { debounce, setAdds } from "@/utils/utils";
import { Event } from "nostr-tools";
import { AddressPointer } from "nostr-tools/lib/nip19";
import { createEvent } from "./event";
import { nostrApi } from "./nostr";
import { ParameterizedReplaceableEventSyncAbstract } from "./ParameterizedReplaceableEventSyncAbstract";
import { ChannelMetadata } from "./staff/createUseChannelMetadata";
import { deserializeTagE, deserializeTagR } from "./tag";
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
  channelId: string;
  creator?: string;
  relayUrls: Set<string>;
  event?: Event;
};
type ChannelConfigurationType = Map<string, ChannelConfigurationData>;
export class FollowChannel extends ParameterizedReplaceableEventSyncAbstract<ChannelConfigurationType> {
  identifier: string = "follower-channel";
  kind: number = 30001;
  constructor() {
    super("follower-channel", new Map());
  }
  public async getAddressPointers(): Promise<AddressPointer[]> {
    const pubkey = await nostrApi.getPublicKey();
    return [
      {
        identifier: this.identifier,
        kind: this.kind,
        pubkey: pubkey,
      },
    ];
  }
  public async serializeToData(e: Event): Promise<ChannelConfigurationType> {
    const channelConfiguration: ChannelConfigurationType = new Map();
    const tagEs = deserializeTagE(e.tags);
    for (const tag of tagEs) {
      const { eventId, relay, marker } = tag;
      const data = this.getData();
      const channelConfigurationData: ChannelConfigurationData = {
        channelMeta: { relayUrls: [relay] },
        channelId: eventId,
        relayUrls: new Set(),
      };
      const oldChannelConfigurationData = channelConfiguration.get(eventId);

      if (!oldChannelConfigurationData) {
        this.reqMetadata(eventId, channelConfigurationData);
      }

      channelConfiguration.set(eventId, channelConfigurationData);
    }
    return channelConfiguration;
  }
  public async deserializeToEvent(
    data: ChannelConfigurationType,
    createAt: number
  ): Promise<Event> {
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
  setChannelmetadata(eventId: string, channelMetadata: ChannelMetadata) {
    const channelConfigurationData = this.getData().get(eventId);
    channelConfigurationData &&
      (channelConfigurationData.channelMeta = channelMetadata);
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
      channelId: eventId,
      channelMeta: opt?.channelMetadata ?? {},
      relayUrls: new Set(),
    };

    if (!opt?.channelMetadata) {
      this.reqMetadata(eventId, channelMetadata, changeId);
    }

    channelConfiguration.set(eventId, channelMetadata);

    this.save();
  }
  private reqMetadata(
    channelId: string,
    channelConfigurationData: ChannelConfigurationData,
    changeId?: number
  ) {
    const line = getChannelMetadataBeltlineByChannelId(channelId);

    const debounceUpdateMetadata = debounce(
      (metadata: ChannelMetadata, subId?: string) => {
        //如果已经更改，就停止更新
        if (changeId && this.isReChange(changeId)) {
          line.closeReq();
          return;
        }

        Object.assign(channelConfigurationData.channelMeta, metadata);

        setAdds(
          channelConfigurationData.relayUrls,
          channelConfigurationData.channelMeta.relayUrls ?? []
        );
      },
      3000
    );
    line.feat.onHasMetadata(debounceUpdateMetadata);

    //获取event
    const eventLine = getEventLineById(channelId);
    eventLine.feat.onHasEventOnce((e) => {
      const pubkey = e.pubkey;

      channelConfigurationData.creator = pubkey;
      channelConfigurationData.event = e;

      //推荐中继
      const urls = deserializeTagR(e.tags);
      setAdds(channelConfigurationData.relayUrls, urls);

      //请求推荐中继
      getUserRelayUrlConfigByPubkey(pubkey).feat.onHasReadWriteList(
        (writableReadableList) => {
          setAdds(
            channelConfigurationData.relayUrls,
            writableReadableList.writeUrl
          );
          setAdds(
            channelConfigurationData.relayUrls,
            writableReadableList.readUrl
          );
        }
      );
    });
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
