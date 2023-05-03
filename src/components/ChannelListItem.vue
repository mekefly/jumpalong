<script lang="ts" setup>
import {
  CahnnelMessageBeltline,
  CahnnelMessageBeltlineType,
} from "@/api/channel";
import { ChannelConfigurationData } from "@/nostr/FollowChannel";
import EllipsisVue from "./Ellipsis.vue";
import { useNostrContainerGet } from "./NostrContainerProvade";

const props = defineProps<{
  channelConfigurationData: ChannelConfigurationData;
}>();
const { channelConfigurationData } = toRefs(props);

const cahnnelMessageBeltline = useNostrContainerGet<CahnnelMessageBeltline>(
  CahnnelMessageBeltlineType
);

const metadataLine = computed(() =>
  cahnnelMessageBeltline.getChannelMetadataBeltlineByChannelId(
    channelConfigurationData.value.channelId
  )
);
const metadata = computed(() => metadataLine.value.feat.useMetadata());
</script>

<template>
  <div
    class="flex flex-col"
    @click="
      () =>
        $router.push({
          name: 'channel-message',
          params: { value: channelConfigurationData.channelId },
        })
    "
  >
    <div class="font-bold">
      <EllipsisVue>
        {{ metadata.name ?? channelConfigurationData.channelId.slice(0, 10) }}
      </EllipsisVue>
    </div>
    <div v-if="metadata.about" class="w-full">
      <EllipsisVue class="w-full">
        <small>
          {{ metadata.about }}
        </small>
      </EllipsisVue>
    </div>
  </div>
</template>

<style scoped></style>
