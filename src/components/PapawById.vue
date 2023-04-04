<script lang="ts" setup>
import { getEventLineById } from "@/api/event";
import { t } from "@/i18n";
import { usePushShortTextNote } from "@/views/ShortTextNoteView";
import { Event } from "nostr-tools";
import Papaw from "./Papaw.vue";
import PapawTreeHierarchy from "./PapawTreeHierarchy.vue";

const props = defineProps<{
  id: string;
  relays?: Set<string>;
  pubkey?: string;
  disabledReply?: boolean;
}>();
const eventLine = computed(() =>
  getEventLineById(props.id, { urls: props.relays, pubkey: props.pubkey })
);
const event = computed(() => eventLine.value.feat.useEvent());
const pushToTextNote = usePushShortTextNote();
</script>

<template>
  <Papaw v-if="event" :event="event" disabledReply>
    <template v-if="$slots.reply" #reply>
      <slot name="reply" :event="event"></slot>
    </template>
  </Papaw>

  <div v-else>
    <n-empty
      :description="t('not_found')"
      size="huge"
      :click="() => pushToTextNote(id)"
    />
    <PapawTreeHierarchy>
      <slot name="reply" :event="(event as Event | undefined)" />
    </PapawTreeHierarchy>
  </div>
</template>

<style scoped></style>
