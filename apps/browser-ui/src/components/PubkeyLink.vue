<script lang="ts" setup>
import { Pubkey, UserMetaData } from '@jumpalong/nostr-runtime'
import { NButton } from 'naive-ui'
import { RouterLink } from 'vue-router'

import { useName, useUserMetadata } from '../state/metadata'
// import { useNostrContainerGet } from "./NostrContainerProvade";

const props = defineProps<{ pubkey: string | Pubkey }>()

// const line = computed(() => userApi.getUserMetadataLineByPubkey(pubkey.value));
const pubkey = computed(() =>
  typeof props.pubkey === 'string' ? Pubkey.fromHex(props.pubkey) : props.pubkey
)
// const metadata = useUserMetadata<UserMetaData>(pubkey)
// const nprofile = computed(() => {
//   const profilePointer = toNprofile(pubkey.value)

//   if (!profilePointer) return pubkey.value
//   return profilePointer
// })
const name = useName(pubkey)
</script>

<template>
  <RouterLink :to="`/profile/${pubkey}`">
    <NButton text> {{ name }} </NButton>
  </RouterLink>
</template>

<style scoped></style>
