<script lang="ts" setup>
import { useLimitMovement } from "@/utils/use";
import { debounce } from "@/utils/utils";

const props = withDefaults(
  defineProps<{
    refreshable?: boolean;
    loadable?: boolean;
    triggerDistance?: number;
    maxShifting?: number;
    containerRef?: HTMLElement | null | undefined;
  }>(),
  {
    triggerDistance: 70,
    maxShifting: 100,
  }
);
const emit = defineEmits<{
  (e: "refresh"): void;
  (e: "load"): void;
}>();
const { refreshable, loadable, containerRef } = toRefs(props);

function refresh() {
  if (!refreshable?.value) return;
  emit("refresh");
}
function load() {
  if (!loadable?.value) return;
  emit("load");
}

const {
  shifting: totalTravelDistanceY,
  moveScale: workRatio,
  add,
  remake,
} = useLimitMovement(toRef(props, "maxShifting"));
let lastY: null | number = null;
const { x, y, arrivedState } = useScroll(containerRef);
useEventListener(containerRef, "touchstart", (e: TouchEvent) => {
  homing();

  transition.value = false;
});

const reset = debounce(() => {
  handel();

  homing();
  transition.value = true;
}, 500);
useEventListener(containerRef, "mousewheel", (e: any) => {
  if (!arrivedState.bottom && !arrivedState.top) return;

  reset();
  add(-e.wheelDeltaY / 3);
  transition.value = true;
});
useEventListener(containerRef, "touchmove", (e: TouchEvent) => {
  if (!arrivedState.bottom && !arrivedState.top) return;
  const clientY = e.touches[0].clientY;
  if (!clientY) return;
  if (lastY) {
    add(lastY - clientY);
  }
  lastY = clientY;
});
useEventListener(containerRef, "touchend", (e: TouchEvent) => {
  //如果不是顶部和底部的话，就忽略
  if (!arrivedState.bottom && !totalTravelDistanceY.value) return;
  handel();

  homing();
  transition.value = true;
});
function handel() {
  if (Math.abs(totalTravelDistanceY.value) > props.triggerDistance) {
    if (totalTravelDistanceY.value > 0) {
      load();
    } else if (totalTravelDistanceY.value < 0) {
      refresh();
    }
  }
}
function homing() {
  remake();
  lastY = null;
}
const transition = ref(false);
</script>

<template>
  <div
    class="w-full h-20 flex items-center justify-center absolute"
    v-if="arrivedState.top && refreshable"
    :style="{
      transform: `translate(0,calc(${-totalTravelDistanceY}px + -100%)) rotate(${
        -totalTravelDistanceY * 10
      }deg)`,
      transition: transition ? 'transform 0.3s' : '',
    }"
  >
    <n-icon :size="50"><ReloadCircleSharp></ReloadCircleSharp></n-icon>
  </div>
  <div
    class="wraps flex flex-col h-full relative overflow-hidden"
    :style="{
      transform: `translate(0,calc(${-totalTravelDistanceY}px ))`,
      transition: transition ? 'transform 0.5s' : '',
    }"
  >
    <slot></slot>
  </div>
  <div
    class="w-full h-20 flex items-center justify-center absolute bottom-0"
    v-if="arrivedState.bottom && loadable"
    :style="{
      transform: `translate(0px,calc(${-totalTravelDistanceY}px + 100%)) rotate(${
        -totalTravelDistanceY * 10
      }deg)`,
      transition: transition ? 'transform 0.3s' : '',
    }"
  >
    <n-icon :size="50"><ReloadCircleSharp></ReloadCircleSharp></n-icon>
  </div>
</template>

<style scoped></style>
