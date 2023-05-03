<script lang="ts" setup>
import { t } from "@/i18n";
import { TYPES } from "@/nostr/nostr";
import { getNostrApiMode, NostrApiMode } from "@/nostr/nostrApi/NostrApi";
import { pushToLogin } from "@/utils/nostrApiUse";
import { useNostrContainerGet } from "./NostrContainerProvade";

const dialog = useDialog();
const loginApi = useNostrContainerGet(TYPES.LoginApi);
const isLogin = computed(() => getNostrApiMode() !== NostrApiMode.NotLogin);
function handelLogout() {
  if (isLogin.value) {
    dialog.warning({
      title: t("warning"),
      content: t("message.logout_dialog_content"),
      positiveText: t("yes"),
      negativeText: t("no"),
      onPositiveClick: () => {
        loginApi.logout();
      },
    });
  } else {
    pushToLogin();
  }
}
</script>

<template>
  <div @click="handelLogout">
    <slot>{{ t("logout") }}</slot>
  </div>
</template>

<style scoped></style>
