<script lang="ts" setup>
import { useIfTransition } from '../utils/use'
import WindowNew20RegularVue from './icon/WindowNew20Regular.vue'
import { useNewMessageState, useProvideNewMessage } from './NewMessage'

let injectState = useNewMessageState()
const state =
  injectState ??
  useProvideNewMessage({
    jumpList: ref([]),
  })

const jumpList = computed(() => state.jumpList.value)

function handleJump() {
  const f = jumpList.value.shift()
  if (!f) {
    return
  }
  f()
}
const isShow = computed(() => {
  return jumpList.value.length > 0
})

const { show, hidden, transitionActive, safeActive, duration } =
  useIfTransition(600)
watchEffect(() => {
  if (isShow.value) {
    show()
  } else {
    hidden()
  }
})
</script>

<template>
  <slot></slot>
  <n-button
    v-if="safeActive && !injectState"
    class="fixed bottom-3 right-4 px-2"
    :style="{
      transform: transitionActive ? 'translate(0%,0%)' : 'translate(150%,0%)',
      transition: `transform ${duration}ms ease`,
    }"
    quaternary
    type="primary"
    :size="'large'"
    round
    @click="handleJump"
  >
    <span>{{ jumpList.length }}</span>
    <n-icon :size="30">
      <WindowNew20RegularVue />
    </n-icon>
  </n-button>
</template>

<style scoped></style>
