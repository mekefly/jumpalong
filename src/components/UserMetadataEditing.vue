<script lang="ts" setup>
import { UserMetaData } from "@/api/user";
import UploadButtonVue from "./UploadButton.vue";

const props = defineProps<{
  userMetadata: UserMetaData;
}>();
const { userMetadata } = toRefs(props);
</script>

<template>
  <n-input type="text" placeholder="用户名" v-model:value="userMetadata.name" />
  <n-input
    type="textarea"
    placeholder="介绍"
    v-model:value="userMetadata.about"
    class="mt-2"
  />
  <div class="mt-2 flex">
    <n-input
      type="text"
      placeholder="profileUrl"
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
      placeholder="banner"
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
    placeholder="nip5用户认证"
    v-model:value="userMetadata.nip05"
  />
</template>

<style scoped></style>
