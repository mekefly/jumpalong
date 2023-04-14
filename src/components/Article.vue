<script lang="ts" setup>
import { config } from "@/nostr/nostr";
import { useHandleSendMessage } from "@/utils/use";
import { Event, EventTemplate } from "nostr-tools";
import Papaw from "./Papaw.vue";
import PapawTreeAutoFindRoot from "./PapawTreeAutoFindRoot.vue";
import PostList from "./PostList.vue";
import RichTextEditBox from "./RichTextEditBox.vue";
import Scrollbar from "./Scrollbar.vue";

const props = defineProps<{
  event: Event;
  urls: Set<string>;
}>();

const urls = toRef(props, "urls");
const pushEvent = ref<undefined | ((e: Event) => void)>(undefined);

const handleSendEvent = useHandleSendMessage(1, undefined, pushEvent, {
  urls: urls,
});
function handleSend(e: EventTemplate) {
  handleSendEvent(e);
}
</script>

<template>
  <div v-if="event" class="flex flex-col w-full h-full overflow-auto">
    <Scrollbar class="w-full h-0 flex-shrink flex-1" loadable refreshable>
      <PapawTreeAutoFindRoot v-if="config.enablePapawTree" :event="event" />
      <Papaw v-else :event="event">
        <template #reply>
          <PostList
            v-model:pushEvent="pushEvent"
            :urls="urls"
            :filter="{ '#e': [event.id], kinds: [1, 30023] }"
            active
            disabledReply
          />
        </template>
      </Papaw>
    </Scrollbar>
    <RichTextEditBox @send="handleSend" />
  </div>
</template>

<style scoped></style>
