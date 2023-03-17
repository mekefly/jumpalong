<script lang="ts" setup>
import ReplaceableEventMap from "@/nostr/ReplaceableEventMap";
import { parseMetadata } from "@/nostr/staff/createUseChannelMetadata";
import { getUserMetadataLineByPubkey } from "../api/user";
import profile from "../assets/profile-2-400x400.png";
import { useLazyComponent } from "../utils/use";

const props = defineProps<{ pubkey: string; created_at: number }>();
const { pubkey, created_at } = toRefs(props);

const [metadata1, target, isShow] = useLazyComponent(() => {
  return getUserMetadataLineByPubkey(pubkey.value).feat.useMetadata();
});

const metadata = computed(() => {
  if (!isShow.value) return;
  const event = ReplaceableEventMap.kind0.getEvent(pubkey.value);

  if (event) {
    return parseMetadata(event);
  }

  //要注意的是只要不调用.value就不会执行computed的更新函数
  return metadata1.value;
});

const router = useRouter();
function routerPush(pubkey: string) {
  router.push(`/profile/${pubkey}`);
}
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
        {{ metadata?.name ?? pubkey.slice(0, 6) }}
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
