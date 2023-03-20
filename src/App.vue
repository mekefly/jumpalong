<script setup lang="ts">
import { NMessageProvider } from "naive-ui";
// let's query for an event that exists
import { NConfigProvider } from "naive-ui";
import { theme } from "./app";
import Main from "./Main.vue";
logger.for("app.vue").info("进入app.vue");
</script>

<template>
  <n-config-provider :theme="theme">
    <n-dialog-provider>
      <n-message-provider>
        <Main></Main>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style scoped></style>
