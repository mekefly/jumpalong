<script lang="ts" setup>
import { deserializeTagR, getRootTagE } from "@/nostr/tag";
import { setAdds } from "@/utils/utils";
import { Event } from "nostr-tools";
import PapawById from "./PapawById.vue";
import PapawTreeVue from "./PapawTree.vue";
import PapawTreeParentVue from "./PapawTreeParent.vue";
import PapawTreeReply from "./PapawTreeReply.vue";

const props = withDefaults(
  defineProps<{
    event: Event;
    relays?: Set<string>;
    deleteEvent?: (id: string) => void;
    withPapawOptionsButtons?: boolean;
  }>(),
  {
    withPapawOptionsButtons: true,
  }
);
const { event } = toRefs(props);
const replyTags = computed(() =>
  event.value.tags.filter(
    (tag) =>
      tag[0] === "e" && tag[1] && (tag[2] === undefined || tag[2] === "reply")
  )
);
const relays = computed(() =>
  setAdds(new Set(props.relays), deserializeTagR(event.value.tags))
);
const withReplys = computed(() => replyTags.value.length > 0);
const parentIds = computed(() => new Set(replyTags.value.map((tag) => tag[1])));
const rootId = computed(() => getRootTagE(event.value.tags)?.[1]);
</script>

<template>
  <div v-if="rootId">
    <PapawById :id="rootId">
      <template #reply="{ event }">
        <PapawTreeReply v-if="event" :event="event"></PapawTreeReply>
      </template>
    </PapawById>
  </div>
  <div v-else-if="withReplys">
    <PapawTreeParentVue
      v-for="id in parentIds"
      :chindEvent="event"
      :relays="relays"
      :id="id"
    ></PapawTreeParentVue>
  </div>
  <div v-else>
    <PapawTreeVue :event="event"></PapawTreeVue>
  </div>
</template>

<style scoped></style>
