<script lang="ts" setup>
import { getChannelMetadataBeltlineByChannelId } from "@/api/channel";
import { ChannelConfigurationData } from "@/nostr/FollowChannel";
import EllipsisVue from "./Ellipsis.vue";

const props = defineProps<{
  channelConfigurationData: ChannelConfigurationData;
}>();
const { channelConfigurationData } = toRefs(props);

const metadataLine = computed(() =>
  getChannelMetadataBeltlineByChannelId(channelConfigurationData.value.eventId)
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
          params: { value: channelConfigurationData.eventId },
        })
    "
  >
    <div class="font-bold">
      <EllipsisVue>
        {{ metadata.name ?? channelConfigurationData.eventId.slice(0, 10) }}
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
