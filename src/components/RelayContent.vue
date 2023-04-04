<script lang="ts" setup>
import { getSourceUrls } from "@/nostr/staff/createEventSourceTracers";
import { deserializeTagR } from "@/nostr/tag";
import { setAdds } from "@/utils/utils";
import { Event } from "nostr-tools";
import PapawById from "./PapawById.vue";

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
const relayUrls = computed(() =>
  setAdds(
    deserializeTagR(event.value.tags),
    getSourceUrls(event.value.id) ?? []
  )
);
</script>

<template>
  <n-divider dashed v-if="replyIds.length > 0" />
  <PapawById v-for="id in replyIds" :id="id" :relays="relayUrls" disabledReply>
  </PapawById>
</template>

<style scoped></style>
