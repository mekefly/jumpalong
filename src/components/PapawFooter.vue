<script lang="ts" setup>
import {
  deleteDislike,
  deleteLike,
  hasDislike,
  hasLike,
  sendDislike,
  sendLike,
} from "@/api/like";
import { useOnOK } from "@/utils/use";
import { usePushShortTextNote } from "@/views/ShortTextNoteView";
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
</script>

<template>
  <div class="flex justify-around py-4 box-border">
    <n-button text @click="handelPushShortTextNote">
      <n-icon :size="30">
        <MessageOutlined />
      </n-icon>
    </n-button>
    <n-button text @click="handelLike">
      <n-icon :size="30">
        <LikeFilled v-if="isLike" />
        <LikeOutlined v-else />
      </n-icon>
    </n-button>
    <n-button text @click="handelDislike">
      <n-icon :size="30">
        <DislikeFilled v-if="isDislike" />
        <DislikeOutlined v-else />
      </n-icon>
    </n-button>
    <n-button text @click="() => message.error('目前没有实现此功能')">
      <n-icon :size="30">
        <CloudLightning />
      </n-icon>
    </n-button>
  </div>
</template>

<style scoped></style>
