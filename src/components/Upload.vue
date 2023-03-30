<script lang="ts" setup>
import { t } from "@/i18n";
import CloudUploadVue from "./icon/CloudUpload.vue";
import { useFileList, useShow } from "./Upload";
const { isShow, show, hidden } = useShow();

const fileList = useFileList();
const uploadingNumber = computed(
  () => fileList.value.filter((item) => item.status === "uploading").length
);
</script>

<template>
  <div class="">
    <n-popover v-model:show="isShow" display-directive="show" trigger="manual">
      <template #trigger>
        <n-button quaternary @click="isShow = !isShow">
          <n-icon :size="20">
            <CloudUploadVue />
          </n-icon>
          <span v-if="uploadingNumber > 0" class="ml-1">
            {{ uploadingNumber }}
          </span>
        </n-button>
      </template>

      <n-empty v-show="fileList.length === 0" :description="t('empty_text')">
      </n-empty>
      <n-upload-file-list class="min-w-[25em]" />
    </n-popover>
  </div>
</template>

<style scoped></style>
