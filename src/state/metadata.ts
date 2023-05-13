import { useNostrContainerGet } from "@/components/NostrContainerProvade";
import { TYPES } from "@/nostr/nostr";

export function useUserMetadata(pubkey: Ref<string | null | undefined>) {
  const userApi = useNostrContainerGet(TYPES.UserApi);
  const metadataLine = computed(() => {
    if (!pubkey.value) return null;
    return userApi.getUserMetadataLineByPubkey(pubkey.value);
  });
  return computed(() => {
    if (!metadataLine.value) return null;
    return metadataLine.value.feat.useMetadata(null);
  });
}
