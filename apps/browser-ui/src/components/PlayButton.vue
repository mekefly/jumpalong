<script lang="ts" setup>
import { ref, watch, watchEffect } from "vue";
const props = withDefaults(defineProps<{ value?: boolean }>(), {
  value: true,
});

const emit = defineEmits<{ (e: "update:value", value: boolean): void }>();

const isPlay = ref(props.value);

watchEffect(() => {
  isPlay.value = props.value;
});
watch(isPlay, () => {
  emit("update:value", isPlay.value);
});
</script>

<template>
  <div
    class="play"
    :class="{ pause: !isPlay }"
    @click="() => (isPlay = !isPlay)"
  >
    <!-- 为什么要在菱形上包一曾，因为使用transform后再使用旋转会出一些问题，外面包一层可以认为是一个组件把菱形隔离起来，就可以直接旋转了 -->
    <div><div class="diamond"></div></div>
    <div><div class="diamond"></div></div>
    <div><div class="diamond"></div></div>
  </div>
</template>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

.play {
  /* 调整这里改变一些设置 */
  --duration: 0.6s;
  --transition: all var(--duration) ease;
  --size: 100%;
  --color: #888;

  position: relative;
  height: var(--size);
  width: var(--size);
  transition: var(--transition);
}

.play.pause {
  transform: rotate(90deg);
  transition: var(--transition);
}

.play > div > div {
  position: absolute;
  top: 0%;

  transition: var(--transition);
}

.play > div {
  position: absolute;
  top: 0%;

  transition: var(--transition);
}

.play:not(.pause) > div {
  height: 100%;
  width: 100%;
}

.play:not(.pause) > div > div {
  height: 100%;
  width: 40%;
  background-color: var(--color);
  border-radius: calc(var(--size) / 10);
}

.play:not(.pause) > div:nth-child(1) {
  left: 60%;
}

.play:not(.pause) > div:nth-child(2) {
  left: 80%;
  top: 50%;

  height: 0%;
  width: 0%;
  transform: rotate(120deg);
}

.play:not(.pause) > div:nth-child(3) {
  left: 0%;
}

.pause > div {
  --radius: calc(var(--size) / 2);
  height: 100%;
  width: 100%;
}

.pause .diamond {
  height: 100%;
  width: 100%;

  border-radius: 0px;

  background-color: var(--color);

  border-top-right-radius: var(--radius);

  transform: matrix(0.25, -0.433, 0.25, 0.433, 0, 0);

  transition: all var(--duration) ease,
    border-radius var(--duration) ease var(--duration),
    border-top-right-radius var(--duration) ease;
}

.pause > div:nth-child(1) {
  left: 0%;
  top: -7.217%;
  transform: rotate(0deg);
}

.pause > div:nth-child(2) {
  left: 12.5%;
  top: 14.234%;
  transform: rotate(120deg);
}

.pause > div:nth-child(3) {
  left: -12.5%;
  top: 14.234%;
  transform: rotate(-120deg);
}
</style>
