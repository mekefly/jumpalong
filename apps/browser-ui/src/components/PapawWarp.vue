<script lang="ts" setup>
/**
 * 消息包裹，就是聊天气泡的包装内容
 */
import { useCanceleableClick, useLazyShow } from '../utils/use'
import { arrayRemove, timeout } from '../utils/utils'
// import { usePushShortTextNote } from '../views/ShortTextNoteView'
import { vOnLongPress } from '@vueuse/components'
import { Event } from 'nostr-tools'
import { PapawTreeLazyModeStaff } from '../nostr-runtime'
import { usePushShortTextNote } from '../views/ShortTextNoteView'
import DateTime from './DateTime.vue'
import DrawerProvide from './DrawerProvide.vue'
import LazyItemDisabled from './LazyItemDisabled.vue'
import { useNewMessageState } from './NewMessage'
import { usePapawFocusState } from './Papaw'
import PapawOptionsButtons from './PapawOptionsButtons.vue'
import PapawSourceUrl from './PapawSourceUrl.vue'
import PapawTreeHierarchy from './PapawTreeHierarchy.vue'
import { useConfig } from './ProvideEventLine'
import { useInjectScrollbarInstRef } from './Scrollbar'
import SMSButton from './SMSButton.vue'
import UserInfo from './UserInfo.vue'

const config = useConfig(PapawTreeLazyModeStaff)

const props = withDefaults(
  defineProps<{
    event: Event
    deleteEvent?: (id: string) => void
    withPapawOptionsButtons?: boolean
    disabledReply?: boolean
  }>(),
  {
    withPapawOptionsButtons: true,
  }
)
const emit = defineEmits<{
  (e: 'update:showSMS', v: boolean): void
}>()

const [target, isShow] = useLazyShow(undefined, {
  preloadDistance: 0,
})

const { event, deleteEvent } = toRefs(props)

const isLongPress = ref(false)

const showSMS = ref(false)
function handelLongPress() {
  showSMS.value = !showSMS.value
  isLongPress.value = true
}

const contentRef = ref()
const pushShortText = usePushShortTextNote()
const { isPress } = useCanceleableClick(contentRef, () => {
  pushShortText(event.value)
})

const scrollbarOpt = useInjectScrollbarInstRef()
const scrollToThis = async () => {
  const _target = target.value as HTMLElement
  if (!_target) return
  if (!scrollbarOpt) return

  const rect = _target.getBoundingClientRect()

  isShow.value = true
  await timeout(0)
  scrollbarOpt.scrollbarInst.value?.scrollBy({
    top:
      rect.top -
      (scrollbarOpt.containerRef.value?.getBoundingClientRect().top ?? 0),
    behavior: 'smooth',
  })
  twinkle()
}

const jumpList = useNewMessageState()?.jumpList

jumpList?.value.push(scrollToThis)

const focuState = usePapawFocusState()
const focus = computed(() => {
  const focusEvent = focuState?.focusEvent.value
  if (!focusEvent) {
    return false
  }
  if (focusEvent.id === event.value.id) {
    return true
  }
  return false
})

watchEffect(() => {
  if (focus.value) {
    scrollToThis()
  }
})
watch(isShow, () => {
  if (isShow.value) {
    if (!jumpList?.value) return

    arrayRemove(jumpList.value, scrollToThis)
  }
})
const isTwinkle = ref(false)
function twinkle() {
  isTwinkle.value = true
  setTimeout(() => {
    isTwinkle.value = false
  }, 1000)
}

function handelDeleteEvent(e: string) {
  deleteEvent?.value?.(e)
}
</script>

<template>
  <div class="mt-4" ref="target">
    <LazyItemDisabled
      :delay="config.lazyDelayForPapaw"
      :disabled="!config.lazyDelayForPapaw"
      :minHeight="200"
    >
      <DrawerProvide v-slot="{ id }">
        <div
          class="w-max-full rounded-2xl bg-[#dfe4ea55] overflow-hidden relative transition"
          :class="{
            twinkle: isTwinkle,
            [`bg-[#dfe4eabb]`]: isPress,
          }"
          v-on-long-press.stop="[
            handelLongPress,
            {
              modifiers: {
                stop: true,
              },
            },
          ]"
          @mousedown.stop.passive=""
          @touchstart.stop.passive=""
          @click.stop.passive=""
        >
          <div :id="id" class="relative overflow-hidden rounded-xl">
            <slot name="header"></slot>

            <div class="mx-3 my-3">
              <UserInfo
                :pubkey="event.pubkey"
                :created_at="event.created_at"
                :event="event"
              >
                <template #bottom>
                  <DateTime :secondTimestamp="event.created_at" />
                </template>
                <template #right>
                  <SMSButton
                    :show="showSMS"
                    :event="event"
                    :deleteEvent="handelDeleteEvent"
                  />
                </template>
              </UserInfo>
              <div class="my-4 font" ref="contentRef">
                <slot></slot>
              </div>

              <div class="my-2">
                <PapawOptionsButtons
                  v-if="withPapawOptionsButtons ?? true"
                  :event="event"
                />

                <PapawSourceUrl :event="event" />
              </div>
            </div>
          </div>

          <PapawTreeHierarchy>
            <slot name="reply"></slot>
          </PapawTreeHierarchy>
        </div>
      </DrawerProvide>
    </LazyItemDisabled>
  </div>
</template>

<style scoped></style>
