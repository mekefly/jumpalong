<script lang="ts" setup>
import { config } from "@/nostr/nostr";
import { useCanceleableClick, useLazyShow } from "@/utils/use";
import { arrayRemove, timeout } from "@/utils/utils";
import { usePushShortTextNote } from "@/views/ShortTextNoteView";
import { vOnLongPress } from "@vueuse/components";
import { Event } from "nostr-tools";
import Content from "./Content.vue";
import DateTimeVue from "./DateTime.vue";
import DrawerProvideVue from "./DrawerProvide.vue";
import LazyItemDisabledVue from "./LazyItemDisabled.vue";
import { useNewMessageState } from "./NewMessage";
import PapawOptionsButtons from "./PapawOptionsButtons.vue";
import PapawSourceUrlVue from "./PapawSourceUrl.vue";
import { useInjectScrollbarInstRef } from "./Scrollbar";
import SMSButtonVue from "./SMSButton.vue";
import UserInfoVue from "./UserInfo.vue";

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
const { event, deleteEvent } = toRefs(props);

function handelDeleteEvent(e: string) {
  deleteEvent?.value?.(e);
}
const showSMS = ref(false);
const [target, isShow] = useLazyShow(undefined, { preloadDistance: 0 });

const scrollbarOpt = useInjectScrollbarInstRef();

const jumpList = useNewMessageState()?.jumpList;

const scrollToThis = async () => {
  const _target = target.value as HTMLElement;
  if (!_target) return;
  if (!scrollbarOpt) return;

  const rect = _target.getBoundingClientRect();

  isShow.value = true;
  await timeout(0);
  scrollbarOpt.scrollbarInst.value?.scrollBy({
    top:
      rect.top -
      (scrollbarOpt.containerRef.value?.getBoundingClientRect().top ?? 0),
    behavior: "smooth",
  });
  twinkle();
};
jumpList?.value.push(scrollToThis);
watch(isShow, () => {
  if (isShow.value) {
    if (!jumpList?.value) return;

    arrayRemove(jumpList.value, scrollToThis);
  }
});
const isTwinkle = ref(false);
function twinkle() {
  isTwinkle.value = true;
  setTimeout(() => {
    isTwinkle.value = false;
  }, 1000);
}
const isLongPress = ref(false);
function handelLongPress() {
  showSMS.value = !showSMS.value;
  isLongPress.value = true;
}
const contentRef = ref();
const pushShortText = usePushShortTextNote();
const { isPress } = useCanceleableClick(contentRef, () => {
  pushShortText(event.value);
});
</script>

<template>
  <div ref="target">
    <LazyItemDisabledVue
      :delay="config.lazyDelayForPapaw"
      :disabled="!config.lazyDelayForPapaw"
      :minHeight="200"
    >
      <DrawerProvideVue #default="{ id }">
        <div
          :id="id"
          class="w-max-full rounded-2xl mt-4 bg-[#dfe4ea55] overflow-hidden relative transition"
          :class="{
            twinkle: isTwinkle,
            [`bg-[#dfe4eabb]`]: isPress,
          }"
          v-on-long-press="[handelLongPress, {}]"
        >
          <div class="p-3 flex justify-between items-center">
            <UserInfoVue :pubkey="event.pubkey" :created_at="event.created_at">
              <template #bottom>
                <DateTimeVue :secondTimestamp="event.created_at" />
              </template>
              <template #right>
                <SMSButtonVue
                  :show="showSMS"
                  :event="event"
                  :deleteEvent="handelDeleteEvent"
                  :isLongPress="isLongPress"
                />
              </template>
            </UserInfoVue>
          </div>
          <div class="p-5 font" ref="contentRef">
            <Content :event="event" />
          </div>

          <PapawOptionsButtons
            v-if="withPapawOptionsButtons ?? true"
            :event="event"
          />

          <PapawSourceUrlVue :event="event" />
        </div>
      </DrawerProvideVue>
    </LazyItemDisabledVue>
  </div>
</template>

<style scoped>
.twinkle {
  animation: twinkle 2s ease;
}
@keyframes twinkle {
  0% {
    background-color: #dfe4eaaa;
  }
  25% {
    background-color: #dfe4ea11;
  }
  50% {
    background-color: #dfe4eaff;
  }
  75% {
    background-color: #dfe4ea11;
  }
  100% {
    background-color: #dfe4eaaa;
  }
}
</style>
