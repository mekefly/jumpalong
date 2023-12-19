<script lang="ts" setup>
import { useIfTransition, useScale } from "@/utils/use";
import PlayButton from "./PlayButton.vue";
const props = defineProps<{ bv: string }>();
const { bv } = toRefs(props);

const url = computed(
  () =>
    `//player.bilibili.com/player.html?bvid=${bv.value}&&page=1&as_wide=1&high_quality=1&danmaku=0`
);

const [bilibili_player_ref] = useScale();

const isPlay = ref(false);

const {
  duration,
  transitionActive,
  safeActive: isShowPlayButton,
  show,
  hidden,
} = useIfTransition();
let timeoutId = null as any;
show();
watch(isPlay, () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    isPlay.value ? hidden() : show();
  }, 3000);
});
</script>

<template>
  <div
    ref="bilibili_player_ref"
    class="w-full rounded-xl overflow-hidden relative"
  >
    <n-card class="h-full w-full">
      <div
        v-if="isShowPlayButton"
        class="w-full h-full flex flex-col justify-center items-center absolute left-0 right-0 top-0 bottom-0"
        :style="{
          opacity: transitionActive ? 1 : 0,
          transition: `opacity ${duration}ms ease `,
        }"
      >
        <n-icon
          class="absolute top-[25%]"
          :style="{ transform: 'translate(0,-50%)' }"
          size="15em"
          color="rgb(0, 174, 236)"
        >
          <bilibiliLogo class="h-40 w-40" />
        </n-icon>
        <div class="flex flex-shrink-0 w-40 h-40">
          <PlayButton v-model:value="isPlay" />
        </div>
      </div>
      <iframe
        v-if="isPlay"
        class="w-full h-full"
        :src="url"
        allowfullscreen
        height="0"
        width="100%"
        scrolling="no"
        frameborder="0"
        sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
      >
        <span
          data-mce-type="bookmark"
          style="
            display: inline-block;
            width: 0px;
            overflow: hidden;
            line-height: 0;
          "
          class="mce_SELRES_start"
        ></span>
      </iframe>
    </n-card>
  </div>
</template>

<style scoped></style>
