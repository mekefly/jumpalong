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
const uploadedSet = new Set<string>();

async function customRequest({
  file: { file, status, id },
  onFinish,
}: CustomRequestOptions) {
  if (uploadedSet.has(id)) {
    return;
  }

  if (status !== "pending") {
    return;
  }
  if (!file) return;

  if (upload?.value) {
    upload.value(file);
    uploadedSet.add(id);
    onFinish();
  } else {
    const opt = await _upload(file);
    onFinish();
    uploadedSet.add(id);
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
