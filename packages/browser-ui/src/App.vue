<script setup lang="ts">
import { NConfigProvider } from "naive-ui";
import { theme } from "./app";
import Main from "./Main.vue";

const logger = loggerScope;
logger.info();
const AsyncProvides = defineAsyncComponent(
  async () => await import("./components/Provides.vue")
);
</script>

<template>
  <n-config-provider :theme="theme">
    <div
      class="body"
      :style="{
        backgroundColor: theme?.common.bodyColor,
      }"
    >
      <div class="container">
        <Suspense>
          <AsyncProvides>
            <Main></Main>
          </AsyncProvides>
        </Suspense>
      </div>
    </div>
  </n-config-provider>
</template>

<style scoped>
.body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
}
.container {
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0rem;
  overflow: hidden;
  position: relative;
}
</style>
