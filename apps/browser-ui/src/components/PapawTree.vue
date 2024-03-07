<script lang="ts" setup>
import { Event } from "nostr-tools";
import PapawVue from "./Papaw.vue";
import PapawTreeReplyVue from "./PapawTreeReply.vue";
import PapawTreeWithEvent from "./PapawTreeWithEvent.vue";

const props = withDefaults(
  defineProps<{
    event: Event;
    deleteEvent?: (id: string) => void;
    withPapawOptionsButtons?: boolean;
  }>(),
  {
    withPapawOptionsButtons: true,
  }
);
const { event } = toRefs(props);
const papawRef = ref<any>();

papawRef.value?.scrollToPapaw();
</script>

<template>
  <PapawTreeWithEvent :id="event.id">
    <PapawVue disabledReply :event="event" v-model:ref="papawRef">
      <template #reply>
        <PapawTreeReplyVue :event="event" />
      </template>
    </PapawVue>
  </PapawTreeWithEvent>
</template>

<style scoped></style>
