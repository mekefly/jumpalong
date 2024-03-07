export function useToRelayInfo() {
  const router = useRouter()

  return {
    toRelayInfoView(url: string) {
      router.push({ name: 'relay-info', params: { url } })
    },
  }
}
const localAllNips = useLocalStorage<number[]>(
  'all-nips',
  [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 30, 31, 32, 33, 36, 38, 39, 40, 42, 44, 45, 46,
    47, 48, 50, 51, 52, 53, 56, 57, 58, 65, 72, 75, 78, 84, 89, 90, 94, 96, 98,
    99,
  ]
)
const allNips = ref(new Set<number>(localAllNips.value))

watch(allNips, () => {
  localAllNips.value = [...allNips.value]
})

export function useAllNips() {
  return allNips
}

export interface RelayMetaData {
  name: string
  description: string
  pubkey: string
  contact: string
  supported_nips: number[]
  supported_nip_extensions: string[]
  software: string
  version: string
  limitation: Limitation
  payments_url: string
  fees: Fees
}
interface Fees {
  admission: Admission[]
  publication: any[]
}
interface Admission {
  amount: number
  unit: string
}
interface Limitation {
  max_message_length: number
  max_subscriptions: number
  max_filters: number
  max_limit: number
  max_subid_length: number
  min_prefix: number
  max_event_tags: number
  max_content_length: number
  min_pow_difficulty: number
  auth_required: boolean
  payment_required: boolean
}
