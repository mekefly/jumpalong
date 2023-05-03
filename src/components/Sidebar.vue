<script lang="ts" setup>
import { t } from "@/i18n";
import { getNostrApiMode, NostrApiMode } from "@/nostr/nostrApi/NostrApi";
import { isFunction } from "@vueuse/core";
import { NIcon, NMenu, type MenuOption } from "naive-ui";
import { h } from "vue";
import { RouterLink } from "vue-router";
import { renderIcon } from "../utils/naiveUi";
import Alert16Filled from "./icon/Alert16Filled.vue";
import AlertOutlineVue from "./icon/AlertOutline.vue";
import BookmarkOutlineVue from "./icon/BookmarkOutline.vue";
import BookStar20Filled from "./icon/BookStar20Filled.vue";
import CaretDownOutlineVue from "./icon/CaretDownOutline.vue";
import ClipboardTaskListLtr20FilledVue from "./icon/ClipboardTaskListLtr20Filled.vue";
import Edit24Filled from "./icon/Edit24Filled.vue";
import HomeVue from "./icon/Home.vue";
import LinodeVue from "./icon/Linode.vue";
import LogOutVue from "./icon/LogOut.vue";
import SettingsVue from "./icon/Settings.vue";
import UserVue from "./icon/User.vue";
import UsersVue from "./icon/Users.vue";
import LogoutButtonVue from "./LogoutButton.vue";

const { collapsed } = defineProps<{ collapsed: boolean }>();

const isLogin = computed(() => getNostrApiMode() !== NostrApiMode.NotLogin);

const menuOptions = computed(
  () =>
    [
      {
        key: "Home",
        label: t("home"),
        href: "/home",
        icon: renderIcon(HomeVue),
      },
      {
        key: "MarkdownEditor",
        label: t("markdown_editor"),
        href: "/markdown/editor",
        icon: renderIcon(Edit24Filled),
      },
      {
        key: "Profile",
        label: t("profile"),
        href: "/profile",
        icon: renderIcon(UserVue),
      },
      {
        key: "Relays",
        label: t("relays"),
        href: "/relays",
        icon: renderIcon(LinodeVue),
      },
      {
        key: "Collect",
        label: t("collect"),
        href: "/collect",
        icon: renderIcon(BookStar20Filled),
      },
      {
        key: "Channels",
        label: t("channel"),
        href: "/channels",
        icon: renderIcon(UsersVue),
      },
      {
        key: "Notice",
        label: t("notice"),
        href: "/notice",
        icon: renderIcon(Alert16Filled),
      },
      {
        key: "Task",
        label: t("task"),
        href: "/task",
        icon: renderIcon(ClipboardTaskListLtr20FilledVue),
      },
      {
        key: "Settings",
        label: t("settings"),
        href: "/settings",
        icon: renderIcon(SettingsVue),
      },
      {
        key: "About",
        label: t("about"),
        href: "/about",

        icon: renderIcon(AlertOutlineVue),
      },
      {
        key: "Logout",
        label: () =>
          h(
            LogoutButtonVue,
            {},
            { default: () => (isLogin.value ? t("logout") : t("login")) }
          ),

        icon: renderIcon(LogOutVue),
      },
    ] as MenuOption[]
);

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
