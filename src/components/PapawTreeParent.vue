<script lang="ts" setup>
import { getEventLineById } from "@/api/event";
import { t } from "@/i18n";
import { Event } from "nostr-tools";
import PapawTree from "./PapawTree.vue";
import PapawTreeAutoFindParent from "./PapawTreeAutoFindRoot.vue";
import PapawTreeHierarchyVue from "./PapawTreeHierarchy.vue";

const props = defineProps<{
  id: string;
  relays: Set<string>;
  chindEvent: Event;
}>();
const line = computed(() => getEventLineById(props.id, { urls: props.relays }));
const parentEvent = computed(() => line.value.feat.useEvent());
</script>

<template>
  <PapawTreeAutoFindParent
    v-if="parentEvent"
    :event="parentEvent"
    :relays="relays"
  ></PapawTreeAutoFindParent>
  <PapawTreeHierarchyVue v-else>
    <n-empty :description="t('not_found')" size="huge"> </n-empty>
    <PapawTree :event="chindEvent"></PapawTree>
  </PapawTreeHierarchyVue>
</template>

<style scoped></style>
