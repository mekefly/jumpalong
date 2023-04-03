<script lang="ts" setup>
import { getEventLineById } from "@/api/event";
import { t } from "@/i18n";
import Papaw from "./Papaw.vue";
import PapawTreeHierarchy from "./PapawTreeHierarchy.vue";

const props = defineProps<{
  id: string;
  relays?: Set<string>;
  disabledReply?: boolean;
}>();
const eventLine = computed(() =>
  getEventLineById(props.id, { urls: props.relays })
);
const event = computed(() => eventLine.value.feat.useEvent());
</script>

<template>
  <Papaw v-if="event" :event="event" disabledReply>
    <template v-if="$slots.reply" #reply>
      <slot name="reply"></slot>
    </template>
  </Papaw>

  <PapawTreeHierarchy v-else>
    <n-empty :description="t('not_found')" size="huge"> </n-empty>
    <slot name="reply"></slot>
  </PapawTreeHierarchy>
</template>

<style scoped></style>
