<script lang="ts" setup>
import { logout } from "@/api/login";
import { t } from "@/i18n";
import { getNostrApiMode, NostrApiMode } from "@/nostr/NostrApi";
import { pushToLogin } from "@/utils/nostrApiUse";

const dialog = useDialog();
const isLogin = computed(() => getNostrApiMode() !== NostrApiMode.NotLogin);
function handelLogout() {
  if (isLogin.value) {
    dialog.warning({
      title: t("warning"),
      content: t("message.logout_dialog_content"),
      positiveText: t("yes"),
      negativeText: t("no"),
      onPositiveClick: () => {
        logout();
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
