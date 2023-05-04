<script lang="ts" setup>
import { TYPES } from "@/nostr/nostr";
import { useLazyComponent } from "@/utils/use";
import profile from "../assets/profile-2-400x400.png";
import Ellipsis from "./Ellipsis.vue";
import { useNostrContainerGet } from "./NostrContainerProvade";

const props = defineProps<{
  pubkey: string;
  name?: string;
  about?: string;
}>();
const { pubkey, name, about } = toRefs(props);

const userApi = useNostrContainerGet(TYPES.UserApi);

const [metadataLine, target] = useLazyComponent(() => {
  return userApi.getUserMetadataLineByPubkey(pubkey.value);
});
const metadata = computed(() => metadataLine.value?.feat.useMetadata());
</script>

<template>
  <n-list-item class="cursor-pointer overflow-hidden">
    <div ref="target" class="flex items-center">
      <n-avatar
        class="ml-4"
        size="small"
        :src="metadata?.picture ?? profile"
        round
        @click="() => $router.push(`/profile/${pubkey}`)"
      />
      <div class="flex flex-col ml-4 flex-1 shrink-1 w-full">
        <Ellipsis
          class="text-xl"
          @click="() => $router.push(`/profile/${pubkey}`)"
        >
          {{ name ?? metadata?.name ?? pubkey.slice(0, 10) }}
        </Ellipsis>
        <Ellipsis v-if="metadata?.about" :style="{ fontSize: '10px' }">
          {{ about ?? metadata.about }}
        </Ellipsis>
      </div>
      <div class="flex-shrink-0 ml-2">
        <slot name="right" :pubkey="pubkey"></slot>
      </div>
    </div>
  </n-list-item>
</template>

<style scoped></style>
