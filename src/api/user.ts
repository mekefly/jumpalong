import { createEventBeltlineReactive } from "@/nostr/createEventBeltline";
import { createEvent } from "@/nostr/event";
import { config, rootEventBeltline } from "@/nostr/nostr";
import ReplaceableEventMap from "@/nostr/ReplaceableEventMap";
import { createDoNotRepeatStaff } from "@/nostr/staff";
import autoAddRelayurlByPubkeyStaff from "@/nostr/staff/autoAddRelayurlByPubkeyStaff";
import createEoseUnSubStaff from "@/nostr/staff/createEoseUnSubStaff";
import { createLatestEventStaff } from "@/nostr/staff/createLatestEventStaff";
import createReadWriteListStaff, {
  createGetReadWriteListStaff,
} from "@/nostr/staff/createReadWriteListStaff";
import createTimeoutUnSubStaff from "@/nostr/staff/createTimeoutUnSubStaff";
import createUseChannelMetadata, {
  ChannelMetadata,
  parseMetadata,
} from "@/nostr/staff/createUseChannelMetadata";
import createWithEvent from "@/nostr/staff/createWithEvent";
import ReplaceableEventMapStaff from "@/nostr/staff/ReplaceableEventMapStaff";
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
    publishEvent(event);
  });
}
export function getUserRelayUrlConfigByPubkey(pubkey: string) {
  return useCache(
    `getUserRelayUrlConfigByPubkey:${pubkey}`,
    () => {
      const kind10002line = reactive(rootEventBeltline.createChild())
        .addFilter({
          kinds: [10002],
          authors: [pubkey],
        })
        .addStaff(createLatestEventStaff())
        .addStaff(ReplaceableEventMapStaff(10002, pubkey)) // 本地缓存
        .addStaff(createReadWriteListStaff()) // 创建读写配置列表
        .addStaff(createGetReadWriteListStaff()) // 创建读写配置列表
        .addStaff(createWithEvent())
        .addExtends(rootEventBeltline); //请求到的结果从root中也可取到取到

      if (kind10002line.feat.withEvent()) {
        return kind10002line;
      }

      //请求10002
      kind10002line
        .createChild()
        .addStaff(autoAddRelayurlByPubkeyStaff(pubkey));
      return kind10002line;
    },
    {
      useLocalStorage: false,
    }
  );
}

export function getUserMetadataLineByPubkey(pubkey: string, url?: Set<string>) {
  return useCache(
    `getUserMetadataLineByPubkey:${pubkey}`,
    () => {
      const line = rootEventBeltline
        .createChild({
          slef: reactive({}),
        })
        .addFilter({
          authors: [pubkey],
          kinds: [0],
        })
        .addStaff(createLatestEventStaff())
        .addStaff(ReplaceableEventMapStaff(0, pubkey)) //可替换事件缓存
        .addStaff(createUseChannelMetadata())
        .addStaff(createEoseUnSubStaff())
        .addStaff(createTimeoutUnSubStaff());

      const event = ReplaceableEventMap.kind0.get(pubkey);

      if (event) {
        line.pushEvent(event);
        return line;
      }

      const req = () => {
        line.addRelayUrls(url);
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

export interface userKey {
  privateKey: string;
  publicKey: string;
}

export interface UserMetaData {
  name?: string;
  about?: string;
  picture?: string;
  nip05?: string;
  banner?: string;
}
