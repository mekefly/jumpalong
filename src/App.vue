<script setup lang="ts">
import { NMessageProvider } from "naive-ui";
// let's query for an event that exists
import { NConfigProvider } from "naive-ui";
import { theme } from "./App";
</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <div class="w-full h-screen">
        <RouterView />
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.box-shadow {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
