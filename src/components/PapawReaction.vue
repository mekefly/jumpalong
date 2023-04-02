<script lang="ts" setup>
import { Event } from "nostr-tools";

import {
  createReactionEventLine,
  deleteReactions,
  hasReactions,
  reactions,
  sendReactions,
} from "@/api/like";

import { useLazyComponent, useOnOK } from "@/utils/use";
import DrawerVue from "./Drawer.vue";
import SmileBeamRegularVue from "./icon/SmileBeamRegular.vue";
import PapawReactionItemVue from "./PapawReactionItem.vue";

const props = defineProps<{
  event: Event;
  size: number;
}>();
const event = toRef(props, "event");

const onOK = useOnOK();

const limit = 20;
const [textEventbeltline, target] = useLazyComponent(() => {
  return createReactionEventLine({ event: event.value, limit });
});
const reactionMap = computed(
  () => textEventbeltline.value?.feat.getReactionMap() ?? {}
);
const activeMap = ref({} as Record<string, boolean>);
reactions.forEach((type) => {
  activeMap.value[type] = hasReactions(type as any, event.value.id);
});
function handelSwitchActive(type: string) {
  if (activeMap.value[type]) {
    deleteReactions(type as any, { eventId: event.value.id, onOK });
  } else {
    sendReactions(type as any, event.value, { onOK });
  }
  activeMap.value[type] = !activeMap.value[type];
}
const id = inject("papaw-id", null as string | null) as string | null;
const active = ref(false);
const reactionMapEntries = computed(() => Object.entries(reactionMap.value));
const activeMapEntries = computed(() =>
  Object.entries(activeMap.value)
    .filter(([k, v]) => v && !reactionMap.value[k as any])
    .map(([k, v]) => [k as string, [] as Event[]] as const)
);
const reactionEntries = computed(() =>
  [...reactionMapEntries.value, ...activeMapEntries.value]
    .sort((a, b) => a[1].length - b[1].length)
    .slice(0, 3)
);
</script>

<template>
  <div ref="target">
    <n-space class="flex items-center justify-center">
      <PapawReactionItemVue
        @handelSwitchActive="handelSwitchActive"
        v-for="[reaction, events] of reactionEntries"
        :size="size"
        :events="events"
        :reaction="reaction"
        :active="activeMap[reaction]"
      />

      <n-button circle quaternary @click="() => (active = !active)">
        <n-icon :size="size">
          <SmileBeamRegularVue />
        </n-icon>
      </n-button>

      <DrawerVue v-model:show="active">
        <n-space class="h-full w-full flex items-center flex-wrap">
          <PapawReactionItemVue
            @handelSwitchActive="handelSwitchActive"
            v-for="reaction of reactions"
            :size="size"
            :events="reactionMap[reaction] ?? []"
            :reaction="reaction"
            :active="activeMap[reaction]"
          />
        </n-space>
      </DrawerVue>
    </n-space>
  </div>
</template>

<style scoped></style>
