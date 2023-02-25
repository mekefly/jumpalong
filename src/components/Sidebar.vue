<script lang="ts" setup>
import { isFunction } from "@vueuse/core";
import { NIcon, NMenu, type MenuOption } from "naive-ui";
import { h, ref } from "vue";
import { RouterLink } from "vue-router";
import { renderIcon } from "../utils/naiveUi";
import AlertOutlineVue from "./icon/AlertOutline.vue";
import BookmarkOutlineVue from "./icon/BookmarkOutline.vue";
import CaretDownOutlineVue from "./icon/CaretDownOutline.vue";
import ClipboardTaskListLtr20FilledVue from "./icon/ClipboardTaskListLtr20Filled.vue";
import HomeVue from "./icon/Home.vue";
import LinodeVue from "./icon/Linode.vue";
import LogOutVue from "./icon/LogOut.vue";
import SettingsVue from "./icon/Settings.vue";
import UserVue from "./icon/User.vue";
import UsersVue from "./icon/Users.vue";
import LogoutButtonVue from "./LogoutButton.vue";

const { collapsed } = defineProps<{ collapsed: boolean }>();

const menuOptions = ref([
  { key: "Home", label: "首页", href: "/home", icon: renderIcon(HomeVue) },
  {
    key: "Profile",
    label: "我的",
    href: "/profile",
    icon: renderIcon(UserVue),
  },
  {
    key: "Relays",
    label: "中继",
    href: "/relays",
    icon: renderIcon(LinodeVue),
  },
  {
    key: "Channels",
    label: "频道",
    href: "/channels",
    icon: renderIcon(UsersVue),
  },
  {
    key: "Task",
    label: "任物",
    href: "/task",
    icon: renderIcon(ClipboardTaskListLtr20FilledVue),
  },
  {
    key: "Settings",
    label: "设置",
    href: "/settings",
    icon: renderIcon(SettingsVue),
  },
  {
    key: "About",
    label: "关于",
    href: "/about",

    icon: renderIcon(AlertOutlineVue),
  },
  {
    key: "Logout",
    label: () => h(LogoutButtonVue, {}, { default: () => "退出登录" }),
    icon: renderIcon(LogOutVue),
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
  return h(NIcon, null, { default: () => h(BookmarkOutlineVue) });
}
//展开图标
function expandIcon() {
  return h(NIcon, null, { default: () => h(CaretDownOutlineVue) });
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
