<script lang="ts" setup>
import CloseVue from "./icon/Close.vue";

const emit = defineEmits<{
  (e: "click", id: number): void;
}>();
</script>

<template>
  <n-button
    quaternary
    circle
    type="error"
    class="text-[#6c5ce7] hover:text-[#a29bfe]"
    @click="($event:any)=>emit('click',$event)"
  >
    <template #icon>
      <n-icon>
        <CloseVue />
      </n-icon>
    </template>
  </n-button>
</template>

<style scoped></style>
