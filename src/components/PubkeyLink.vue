<script lang="ts" setup>
import { getUserMetadataLineByPubkey } from "@/api/user";
import { toNprofile } from "@/utils/nostr";

const props = defineProps<{ pubkey: string }>();
const { pubkey } = toRefs(props);

const line = computed(() => getUserMetadataLineByPubkey(pubkey.value));
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
