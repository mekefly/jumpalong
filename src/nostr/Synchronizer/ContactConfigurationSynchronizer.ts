import { createEvent } from "@/nostr/event";
import { rootEventBeltline, TYPES } from "@/nostr/nostr";
import { createLatestEventStaff } from "@/nostr/staff/createLatestEventStaff";
import createUseChannelMetadata from "@/nostr/staff/createUseChannelMetadata";
import ReplaceableSynchronizerAbstract from "@/nostr/Synchronizer/abstract/ReplaceableSynchronizerAbstract";
import {
  deserializeTagE,
  deserializeTagP,
  serializeTagE,
  type TagE,
} from "@/nostr/tag";
import { ContactConfigurationType } from "@/types/Contact";
import { ContactMetaData } from "@/types/ContactMetaData";
import { getPubkeyOrNull } from "@/utils/nostrApiUse";
import { debounce } from "@/utils/utils";
import { inject, injectable } from "inversify";
import { type Event, type Filter } from "nostr-tools";
import { logger } from "../../api/Contact";
import { type UserApi } from "../../api/user";
import { type ChannelMetadata } from "../../types/ChannelMetadata";

export type ContactConfigurationDatas = {
  contactConfiguration: ContactConfigurationType;
  channelConfiguration: ChannelConfigurationType;
};
export type ChannelConfigurationData = ChannelMetadata & TagE;
type ChannelConfigurationType = Map<string, ChannelConfigurationData>;

@injectable()
export class ContactConfigurationSynchronizer extends ReplaceableSynchronizerAbstract<ContactConfigurationDatas> {
  constructor(
    @inject(TYPES.UserApi)
    private userApi: UserApi
  ) {
    super("ContactConfiguration");
    logger.verbose("new ContactConfiguration()");
  }

  createDefault(): ContactConfigurationDatas {
    return {
      contactConfiguration: {},
      channelConfiguration: new Map(),
    };
  }

  async getFilters(): Promise<Filter[]> {
    const pubkey = await getPubkeyOrNull();
    if (!pubkey) return [];

    return [{ kinds: [3], authors: [pubkey] }];
  }

  public async serializeToData(e: Event): Promise<ContactConfigurationDatas> {
    const contactConfiguration: ContactConfigurationType = {};
    const pubkeyTagList = deserializeTagP(e.tags);
    for (const { name, pubkey, relayUrl } of pubkeyTagList) {
      contactConfiguration[pubkey] = { name, pubkey, relayUrl: relayUrl };
    }

    const channelConfiguration = new Map();
    const tagEs = deserializeTagE(e.tags);

    for (const tag of tagEs) {
      //可以获取已经下载到本地的40 41 metadata
      const line = rootEventBeltline
        .createChild()
        .addFilter({ kinds: [41], "#e": [tag.eventId] })
        .addFilter({ ids: [tag.eventId], kinds: [40] })
        .addStaff(createLatestEventStaff())
        .addStaff(createUseChannelMetadata());

      line.feat.onHasLatestEvent((metadata) => {
        Object.assign(tag, metadata);
      });

      line.addExtends(rootEventBeltline);

      channelConfiguration.set(tag.eventId, tag);
    }

    return { contactConfiguration, channelConfiguration };
  }
  getContactConfiguration() {
    return this.getDataSync()["contactConfiguration"];
  }
  public async deserializeToEvent(
    data: ContactConfigurationDatas,
    createAt: number
  ): Promise<Event> {
    const contactConfiguration = data["contactConfiguration"];
    const tagPs = Object.entries(contactConfiguration).map(
      ([pubkey, { name, relayUrl }]) =>
        ["p", pubkey, relayUrl, name].filter(Boolean)
    ) as string[][];

    const channelConfiguration = data["channelConfiguration"];
    const tagEs = serializeTagE(
      Array.from(channelConfiguration.entries(), ([k, v]) => v)
    );
    return createEvent({
      kind: 3,
      tags: [...tagPs, ...tagEs],
      created_at: createAt,
    });
  }

  getChannelConfiguration() {
    return this.getDataSync().channelConfiguration;
  }
  getChannelList(): ChannelConfigurationData[] {
    return Array.from(this.getChannelConfiguration()).map(([k, v]) => v);
  }

  follow(pubkey?: string, relayUrl?: string, name?: string) {
    if (!pubkey) return;

    // 每改变一次加一次，如果中间有新的更新，就会强制停止同步
    const contactConfiguration = this.getDataSync()["contactConfiguration"];

    const contactMetaData: ContactMetaData = (contactConfiguration[pubkey] = {
      pubkey,
      name: name ?? "",
      relayUrl: relayUrl ?? "",
    });

    const changeId = this.toChanged();

    const line = this.userApi.getUserMetadataLineByPubkey(pubkey);

    const debounceUpdateMetadata = debounce(
      (metadata: ChannelMetadata, subId?: string) => {
        // if (this.isReChange(changeId)) {
        //   line.closeReq();
        //   return;
        // }
        Object.assign(contactMetaData, metadata);
        if (metadata.relayUrls && metadata.relayUrls.length > 0) {
          contactMetaData.relayUrl = metadata.relayUrls[0];
        } else {
          const url = line.getUrlBySubId(subId ?? "");
          if (url) {
            contactMetaData.relayUrl = url;
          }
        }
      }
    );

    this.save();
    line.feat.onHasMetadata(debounceUpdateMetadata);
  }

  unFollow(pubkey?: string) {
    if (!pubkey) return;

    // 每改变一次加一次，如果中间有新的更新，就会强制停止同步
    const contactConfiguration = this.getDataSync().contactConfiguration;

    if (contactConfiguration[pubkey] === undefined) return;
    this.toChanged();

    delete contactConfiguration[pubkey];

    this.save();
  }
  isFollow(pubkey: string) {
    return Boolean(this.getDataSync()["contactConfiguration"][pubkey]);
  }
}
