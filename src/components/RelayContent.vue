<script lang="ts" setup>
import { Event } from "nostr-tools";
import PapawById from "./PapawById.vue";
import { getUrlsByEvent } from "./PapawSourceUrl";

const props = defineProps<{
  event: Event;
}>();
const { event } = toRefs(props);
const replyIds = computed(() =>
  event.value.tags
    .filter(
      (tag) => tag[0] === "e" && tag[1] && (tag[3] === "reply" || !tag[3])
    )
    .map((tag) => tag[1])
);
const relayUrls = computed(() => getUrlsByEvent(event.value));
</script>

<template>
  <n-divider dashed v-if="replyIds.length > 0" />
  <PapawById v-for="id in replyIds" :id="id" :relays="relayUrls" disabledReply>
  </PapawById>
</template>

<style scoped></style>
