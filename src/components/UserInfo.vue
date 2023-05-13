<script lang="ts" setup>
import { TYPES } from "@/nostr/nostr";
import { nip19, type Event } from "nostr-tools";
import profile from "../assets/profile-2-400x400.png";
import { useLazyComponent } from "../utils/use";
import EllipsisVue from "./Ellipsis.vue";
import { useNostrContainerGet } from "./NostrContainerProvade";
import { getUrlsByEvent } from "./PapawSourceUrl";

const props = defineProps<{
  pubkey: string;
  event?: Event;
}>();
const { pubkey } = toRefs(props);

const userApi = useNostrContainerGet(TYPES.UserApi);

const relayUrls = computed(() => props.event && getUrlsByEvent(props.event));
const [metadata1, target, isShow] = useLazyComponent(() => {
  return userApi
    .getUserMetadataLineByPubkey(pubkey.value, {
      urls: relayUrls.value,
    })
    .feat.useMetadata();
});

const metadata = computed(() => {
  return metadata1.value;
});

const router = useRouter();
function routerPush(pubkey: string) {
  router.push(
    `/profile/${nip19.nprofileEncode({
      pubkey,
      relays: [...(relayUrls.value ?? [])],
    })}`
  );
}

const name = computed(() => {
  if (!metadata.value) return pubkey.value.slice(0, 10);
  for (const key of ["name", "display_name", "displayName", "username"]) {
    const n = (metadata.value as any)[key];
    if (n?.length ?? 0 > 0) {
      return n;
    }
  }
  return pubkey.value.slice(0, 10);
});
</script>

<template>
  <div class="flex items-center cursor-pointer w-full" ref="target">
    <img
      class="h-12 w-12 bg-white rounded-full flex-grow-0 flex-shrink-0"
      :src="metadata?.picture ?? profile"
      @click="() => routerPush(pubkey)"
    />
    <div class="flex-grow flex-shrink">
      <div class="font-bold ml-4" @click="() => routerPush(pubkey)">
        <EllipsisVue>
          {{ name }}
        </EllipsisVue>
      </div>
      <div class="ml-4">
        <slot name="bottom" :userInfo="metadata"></slot>
      </div>
    </div>
    <div class="flex-grow-0 flex-shrink-0">
      <slot name="right" :userInfo="metadata"></slot>
    </div>
  </div>
</template>

<style scoped></style>
