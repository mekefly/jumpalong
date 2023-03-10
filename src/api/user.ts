import { useLocalStorage } from "@vueuse/core";
import { getPublicKey, nip19 } from "nostr-tools";
import { computed, type Ref } from "vue";
import { unSub } from "../nostr/relay";
import { createEvent, publishEvent } from "./event";
import { createPrikey, PRIVATE_KEY } from "./login";
import { getRelayListMetadataByPubkey, relayConfigurator, sub } from "./relays";

/**
 *  私钥
 */
export const privateKey: Ref<string> = useLocalStorage(
  PRIVATE_KEY,
  createPrikey
);

/**
 *  用户公私钥
 */
export const userKey = computed(() => {
  return {
    privateKey: privateKey.value,
    publicKey: privateKey.value ? getPublicKey(privateKey.value) : "",
  };
});

export const nproKey = computed(() =>
  nip19.nprofileEncode({ pubkey: userKey.value.publicKey, relays: [] })
);

export const npubKey = computed(() =>
  nip19.npubEncode(userKey.value.publicKey)
);

export const nsecKey = computed(() =>
  nip19.nsecEncode(userKey.value.privateKey)
);

export function deEncodeNproKey(nprofile: string): nip19.ProfilePointer {
  const nproObject = nip19.decode(nprofile);

  if (nproObject.type === "nprofile") return nproObject.data as any;
  throw new Error("Not a nprofile!");
}

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

export async function getUserMetadataByPubkey(
  author: string,
  options?: { relayUrls?: ReadonlySet<string> }
) {
  return Promise.race([
    getUserMetadataByRelayListMetadata(author),
    toUserMetadataById(
      options?.relayUrls ?? (relayConfigurator.getReadList() as any),
      author
    ),
  ]);
}

async function getUserMetadataByRelayListMetadata(author: string) {
  const relayListMetadataByPubkey = await getRelayListMetadataByPubkey(author);
  if (!relayListMetadataByPubkey) {
    throw new Error("出错了");
  }
  return toUserMetadataById(relayListMetadataByPubkey[0], author);
}

function toUserMetadataById(url: Set<string>, author: string) {
  return new Promise<UserMetaData>(async (resolve, reject) => {
    const subIds = await sub([{ kinds: [0], authors: [author] }], {
      useCache: true,
      relayUrls: url,
      even(e) {
        let metadata: UserMetaData = {};
        try {
          metadata = JSON.parse(e.content);
        } catch (error) {}
        unSub(subIds);
        resolve(metadata);
      },
    });
  });
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
}
