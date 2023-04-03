<script lang="ts" setup>
import { deserializeTagR } from "@/nostr/tag";
import { setAdds } from "@/utils/utils";
import { Event } from "nostr-tools";
import PapawTreeVue from "./PapawTree.vue";
import PapawTreeParentVue from "./PapawTreeParent.vue";

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
      tag[0] === "e" &&
      tag[1] &&
      (tag[2] === undefined || tag[2] === "reply" || tag[2] === "root")
  )
);
const relays = computed(() =>
  setAdds(new Set(props.relays), deserializeTagR(event.value.tags))
);
const withReplys = computed(() => replyTags.value.length > 0);
const parentIds = computed(() => replyTags.value.map((tag) => tag[1]));
</script>

<template>
  <div v-if="withReplys">
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
