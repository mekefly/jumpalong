import { useEventLine } from '../components/ProvideEventLine'
import { Pubkey, UserApiStaff } from '@jumpalong/nostr-runtime'
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
