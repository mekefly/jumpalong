<script lang="ts" setup>
import { logout } from "@/api/login";

const dialog = useDialog();
function handelLogout() {
  dialog.warning({
    title: "警告",
    content:
      "确认退出登录吗？您是否确认已经备份私钥?如果您没有备份私钥，您将再也无法登录此账户",
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: () => {
      logout();
    },
  });
}
</script>

<template>
  <div @click="handelLogout">
    <slot>Logout</slot>
  </div>
</template>

<style scoped></style>
