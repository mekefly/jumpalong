<script lang="ts" setup>
import { useCustomRequest, useFileList, useUploadRef } from "./Upload";

const uploadRef = useUploadRef();
const fileList = useFileList();
const customRequest = useCustomRequest();
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
