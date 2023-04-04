import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { createEvent } from "@/nostr/event";
import { rootEventBeltline } from "@/nostr/nostr";
import { createDoNotRepeatStaff } from "@/nostr/staff";
import autoAddRelayurlByPubkeyStaff from "@/nostr/staff/autoAddRelayurlByPubkeyStaff";
import createEoseUnSubStaff from "@/nostr/staff/createEoseUnSubStaff";
import { createLatestEventStaff } from "@/nostr/staff/createLatestEventStaff";
import createRefreshLoadStaff from "@/nostr/staff/createRefreshLoadStaff";
import createTimeoutUnSubStaff from "@/nostr/staff/createTimeoutUnSubStaff";
import createUseChannelMetadata, {
  ChannelMetadata,
} from "@/nostr/staff/createUseChannelMetadata";
import createWithEvent from "@/nostr/staff/createWithEvent";
import {
  deserializeTagE,
  deserializeTagP,
  serializeTagE,
  TagE,
} from "@/nostr/tag";
import { useCache } from "@/utils/cache";
import { debounce } from "@/utils/utils";
import { Event, Filter } from "nostr-tools";
import { ReplaceableEventSyncAbstract } from "../nostr/ReplaceableEventSyncAbstract";
import { userKey } from "../nostr/user";
import { getChannelMetadataBeltlineByChannelId } from "./channel";
import { getUserMetadataLineByPubkey, UserMetaData } from "./user";

type ContactConfigurationDatas = {
  contactConfiguration: ContactConfigurationType;
  channelConfiguration: ChannelConfigurationType;
};
type ChannelConfigurationType = Map<string, ChannelConfigurationData>;
export type ChannelConfigurationData = ChannelMetadata & TagE;

class ContactConfiguration extends ReplaceableEventSyncAbstract<ContactConfigurationDatas> {
  constructor() {
    super("ContactConfiguration", {
      contactConfiguration: {},
      channelConfiguration: new Map(),
    });
  }

  getFilters(): Filter[] {
    return [{ kinds: [3], authors: [userKey.value.publicKey] }];
  }

  serializeToData(e: Event): ContactConfigurationDatas {
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
    return this.getData()["contactConfiguration"];
  }
  deserializeToEvent(data: ContactConfigurationDatas, createAt: number): Event {
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

  joinChannel(eventId: string, relay?: string) {
    if (!eventId) return;

    // 每改变一次加一次，如果中间有新的更新，就会强制停止同步

    const channelConfiguration = this.getData()["channelConfiguration"];

    const channel = channelConfiguration.get(eventId);
    if (channel) {
      return;
    }
    this.toChanged();
    const channelMetadata: ChannelConfigurationData = {
      eventId,
      marker: "root",
      relay: relay ?? "",
      type: "",
    };

    const changeId = this.toChanged();
    channelConfiguration.set(eventId, channelMetadata);

    this.save();

    const line = getChannelMetadataBeltlineByChannelId(eventId);

    const debounceUpdateMetadata = debounce(
      (metadata: ChannelMetadata, subId?: string) => {
        if (this.isReChange(changeId)) {
          line.closeReq();
          return;
        }

        Object.assign(channelMetadata, metadata);
        if (metadata.relayUrls && metadata.relayUrls.length > 0) {
          channelMetadata.relay = metadata.relayUrls[0];
        } else {
          const url = line.getUrlBySubId(subId ?? "");
          if (url) {
            channelMetadata.relay = url;
          }
        }

        this.save();
      },
      3000
    );
    line.feat.onHasMetadata(debounceUpdateMetadata);
  }
  leaveChannel(eventId: string) {
    if (!eventId) return;

    // 每改变一次加一次，如果中间有新的更新，就会强制停止同步

    const channelConfiguration = this.getData().channelConfiguration;

    if (!channelConfiguration.has(eventId)) return;
    this.toChanged();

    channelConfiguration.delete(eventId);

    this.save();
  }

  getChannelConfiguration() {
    return this.getData().channelConfiguration;
  }
  getChannelList(): ChannelConfigurationData[] {
    return Array.from(this.getChannelConfiguration()).map(([k, v]) => v);
  }

  follow(pubkey?: string, relayUrl?: string, name?: string) {
    if (!pubkey) return;

    // 每改变一次加一次，如果中间有新的更新，就会强制停止同步

    const contactConfiguration =
      this.getDataAndChange()["contactConfiguration"];

    const contactMetaData: ContactMetaData = (contactConfiguration[pubkey] = {
      pubkey,
      name: name ?? "",
      relayUrl: relayUrl ?? "",
    });

    const changeId = this.toChanged();

    this.save();

    const line = getUserMetadataLineByPubkey(pubkey);

    const debounceUpdateMetadata = debounce(
      (metadata: ChannelMetadata, subId?: string) => {
        if (this.isReChange(changeId)) {
          line.closeReq();
          return;
        }

        Object.assign(contactMetaData, metadata);
        if (metadata.relayUrls && metadata.relayUrls.length > 0) {
          contactMetaData.relayUrl = metadata.relayUrls[0];
        } else {
          const url = line.getUrlBySubId(subId ?? "");
          if (url) {
            contactMetaData.relayUrl = url;
          }
        }

        this.save();
      }
    );
    line.feat.onHasMetadata(debounceUpdateMetadata);
  }

  unFollow(pubkey?: string) {
    if (!pubkey) return;

    // 每改变一次加一次，如果中间有新的更新，就会强制停止同步

    const contactConfiguration = this.getData().contactConfiguration;

    if (contactConfiguration[pubkey] === undefined) return;
    this.toChanged();

    delete contactConfiguration[pubkey];

    this.save();
  }
  isFollow(pubkey: string) {
    return Boolean(this.getData()["contactConfiguration"][pubkey]);
  }
}
const contactConfiguration: ContactConfiguration = reactive(
  new ContactConfiguration()
) as any;

setTimeout(() => {
  contactConfiguration.sync();
}, 0);

export default contactConfiguration;

export function getContactListLineByPubkey(
  pubkey: string,
  opts?: { urls?: Set<string> }
) {
  return useCache(
    `getContactListLineByPubkey:${pubkey}`,
    () => {
      const line = createEventBeltlineReactive()
        .addFilter({ kinds: [3], authors: [pubkey] })
        .addStaff(createLatestEventStaff())
        .addStaff(createEoseUnSubStaff())
        .addStaff(createTimeoutUnSubStaff())
        .addStaff({
          feat: {
            getContactList() {
              const event = this.beltline.feat.getLatestEvent();
              if (!event) return [];
              return deserializeTagP(event.tags);
            },
          },
        })
        .addStaff(createWithEvent());

      const req = async () => {
        line.addRelayUrls(opts?.urls);
        line.addStaff(autoAddRelayurlByPubkeyStaff(pubkey));
        line.addReadUrl();
      };
      req();

      return line;
    },
    {
      useLocalStorage: false,
    }
  );
}
type GetFollowerLineByPubkeyOptions = { urls: Set<string> };
export function getFollowerLineByPubkey(
  pubkey: string,
  opts?: GetFollowerLineByPubkeyOptions
) {
  return useCache(
    `getFollowerLineByPubkey:${pubkey}`,
    () => {
      const line = createEventBeltlineReactive({
        name: "getFollowerLineByPubkey",
      })
        .addStaff(createRefreshLoadStaff([{ kinds: [3], "#p": [pubkey] }], 100))
        .addStaff(createDoNotRepeatStaff())
        .addStaff(autoAddRelayurlByPubkeyStaff(pubkey))
        .addReadUrl()
        .addRelayUrls(opts?.urls);

      line.feat.load();
      return line;
    },
    {
      useLocalStorage: false,
      duration: 100_000,
    }
  );
}

type ContactConfigurationType = Record<string, ContactMetaData>;

export interface ContactMetaData extends UserMetaData {
  name: string;
  relayUrl: string;
  pubkey: string;
}
