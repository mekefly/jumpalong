import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { createEvent } from "@/nostr/event";
import { config, rootEventBeltline } from "@/nostr/nostr";
import { createDoNotRepeatStaff } from "@/nostr/staff";
import autoAddRelayurlByPubkeyStaff from "@/nostr/staff/autoAddRelayurlByPubkeyStaff";
import createEoseUnSubStaff from "@/nostr/staff/createEoseUnSubStaff";
import { createLatestEventStaff } from "@/nostr/staff/createLatestEventStaff";
import createUseChannelMetadata, {
  ChannelMetadata,
  parseMetadata,
} from "@/nostr/staff/createUseChannelMetadata";
import createLocalStorageStaff from "@/nostr/staff/storage/createLocalStorageStaff";
import UserUniqueEventStaff from "@/nostr/staff/UserUniqueEventStaff";
import { useCache } from "@/utils/cache";
import { syncInterval } from "@/utils/utils";
import { publishEvent } from "./event";

const kind10002EventBeltline = rootEventBeltline
  .createChild({ preventCircularReferences: true })
  .addFilter({ kinds: [10002] })
  .addStaff(createLocalStorageStaff(1000))
  .addStaff(UserUniqueEventStaff());

export async function sendUserMetadataByPubkey(userMetaData: UserMetaData) {
  return new Promise<void>((resolve, reject) => {
    const event = createEvent({
      kind: 0,
      content: JSON.stringify(userMetaData),
    });
    setTimeout(reject, 20000);
    publishEvent(event, {
      ok() {
        resolve();
      },
    });
  });
}

// export async function getUserMetadataByPubkey(
//   author: string,
//   options?: { relayUrls?: ReadonlySet<string> }
// ) {
//   return Promise.race([
//     getUserMetadataByRelayListMetadata(author),
//     toUserMetadataById(
//       options?.relayUrls ?? (relayConfigurator.getReadList() as any),
//       author
//     ),
//   ]);
// }
// async function getUserMetadataByRelayListMetadata(author: string) {
//   const relayListMetadataByPubkey = await getRelayListMetadataByPubkey(author);
//   if (!relayListMetadataByPubkey) {
//     throw new Error("出错了");
//   }
//   return toUserMetadataById(relayListMetadataByPubkey[0], author);
// }
export function getUserMetadataLineByPubkey(pubkey: string) {
  return useCache(
    `getUserMetadataLineByPubkey:${pubkey}`,
    () => {
      console.log("getUserMetadataLineByPubkey");

      const line = rootEventBeltline
        .createChild({
          slef: reactive({}),
        })
        .addFilter({
          authors: [pubkey],
          kinds: [0],
        })
        .addStaff(createLocalStorageStaff(1))
        .addStaff(createLatestEventStaff())
        .addStaff(createUseChannelMetadata())
        .addStaff(createEoseUnSubStaff());

      const req = () => {
        line.addReadUrl();
        line.addStaff(autoAddRelayurlByPubkeyStaff(pubkey));
      };

      if (line.feat.isHas()) {
        syncInterval(
          `getUserMetadataLineByPubkey${pubkey}`,
          req,
          config.syncInterval7
        );
      } else {
        syncInterval(
          `getUserMetadataLineByPubkey${pubkey}`,
          req,
          config.syncInterval
        );
      }

      syncInterval(`getUserMetadataLineByPubkey${pubkey}`, () => {});

      return line;
    },
    {
      useLocalStorage: false,
    }
  );
}
export function getLocalKind0() {
  // return useCache(
  //   "getLocalKind0",
  //   () => {
  const list: ChannelMetadata[] = reactive([]);
  const line = createEventBeltlineReactive()
    .addFilter({
      limit: 30,
      kinds: [0],
    })
    .addStaff(createDoNotRepeatStaff())
    .addStaff({
      push(event) {
        const metadata = parseMetadata(event);
        list.push(metadata);
      },
      feat: {
        getMetadataList() {
          return list;
        },
      },
    });

  return line;
  // },
  //   {
  //     useLocalStorage: false,
  //   }
  // );
}

// function toUserMetadataById(url: Set<string>, author: string) {
//   return new Promise<UserMetaData>(async (resolve, reject) => {
//     const subIds = await sub([{ kinds: [0], authors: [author] }], {
//       describe: "获取用户详细信息",
//       useCache: true,
//       relayUrls: url,
//       even(e) {
//         let metadata: UserMetaData = {};
//         try {
//           metadata = JSON.parse(e.content);
//         } catch (error) {}
//         unSub(subIds);
//         resolve(metadata);
//       },
//     });
//   });
// }

export interface userKey {
  privateKey: string;
  publicKey: string;
}

export interface UserMetaData {
  name?: string;
  about?: string;
  picture?: string;
  nip05?: string;
}
