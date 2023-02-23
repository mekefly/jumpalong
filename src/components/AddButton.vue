<script lang="ts" setup>
const emit = defineEmits<{
  (e: "click", id: number): void;
}>();
</script>

<template>
  <n-button
    quaternary
    circle
    type="primary"
    class="text-[#6c5ce7] hover:text-[#a29bfe]"
    @click="($event:any)=>emit('click',$event)"
  >
    <template #icon>
      <n-icon>
        <Add20Filled />
      </n-icon>
    </template>
  </n-button>
</template>

<style scoped></style>
