<script lang="ts" setup>
import ContentBilibiliWebsiteVue from "./ContentBilibiliWebsite.vue";
import ContentYouTubeWebsiteVue from "./ContentYouTubeWebsite.vue";

const props = defineProps<{
  src: string;
}>();
const { src } = toRefs(props);

const bilibiliVId = computed(() => {
  const regExpMatchArray = /bilibili.com.*(BV[A-Za-z0-9]{5,20})\//[
    Symbol.match
  ](src.value);
  if (!regExpMatchArray) return;
  const bv = regExpMatchArray[1];
  if (!bv) return;
  return bv;
});
const youtubeVId = computed(() => {
  const regExpMatchArray = /youtube.com\/.*v=([a-zA-Z0-9]+)/[Symbol.match](
    src.value
  );
  if (!regExpMatchArray) return;

  const v = regExpMatchArray[1];

  if (!v) return;
  return v;
});
</script>

<template>
  <div class="w-full">
    <ContentBilibiliWebsiteVue v-if="bilibiliVId" :bv="bilibiliVId" />
    <ContentYouTubeWebsiteVue v-else-if="youtubeVId" :v="youtubeVId" />

    <a v-else class="break-words" :href="src">
      {{ src }}
    </a>
  </div>
</template>

<style scoped></style>
