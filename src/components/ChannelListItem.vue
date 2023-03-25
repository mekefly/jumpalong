<script lang="ts" setup>
import { getChannelMetadataBeltlineByChannelId } from "@/api/channel";
import { ChannelConfigurationData } from "@/api/Contact";
import EllipsisVue from "./Ellipsis.vue";

const props = defineProps<{ metadata: ChannelConfigurationData }>();
const { metadata } = toRefs(props);

const metadataLine = getChannelMetadataBeltlineByChannelId(
  metadata.value.eventId
);
watchEffect(() => {
  Object.assign(metadata.value, metadataLine.feat.useMetadata());
});
</script>

<template>
  <div
    class="flex flex-col"
    @click="
      () =>
        $router.push({
          name: 'channel-message',
          params: { eventId: metadata.eventId },
        })
    "
  >
    <div class="font-bold">
      <EllipsisVue>
        {{ metadata.name ?? metadata.eventId.slice(0, 6) }}
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
