<script lang="ts" setup>
import { t } from "@/i18n";
import { type UserMetaData } from "@/types/User";
import UploadButtonVue from "./UploadButton.vue";

const props = defineProps<{
  userMetadata: UserMetaData;
}>();
const { userMetadata } = toRefs(props);
</script>

<template>
  <n-input
    type="text"
    :placeholder="t('username')"
    v-model:value="userMetadata.name"
  />
  <n-input
    type="textarea"
    :placeholder="t('about')"
    v-model:value="userMetadata.about"
    class="mt-2"
  />
  <div class="mt-2 flex">
    <n-input
      type="text"
      :placeholder="t('picture')"
      v-model:value="userMetadata.picture"
    />
    <div class="ml-2">
      <UploadButtonVue
        @upload-result="
          ({ url }) => {
            userMetadata.picture = url;
          }
        "
      />
    </div>
  </div>
  <div class="mt-2 flex">
    <n-input
      type="text"
      :placeholder="t('banner')"
      v-model:value="userMetadata.banner"
    />

    <div class="ml-2">
      <UploadButtonVue
        @upload-result="
          ({ url }) => {
            userMetadata.banner = url;
          }
        "
      />
    </div>
  </div>
  <n-input
    class="mt-2"
    type="text"
    :placeholder="t('nip5')"
    v-model:value="userMetadata.nip05"
  />
  <n-input
    class="mt-2"
    type="text"
    :placeholder="`${t('lud16')}: username@domain.xxx`"
    v-model:value="userMetadata.lud16"
  />
</template>

<style scoped></style>
