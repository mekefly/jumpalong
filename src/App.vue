<script setup lang="ts">
import { NMessageProvider } from "naive-ui";
// let's query for an event that exists
import { NConfigProvider } from "naive-ui";

import { theme } from "./app";
logger.for("app.vue").info("进入app.vue");
</script>

<template>
  <n-config-provider :theme="theme">
    <n-dialog-provider>
      <n-message-provider>
        <div class="w-full h-screen">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style scoped>
.box-shadow {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
