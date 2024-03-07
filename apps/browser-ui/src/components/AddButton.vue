<script lang="ts" setup>
import Add20FilledVue from "./icon/Add20Filled.vue";

const props = defineProps<{
  disabled?: boolean;
}>();
const emit = defineEmits<{
  (e: "click", v: any): void;
}>();
</script>

<template>
  <n-button
    :disabled="props.disabled"
    circle
    text
    type="primary"
    class="text-[#6c5ce7] hover:text-[#a29bfe]"
    @click="($event:any)=>emit('click',$event)"
  >
    <template #icon>
      <n-icon>
        <Add20FilledVue />
      </n-icon>
    </template>
  </n-button>
</template>

<style scoped></style>
