<script lang="ts" setup>
import { logout } from "@/api/login";
import { t } from "@/i18n";

const dialog = useDialog();
function handelLogout() {
  dialog.warning({
    title: t("warning"),
    content: t("message.logout_dialog_content"),
    positiveText: t("yes"),
    negativeText: t("no"),
    onPositiveClick: () => {
      logout();
    },
  });
}
</script>

<template>
  <div @click="handelLogout">
    <slot>{{ t("logout") }}</slot>
  </div>
</template>

<style scoped></style>
