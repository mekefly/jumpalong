<script lang="ts" setup>
import { TYPES } from "@/nostr/nostr";
import { toNprofile } from "@/utils/nostr";
import { useNostrContainerGet } from "./NostrContainerProvade";

const props = defineProps<{ pubkey: string }>();
const { pubkey } = toRefs(props);

const userApi = useNostrContainerGet(TYPES.UserApi);

const line = computed(() => userApi.getUserMetadataLineByPubkey(pubkey.value));
const metadata = computed(() => line.value.feat.useMetadata());
const nprofile = computed(() => {
  const profilePointer = toNprofile(pubkey.value);

  if (!profilePointer) return pubkey.value;
  return profilePointer;
});
</script>

<template>
  <RouterLink :to="`/profile/${pubkey}`">
    <NButton text> @{{ metadata.name ? metadata.name : nprofile }} </NButton>
  </RouterLink>
</template>

<style scoped></style>
