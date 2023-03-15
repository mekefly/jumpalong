import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { createEvent } from "@/nostr/event";
import { rootEventBeltline } from "@/nostr/nostr";
import autoAddRelayurlByPubkeyStaff from "@/nostr/staff/autoAddRelayurlByPubkeyStaff";
import { createLatestEventStaff } from "@/nostr/staff/createLatestEventStaff";
import createUseChannelMetadata, {
  ChannelMetadata,
} from "@/nostr/staff/createUseChannelMetadata";
import {
  deserializeTagE,
  deserializeTagP,
  serializeTagE,
  TagE,
} from "@/nostr/tag";
import { useCache } from "@/utils/cache";
import { debounce } from "@/utils/utils";
import { Event } from "nostr-tools";
import { userKey } from "../nostr/user";
import { getChannelMetadataBeltlineByChannelId } from "./channel";
import { ReplaceableEventSyncAbstract } from "./ReplaceableEventSyncAbstract";
import { getUserMetadataLineByPubkey, UserMetaData } from "./user";
type ContactConfigurationDatas = {
  contactConfiguration: ContactConfigurationType;
  channelConfiguration: ChannelConfigurationType;
};
type ChannelConfigurationType = Map<string, ChannelConfigurationData>;
export type ChannelConfigurationData = ChannelMetadata & TagE;

class ContactConfiguration extends ReplaceableEventSyncAbstract<ContactConfigurationDatas> {
  constructor() {
    super(
      { kinds: [3], authors: [userKey.value.publicKey] },
      "ContactConfiguration",
      { contactConfiguration: {}, channelConfiguration: new Map() }
    );
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

  joinChannel(eventId: string) {
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
      relay: "",
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

  follow(pubkey?: string) {
    if (!pubkey) return;

    // 每改变一次加一次，如果中间有新的更新，就会强制停止同步

    const contactConfiguration =
      this.getDataAndChange()["contactConfiguration"];

    const contactMetaData: ContactMetaData = (contactConfiguration[pubkey] = {
      pubkey,
      name: "",
      relayUrl: "",
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

export function getContactListLineByPubkey(pubkey: string) {
  return useCache(
    `getContactListLineByPubkey:${pubkey}`,
    () => {
      const line = createEventBeltlineReactive()
        .addFilter({ kinds: [3], authors: [pubkey] })
        .addStaff(createLatestEventStaff())
        .addStaff({
          feat: {
            getContactList() {
              const event = this.beltline.feat.getLatestEvent();
              if (!event) return [];
              return deserializeTagP(event.tags);
            },
          },
        });

      useCache(
        `getContactListLineByPubkey:addReadUrl:${pubkey}`,
        () => {
          setTimeout(() => {
            line.addReadUrl();

            setTimeout(() => {
              line.addStaff(autoAddRelayurlByPubkeyStaff(pubkey));
            }, 3000);
          }, 1_000);
          return true;
        },
        { duration: 100_000 }
      );

      return line;
    },
    {
      useLocalStorage: false,
    }
  );
}

/**
 * 更新联系人列表
 *
 * @export
 */
// export function pullMyContacts() {
//   const con = getContactList(userKey.value.publicKey);
//   watch(con, () => {
//     if (!con.value.createAt) return;
//     if (
//       !localContacts.value.createAt ||
//       con.value.createAt > localContacts.value.createAt
//     ) {
//       localContacts.value = con.value;
//     }
//   });
// }

/**
 * 推送联系人列表
 *
 * @export
 * @return {*}
 */
// export function pushMyContacts() {
//   if (
//     !localContacts.value ||
//     !localContacts.value.contacts ||
//     !localContacts.value.createAt
//   )
//     return;

//   const event = createEvent({
//     kind: 3,
//     created_at: localContacts.value.createAt,
//     tags: Object.keys(localContacts.value.contacts).map((pubkey) => {
//       const c = (localContacts.value.contacts as any)[pubkey];
//       return createTagP(pubkey, c.relay, c.name);
//     }),
//   });
//   publishEvent(event);
// }

/**
 * 关注好友
 *
 * @export
 * @param {string} [pubkey]
 * @return {*}
 */
// export async function followContact(pubkey?: string) {
//   if (!pubkey) return;

//   const up = (c: Contact) => {
//     (localContacts.value.contacts ?? (localContacts.value.contacts = {}))[
//       pubkey
//     ] = c;
//     localContacts.value.createAt = nowSecondTimestamp();
//     pushMyContacts();
//   };
//   createContactByPubkey(pubkey, { reqFull: true, onUp: up });
// }

/**
 * 取消关注
 *
 * @export
 * @param {string} [pubkey]
 * @return {*}
 */
// export function unFollowContact(pubkey?: string) {
//   if (!pubkey) return;
//   if (!localContacts.value?.contacts) return;

//   const c = localContacts.value.contacts[pubkey];
//   if (!c) return;
//   delete localContacts.value.contacts[pubkey];
//   pushMyContacts();
// }

// function createContactByPubkey(
//   pubkey: string,
//   options?: {
//     reqFull?: boolean;
//     onFull?: (c: Contact) => void;
//     onPart?: (c: Contact) => void;
//     onUp?: (c: Contact) => void;
//   }
// ): Contact {
//   const contact = {};

//   options?.reqFull &&
//     getUserMetadataByPubkey(pubkey).then((m) => {
//       Object.assign(contact, m);
//       options?.onFull?.(contact);
//       options?.onUp?.(contact);
//     });
//   options?.onPart?.(contact);
//   options?.onUp?.(contact);
//   return contact;
// }

// function tagsToContactList(tags?: string[][]) {
//   if (!tags) return {};
//   const contact: ContactList = {};
//   tags.forEach((tag) => {
//     if (tag[0] === "p") {
//       //前一部分初始化，后一部分付值到前
//       (contact.contacts ?? (contact.contacts = {}))[tag[1]] = {
//         relay: tag[2],
//         name: tag[3],
//       };
//     }
//   });
//   return contact;
// }

type ContactConfigurationType = Record<string, ContactMetaData>;

export interface ContactMetaData extends UserMetaData {
  name: string;
  relayUrl: string;
  pubkey: string;
}
