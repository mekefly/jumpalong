<script lang="ts" setup>
import {
  deleteDislike,
  deleteLike,
  hasDislike,
  hasLike,
  sendDislike,
  sendLike,
} from "@/api/like";
import { t } from "@/i18n";
import { useOnOK } from "@/utils/use";
import { usePushShortTextNote } from "@/views/ShortTextNoteView";
import { useThemeVars } from "naive-ui";
import { Event } from "nostr-tools";

const props = defineProps<{
  event: Event;
  deleteEvent?: (id: string) => void;
}>();
const { event, deleteEvent } = toRefs(props);

const message = useMessage();
const pushShortTextNote = usePushShortTextNote();

function handelPushShortTextNote() {
  pushShortTextNote(event.value);
}

const isLike = ref(hasLike(event.value.id));
const isDislike = ref(hasDislike(event.value.id));

const onOK = useOnOK();
function handelLike() {
  if (isLike.value) {
    deleteLike({ eventId: event.value.id, onOK });
  } else {
    sendLike(event.value, {
      onOK,
    });
  }
  isLike.value = !isLike.value;
}
function handelDislike() {
  if (isLike.value) {
    deleteDislike({ eventId: event.value.id, onOK });
  } else {
    sendDislike(event.value, { onOK });
  }
  isDislike.value = !isDislike.value;
}
const theme = useThemeVars();
const size = ref(20);
</script>

<template>
  <div class="flex justify-around py-4 box-border">
    <n-button text @click="handelPushShortTextNote">
      <n-icon :size="size">
        <MessageOutlined />
      </n-icon>
    </n-button>
    <n-button text @click="handelLike">
      <n-icon :size="size" :color="isLike ? theme.successColor : undefined">
        <LikeFilled v-if="isLike" />
        <LikeOutlined v-else />
      </n-icon>
    </n-button>
    <n-button text @click="handelDislike">
      <n-icon :size="size" :color="isDislike ? theme.successColor : undefined">
        <DislikeFilled v-if="isDislike" />
        <DislikeOutlined v-else />
      </n-icon>
    </n-button>
    <n-button text @click="() => message.error(t('message.not_implemented'))">
      <n-icon :size="size">
        <CloudLightning />
      </n-icon>
    </n-button>
  </div>
</template>

<style scoped></style>
