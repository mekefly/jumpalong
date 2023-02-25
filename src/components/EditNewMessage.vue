<script lang="ts" setup>
import { computed, ref, StyleValue } from "vue";
import { sendShortTextNote } from "../api/event";
import { useIfTransition } from "../utils/use";

const { show, hidden, safeActive, active, transitionActive, duration } =
  useIfTransition(500);
const messageBoxStyle = computed(() => {
  if (transitionActive.value) {
    return {
      transition: `all ${duration.value}ms`,
    };
  } else {
    return {
      transform: `translate(0%,100%)`,
      transition: `all ${duration.value}ms`,
    } as StyleValue;
  }
});
const msg = ref("");

function send() {
  const s = msg.value;
  if (!s) return;
  sendShortTextNote(msg.value);
}
</script>

<template>
  <button
    class="rounded-full fixed bottom-4 right-4 bg-[#2ed573] h-24 w-24 font-bold text-3xl text-white active:scale-95 z-10"
    @click="show"
  >
    发布
  </button>
  <div
    v-if="safeActive"
    class="fixed left-0 bottom-0 w-full bg-[#7bed9f] rounded-t-3xl z-10"
    :style="messageBoxStyle"
  >
    <button
      class="absolute right-20 top-2 font-bold text-3xl active:scale-95 bg-[#2ed573] rounded-full px-4 py-2 hover:text-[#3742fa]"
      @click="send"
    >
      SEND
    </button>

    <button
      class="absolute right-5 top-2 font-bold text-3xl active:scale-95 bg-[#2ed573] rounded-full px-4 py-2 hover:text-[red]"
      @click="hidden"
    >
      X
    </button>
    <textarea
      class="w-full p-4 box-border resize-none bg-transparent border-none outline-none"
      name=""
      id=""
      cols="30"
      rows="10"
      v-model="msg"
    />
  </div>
</template>

<style scoped></style>
