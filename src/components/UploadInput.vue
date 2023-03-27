<script lang="ts" setup>
import { UploadFinishEventOpt } from "./Upload";
import UploadButtonVue from "./UploadButton.vue";
const props = defineProps<{
  placeholder?: string;
  value?: string;
}>();
const emit = defineEmits<{
  (e: "update:value", v: string): void;
}>();
const { placeholder } = toRefs(props);

const value = computed<string>({
  get(): string {
    return props.value ?? "";
  },
  set(v: string) {
    emit("update:value", v);
  },
});
function handleUploadResult(opt: UploadFinishEventOpt) {
  value.value = opt.url;
}
</script>

<template>
  <div class="flex">
    <n-input :placeholder="placeholder" v-model:value="value"> </n-input>
    <UploadButtonVue @uploadResult="handleUploadResult"></UploadButtonVue>
  </div>
</template>

<style scoped></style>
