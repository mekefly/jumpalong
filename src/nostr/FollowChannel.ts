import { CahnnelMessageBeltline } from "@/api/channel";
import { EventApi } from "@/api/event";
import { UserApi } from "@/api/user";
import { debounce, setAdds } from "@/utils/utils";
import { inject, injectable } from "inversify";
import { Event } from "nostr-tools";
import { AddressPointer } from "nostr-tools/lib/nip19";
import { ParameterizedReplaceableEventSyncAbstract } from "./ParameterizedReplaceableEventSyncAbstract";
import { createEvent } from "./event";
import { TYPES, nostrApi, nostrContainer } from "./nostr";
import { ChannelMetadata } from "./staff/createUseChannelMetadata";
import { deserializeTagE, deserializeTagR } from "./tag";

export type ChannelConfigurationData = {
  channelMeta: ChannelMetadata;
  channelId: string;
  creator?: string;
  relayUrls: Set<string>;
  event?: Event;
};
type ChannelConfigurationType = Map<string, ChannelConfigurationData>;
@injectable()
export class FollowChannel extends ParameterizedReplaceableEventSyncAbstract<ChannelConfigurationType> {
  createDefault(): ChannelConfigurationType {
    return new Map();
  }
  identifier: string = "follower-channel";
  kind: number = 30001;

  constructor(
    @inject(TYPES.UserApi)
    private userApi: UserApi,
    @inject(TYPES.EventApi)
    private eventApi: EventApi
  ) {
    super("follower-channel");
    this.sync();
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
  getFollowChannel() {
    return this.getDataSync();
  }
  hasJoin(eventId: string) {
    return this.getFollowChannel().has(eventId);
  }
  setChannelmetadata(eventId: string, channelMetadata: ChannelMetadata) {
    const channelConfigurationData = this.getFollowChannel().get(eventId);
    channelConfigurationData &&
      (channelConfigurationData.channelMeta = channelMetadata);
  }
  async joinChannel(
    eventId: string,
    opt?: { relays?: [string]; channelMetadata?: ChannelMetadata }
  ) {
    if (!eventId) return;
    const channelConfiguration = this.getFollowChannel();

    const channel = channelConfiguration.get(eventId);
    if (channel) {
      return;
    }
    await this.toChanged();

    const channelMetadata: ChannelConfigurationData = {
      channelId: eventId,
      channelMeta: opt?.channelMetadata ?? {},
      relayUrls: new Set(),
    };

    if (!opt?.channelMetadata) {
      this.reqMetadata(eventId, channelMetadata);
    }

    channelConfiguration.set(eventId, channelMetadata);

    this.save();
  }
  private reqMetadata(
    channelId: string,
    channelConfigurationData: ChannelConfigurationData
  ) {
    const cahnnelMessageBeltline = nostrContainer.get<CahnnelMessageBeltline>(
      TYPES.CahnnelMessageBeltline
    );
    const line =
      cahnnelMessageBeltline.getChannelMetadataBeltlineByChannelId(channelId);

    const debounceUpdateMetadata = debounce(
      (metadata: ChannelMetadata, subId?: string) => {
        //如果已经更改，就停止更新
        // if (changeId && this.isReChange(changeId)) {
        //   line.closeReq();
        //   return;
        // }

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
    const eventLine = this.eventApi.getEventLineById(channelId);
    eventLine.feat.onHasEventOnce((e) => {
      const pubkey = e.pubkey;

      channelConfigurationData.creator = pubkey;
      channelConfigurationData.event = e;

      //推荐中继
      const urls = deserializeTagR(e.tags);
      setAdds(channelConfigurationData.relayUrls, urls);

      //请求推荐中继
      this.userApi
        .getUserRelayUrlConfigByPubkey(pubkey)
        .feat.onHasReadWriteList((writableReadableList) => {
          setAdds(
            channelConfigurationData.relayUrls,
            writableReadableList.writeUrl
          );
          setAdds(
            channelConfigurationData.relayUrls,
            writableReadableList.readUrl
          );
        });
    });
  }

  leaveChannel(eventId: string) {
    if (!eventId) return;

    // 每改变一次加一次，如果中间有新的更新，就会强制停止同步

    const channelConfiguration = this.getFollowChannel();

    if (!channelConfiguration.has(eventId)) return;
    this.toChanged();

    channelConfiguration.delete(eventId);

    this.save();
  }
}
