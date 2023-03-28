<script lang="ts" setup>
import { useLimitMovement } from "@/utils/use";
import { debounce } from "@/utils/utils";
import { useInjectScrollbarInstRef } from "./Scrollbar";

const props = withDefaults(
  defineProps<{
    refreshable?: boolean;
    loadable?: boolean;
    triggerDistance?: number;
    maxShifting?: number;
    containerRef?: HTMLElement | null | undefined;
  }>(),
  {
    triggerDistance: 150,
    maxShifting: 200,
  }
);

const emit = defineEmits<{
  (e: "refresh"): void;
  (e: "load"): void;
}>();
const { refreshable, loadable, containerRef, maxShifting } = toRefs(props);

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
} = useLimitMovement(maxShifting);
let lastY: null | number = null;
const { x, y, arrivedState } = useScroll(containerRef);
useEventListener(containerRef, "touchstart", (e: TouchEvent) => {
  homing();

  transition.value = false;
});

const reset = debounce(() => {
  trigger();

  homing();
  transition.value = true;
}, 500);
useEventListener(containerRef, "mousewheel", (e: any) => {
  if (!(arrivedState.bottom || arrivedState.top)) return;

  reset();
  add(-e.wheelDeltaY / 3);
  transition.value = true;
});
useEventListener(containerRef, "touchmove", (e: TouchEvent) => {
  if (!(arrivedState.bottom || arrivedState.top)) return;
  const clientY = e.touches[0].clientY;
  if (!clientY) return;
  if (lastY) {
    add(lastY - clientY);
  }
  lastY = clientY;
});
useEventListener(containerRef, "touchend", (e: TouchEvent) => {
  //如果不是顶部和底部的话，就忽略
  if (!(arrivedState.bottom || arrivedState.top)) return;
  trigger();

  homing();
  transition.value = true;
});
//自动复原
watchEffect(() => {
  if (arrivedState.bottom || arrivedState.top) return;
  homing();
  transition.value = true;
});
function trigger() {
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
const scrollbarInst = useInjectScrollbarInstRef();

// 限制反向拖动
const shifting = computed(() => {
  if (totalTravelDistanceY.value < 0) {
    if (arrivedState.top) {
      return totalTravelDistanceY.value;
    }
  }
  if (totalTravelDistanceY.value > 0) {
    const target = scrollbarInst?.containerRef.value;

    if (
      arrivedState.bottom ||
      (target && target.offsetHeight === target.scrollHeight) //解决
    ) {
      return totalTravelDistanceY.value;
    }
  }
  return 0;
});
</script>

<template>
  <div
    class="w-full h-20 flex items-center justify-center absolute"
    :style="{
      transform: `translate(0,calc(${-shifting}px + -100%)) rotate(${
        -shifting * 10
      }deg)`,
      transition: transition ? 'transform 0.5s' : '',
      zIndex: 1,
    }"
  >
    <n-icon :size="50"><ReloadCircleSharp></ReloadCircleSharp></n-icon>
  </div>
  <div
    class="wraps flex flex-col h-full relative overflow-hidden"
    :style="{
      transform: `translate(0,calc(${-shifting / 4}px ))`,
      transition: transition ? 'transform 0.3s' : '',
      zIndex: 0,
    }"
  >
    <slot></slot>
  </div>
  <div
    class="w-full h-20 flex items-center justify-center absolute bottom-0"
    :style="{
      transform: `translate(0px,calc(${-shifting}px + 100%)) rotate(${
        -shifting * 10
      }deg)`,
      transition: transition ? 'transform 0.3s' : '',
      zIndex: 1,
    }"
  >
    <n-icon :size="50"><ReloadCircleSharp></ReloadCircleSharp></n-icon>
  </div>
</template>

<style scoped></style>
