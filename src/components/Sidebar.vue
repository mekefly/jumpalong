<script lang="ts" setup>
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
import { isFunction } from "@vueuse/core";
import { NIcon, NMenu, type MenuOption } from "naive-ui";
import { h, ref } from "vue";
import { RouterLink } from "vue-router";
import { useRouterPath } from "../utils/use";
import LogoutButton from "./LogoutButton.vue";
const { collapsed } = defineProps<{ collapsed: boolean }>();

const hash = useRouterPath();

const menuOptions = ref([
  { key: "Profile", label: "Profile", href: "/profile" },
  { key: "Relays", label: "Relays", href: "/relays" },
  { key: "Global Feed", label: "Global Feed", href: "/home" },
  { key: "My Feed", label: "My Feed", href: "/feed" },
  { key: "Channels", label: "Channels", href: "/channels" },
  { key: "Settings", label: "Settings", href: "/settings" },
  { key: "About", label: "About", href: "/about" },
  {
    key: "Logout",
    label: () => h(LogoutButton),
  },
] as MenuOption[]);

function renderMenuLabel(option: MenuOption) {
  if ("href" in option) {
    return h(
      RouterLink as any,
      {
        to: option.href,
      },
      { default: () => option.label }
    );
  }

  if (isFunction(option.label)) {
    return option.label();
  }
  return option.label as string;
}
function renderMenuIcon(option: MenuOption) {
  // 渲染图标占位符以保持缩进
  if (option.key === "sheep-man") return true;
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === "food") return null;
  return h(NIcon, null, { default: () => h(BookmarkOutline) });
}
//展开图标
function expandIcon() {
  return h(NIcon, null, { default: () => h(CaretDownOutline) });
}
</script>

<template>
  <n-menu
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    :render-label="renderMenuLabel"
    :render-icon="renderMenuIcon"
    :expand-icon="expandIcon"
  />
</template>

<style scoped></style>
