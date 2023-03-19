<script lang="ts" setup>
import ContentBilibiliWebsiteVue from "./ContentBilibiliWebsite.vue";
import ContentDownloadBlockVue from "./ContentDownloadBlock.vue";
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
const fileExtensions =
  `.apk,.pdf,.zip,.excel,.xlsx,.7z,.exe,.docx,doc,docx,zip,rar,apk,ipa,txt,exe,7z,e,z,ct,ke,cetrainer,db,tar,pdf,w3x
epub,mobi,azw,azw3,osk,osz,xpa,cpk,lua,jar,dmg,ppt,pptx,xls,xlsx,mp3
ipa,iso,img,gho,ttf,ttc,txf,dwg,bat,imazingapp,dll,crx,xapk,conf
deb,rp,rpm,rplib,mobileconfig,appimage,lolgezi,flac
cad,hwt,accdb,ce,xmind,enc,bds,bdi,ssf,it
pkg,cfg`.split(",");
</script>

<template>
  <div class="w-full">
    <ContentBilibiliWebsiteVue v-if="bilibiliVId" :bv="bilibiliVId" />
    <ContentYouTubeWebsiteVue v-else-if="youtubeVId" :v="youtubeVId" />
    <ContentDownloadBlockVue
      v-else-if="fileExtensions.some((k) => src.endsWith(k))"
      :url="src"
    />

    <a v-else class="break-words" :href="src" target="_blank"> {{ src }} </a>
  </div>
</template>

<style scoped></style>
