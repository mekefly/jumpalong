<script lang="ts" setup>
import { CustomRequestOptions } from "naive-ui/es/upload/src/interface";
import CloudUploadVue from "./icon/CloudUpload.vue";
import { UploadFinishEventOpt, useUpload } from "./Upload";
const props = defineProps<{
  upload?: (file: File) => void;
}>();
const { upload } = toRefs(props);

const emit = defineEmits<{
  (e: "uploadResult", opt: UploadFinishEventOpt): void;
}>();

const _upload = useUpload();

async function customRequest(opt: CustomRequestOptions) {
  const file = opt.file.file;
  if (!file) return;
  if (upload?.value) {
    upload.value(file);
  } else {
    const opt = await _upload(file);
    emit("uploadResult", opt);
  }
}
</script>

<template>
  <n-upload abstract :customRequest="customRequest">
    <n-button-group>
      <n-upload-trigger #="{ handleClick }" abstract>
        <n-button quaternary @click="handleClick">
          <n-icon>
            <CloudUploadVue />
          </n-icon>
        </n-button>
      </n-upload-trigger>
    </n-button-group>
  </n-upload>
</template>

<style scoped></style>
