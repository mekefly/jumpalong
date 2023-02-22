<script lang="ts" setup>
import { Linode, User, Users } from "@vicons/fa";
import {
  AlertOutline,
  BookmarkOutline,
  CaretDownOutline,
  Home,
  LogOut,
  Settings,
} from "@vicons/ionicons5";
import { isFunction } from "@vueuse/core";
import { NIcon, NMenu, type MenuOption } from "naive-ui";
import { h, ref } from "vue";
import { RouterLink } from "vue-router";
import { renderIcon } from "../utils/naiveUi";
import { useRouterPath } from "../utils/use";
import LogoutButton from "./LogoutButton.vue";

const { collapsed } = defineProps<{ collapsed: boolean }>();

const hash = useRouterPath();

const menuOptions = ref([
  { key: "Home", label: "首页", href: "/home", icon: renderIcon(Home) },
  { key: "Profile", label: "我的", href: "/profile", icon: renderIcon(User) },
  { key: "Relays", label: "中继", href: "/relays", icon: renderIcon(Linode) },
  {
    key: "Channels",
    label: "频道",
    href: "/channels",
    icon: renderIcon(Users),
  },
  {
    key: "Settings",
    label: "设置",
    href: "/settings",
    icon: renderIcon(Settings),
  },
  {
    key: "About",
    label: "关于",
    href: "/about",

    icon: renderIcon(AlertOutline),
  },
  {
    key: "Logout",
    label: () => h(LogoutButton, {}, { default: () => "退出登录" }),
    icon: renderIcon(LogOut),
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
  if (option.icon) return option.icon();
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
