<script lang="ts" setup>
import { useCustomRequest, useFileList, useShow, useUploadRef } from "./Upload";
const { isShow, show, hidden } = useShow();

const uploadRef = useUploadRef();
const fileList = useFileList();
const customRequest = useCustomRequest();
const uploadingNumber = computed(
  () => fileList.value.filter((item) => item.status === "uploading").length
);
</script>

<template>
  <n-upload
    abstract
    ref="uploadRef"
    v-model:fileList="fileList"
    show-preview-button
    show-download-button
    show-cancel-button
    show-remove-button
    :customRequest="customRequest"
  >
    <slot></slot>
  </n-upload>
</template>

<style scoped></style>
