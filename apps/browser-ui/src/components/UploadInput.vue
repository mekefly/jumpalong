<script lang="ts" setup>
import { UploadFinishEventOpt } from './Upload'
import UploadButtonVue from './UploadButton.vue'
const props = defineProps<{
  placeholder?: string
  value?: string
}>()
const emit = defineEmits<{
  (e: 'update:value', v: string): void
}>()
const { placeholder } = toRefs(props)

const value = computed<string>({
  get(): string {
    return props.value ?? ''
  },
  set(v: string) {
    emit('update:value', v)
  },
})
function handleUploadResult(opt: UploadFinishEventOpt) {
  value.value = opt.url
}
</script>

<template>
  <div>
    <div class="flex">
      <n-input :placeholder="placeholder" v-model:value="value" class="mr-2">
      </n-input>
      <UploadButtonVue @uploadResult="handleUploadResult"></UploadButtonVue>
    </div>
    <div class="mt-1">
      <n-image
        class="m-0 rounded-md"
        v-if="value"
        :imgProps="{ style: { width: '100%' } }"
        :src="value"
      ></n-image>
    </div>
  </div>
</template>

<style scoped></style>
