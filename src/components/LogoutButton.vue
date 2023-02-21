<script lang="ts" setup>
import { NPopconfirm } from "naive-ui";
import { logout } from "../api/user";
</script>

<template>
  <n-popconfirm @positive-click="logout">
    <template #trigger>
      <slot>Logout</slot>
    </template>
    确认退出登录吗？您是否确认已经备份私钥?
  </n-popconfirm>
</template>

<style scoped></style>
