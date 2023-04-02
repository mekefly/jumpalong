<script lang="ts" setup>
import { Placement } from "naive-ui/es/drawer/src/DrawerBodyWrapper";
import { useDrawerState } from "./Drawer";
const props = withDefaults(
  defineProps<{
    show?: boolean;
    width?: number | string;
    height?: number | string;
    placement?: Placement;
    title?: string;
    closable?: boolean;
  }>(),
  {
    width: "100%",
    height: 100,
    placement: "bottom",
    title: "",
  }
);
const emit = defineEmits<{
  (e: "update:show", v: boolean): void;
}>();

const { id } = useDrawerState() ?? {};
</script>

<template>
  <n-drawer
    :show="show"
    @update:show="emit('update:show', !show)"
    :width="width"
    :height="height"
    :placement="placement"
    :trap-focus="false"
    :block-scroll="false"
    :to="id ? `#${id}` : undefined"
  >
    <n-drawer-content :title="title" :closable="closable">
      <slot></slot>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
