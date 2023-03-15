export function useToRelayInfo() {
  const router = useRouter();

  return {
    toRelayInfoView(url: string) {
      router.push({ name: "relay-info-view", params: { url } });
    },
  };
}
const localAllNips = useLocalStorage<number[]>(
  "all-nips",
  [1, 2, 4, 9, 11, 12, 15, 16, 20, 22, 26, 28, 33, 40, 42]
);
const allNips = ref(new Set<number>(localAllNips.value));

watch(allNips, () => {
  localAllNips.value = [...allNips.value];
});

export function useAllNips() {
  return allNips;
}

export interface RelayMetaData {
  name: string;
  description: string;
  pubkey: string;
  contact: string;
  supported_nips: number[];
  supported_nip_extensions: string[];
  software: string;
  version: string;
  limitation: Limitation;
  payments_url: string;
  fees: Fees;
}
interface Fees {
  admission: Admission[];
  publication: any[];
}
interface Admission {
  amount: number;
  unit: string;
}
interface Limitation {
  max_message_length: number;
  max_subscriptions: number;
  max_filters: number;
  max_limit: number;
  max_subid_length: number;
  min_prefix: number;
  max_event_tags: number;
  max_content_length: number;
  min_pow_difficulty: number;
  auth_required: boolean;
  payment_required: boolean;
}
