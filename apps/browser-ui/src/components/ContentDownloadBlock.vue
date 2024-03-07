<script lang="ts" setup>
import DownloadFilledVue from "./icon/DownloadFilled.vue";

const props = defineProps<{
  url: string;
}>();
const { url } = toRefs(props);

const fileName = computed(() => {
  const index = url.value.lastIndexOf("/");
  const n = url.value.slice(index + 1) ?? url.value;
  return decodeURI(n);
});
const handelOpen = () => {
  window.open(url.value);
};
</script>

<template>
  <n-card class="mt-2">
    <div class="flex h-20">
      <div class="flex-1 flex-shrink flex items-center">
        <n-tooltip trigger="hover">
          <template #trigger>
            {{ fileName }}
          </template>
          {{ url }}
        </n-tooltip>
      </div>
      <div
        class="flex-shrink h-20 w-20 flex justify-center items-center"
        @click="handelOpen"
      >
        <n-icon v-if="url.endsWith('.apk')" size="3em">
          <AndroidFilled />
        </n-icon>

        <n-icon v-else-if="url.endsWith('.xlsx')" size="3em">
          <xlsx />
        </n-icon>
        <n-icon v-else-if="url.endsWith('.zip')" size="3em">
          <zip />
        </n-icon>
        <n-icon v-else-if="url.endsWith('.7z')" size="3em">
          <Icon7z />
        </n-icon>
        <n-icon v-else size="3em">
          <DownloadFilledVue />
        </n-icon>
      </div>
    </div>
  </n-card>
</template>

<style scoped></style>
