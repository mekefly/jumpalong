<script lang="ts" setup>
import { t } from "@/i18n";
import { useOnOK } from "@/utils/use";
import { useThemeVars } from "naive-ui";
import { Event } from "nostr-tools";
import CloudLightning from "./icon/CloudLightning.vue";
import PapawReactionVue from "./PapawReaction.vue";
import PapawReplyButtonVue from "./PapawReplyButton.vue";

const props = defineProps<{
  event: Event;
  deleteEvent?: (id: string) => void;
}>();

const { event, deleteEvent } = toRefs(props);

const message = useMessage();

const onOK = useOnOK();
const theme = useThemeVars();

const size = ref(18);

const limit = 20;
</script>

<template>
  <div class="flex items-center justify-between">
    <n-space class="flex justify-around py-4 box-border">
      <PapawReplyButtonVue :size="size" :event="event" />
      <n-button text @click="() => message.error(t('not_implemented'))">
        <n-icon :size="size">
          <CloudLightning />
        </n-icon>
      </n-button>
    </n-space>
    <PapawReactionVue :size="size" :event="event" />
  </div>
</template>

<style scoped></style>
