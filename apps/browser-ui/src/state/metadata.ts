import { useEventLine } from '../components/ProvideEventLine'
import { Pubkey, UserApiStaff, UserMetaData } from '@jumpalong/nostr-runtime'
import { Metadata } from '../types/MetaData'

export function useUserMetadata<m extends Metadata>(
  pubkey:
    | Ref<string | Pubkey | null | undefined>
    | globalThis.ComputedRef<Pubkey | string | null | undefined>
) {
  let line = useEventLine(UserApiStaff)
  const metadataLine = computed(() => {
    if (!pubkey.value) return null
    return line.getUserMetadataLineByPubkey(pubkey.value)
  })
  return computed<m | null>(() => {
    if (!metadataLine.value) return null
    return metadataLine.value.getMetadata()
  })
}
export function useName(
  pubkey: Ref<string | Pubkey> | globalThis.ComputedRef<Pubkey | string>
) {
  const _pubkey = computed(() => Pubkey.fromMaybeHex(pubkey.value))
  const npub = computed(() => _pubkey.value?.toNpub())
  const metadata = useUserMetadata<UserMetaData>(pubkey)
  return computed(() => {
    let _metadata = metadata.value
    return (
      (_metadata &&
        (_metadata.name ||
          _metadata.username ||
          _metadata.displayName ||
          _metadata.display_name ||
          _metadata.nip05)) ||
      `${npub.value.slice(0, 5)}...${npub.value.slice(npub.value.length - 5)}`
    )
  })
}
