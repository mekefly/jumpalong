<script lang="ts" setup>
import { useIfTransition, useLazyShow } from "@/utils/use";

const props = withDefaults(
  defineProps<{
    show?: null | boolean | undefined;
    minHeight?: number | string;
    transitionDuration?: number;
    disabled?: boolean;
    delay?: number;
  }>(),
  { show: null, minHeight: 0, transitionDuration: 500, delay: 500 }
);
const { transitionDuration, delay, disabled } = toRefs(props);

const emit = defineEmits<{
  (e: "update:show", v: boolean): void;
}>();

const wrap = ref();
const target = ref();

const isShow =
  props.show === undefined || props.show === null
    ? useLazyShow(delay.value, { target: wrap })[1]
    : (toRef(props, "show") as Ref<boolean>);
const { transitionActive, safeActive, duration, show, hidden, transitioning } =
  useIfTransition(transitionDuration);

watch(isShow, (s) => {
  s ? show() : hidden();
  emit("update:show", s);
});

const { height } = useElementBounding(target);
const _height = ref(0);
watch(height, (h) => {
  if (!h) {
    return;
  } else {
    _height.value = h;
    return;
  }
});
</script>

<template>
  <div
    ref="wrap"
    class="overflow-hidden relative"
    :style="{
      minHeight: safeActive
        ? '0px'
        : typeof minHeight === 'number'
        ? `${minHeight}px`
        : minHeight,
      height: transitionActive ? `${_height}px` : '0px',
      transition: `height ${duration}ms ease-out`,
    }"
  >
    <div
      v-if="minHeight > 100 && (!safeActive || transitioning)"
      class="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center"
      :style="{
        opacity: transitionActive ? 0 : 1,

        transition: `opacity ${duration}ms ease-out`,
      }"
    >
      <n-spin size="medium" />
    </div>
    <div
      v-if="safeActive"
      ref="target"
      :style="{
        opacity: transitionActive ? 1 : 0,

        transition: `opacity ${duration}ms ease-in`,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
