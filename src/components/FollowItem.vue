<script lang="ts" setup>
import { getUserMetadataLineByPubkey } from "@/api/user";
import { useLazyComponent } from "@/utils/use";
import profile from "../assets/profile-2-400x400.png";

const props = defineProps<{
  pubkey: string;
  name?: string;
  about?: string;
}>();
const { pubkey, name, about } = toRefs(props);

const [metadataLine, target] = useLazyComponent(() => {
  return getUserMetadataLineByPubkey(pubkey.value);
});
const metadata = computed(() => metadataLine.value?.feat.useMetadata());
</script>

<template>
  <n-list-item class="cursor-pointer">
    <div ref="target" class="flex items-center">
      <n-avatar
        class="ml-4"
        size="small"
        :src="metadata?.picture ?? profile"
        round
        @click="() => $router.push(`/profile/${pubkey}`)"
      />
      <div class="flex flex-col ml-4 flex-1 shrink-1 w-full">
        <div class="text-xl" @click="() => $router.push(`/profile/${pubkey}`)">
          {{ name ?? metadata?.name ?? pubkey.slice(0, 10) }}
        </div>
        <Ellipsis v-if="metadata?.about" :style="{ fontSize: '10px' }">
          {{ about ?? metadata.about }}
        </Ellipsis>
      </div>
    </div>
  </n-list-item>
</template>

<style scoped></style>
