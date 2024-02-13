<script lang="ts" setup>
import { toNprofile } from '@jumpalong/nostr-runtime'
// import { useNostrContainerGet } from "./NostrContainerProvade";

const props = defineProps<{ pubkey: string }>()
const { pubkey } = toRefs(props)

// const line = computed(() => userApi.getUserMetadataLineByPubkey(pubkey.value));
// const metadata = computed(() => null);
const nprofile = computed(() => {
  const profilePointer = toNprofile(pubkey.value)

  if (!profilePointer) return pubkey.value
  return profilePointer
})
</script>

<template>
  <RouterLink :to="`/profile/${pubkey}`">
    <!-- <NButton text> @{{ metadata.name ? metadata.name : nprofile }} </NButton> -->
    <NButton text> @{{ nprofile }} </NButton>
  </RouterLink>
</template>

<style scoped></style>
