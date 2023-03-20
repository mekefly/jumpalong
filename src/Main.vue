<script lang="ts" setup>
import { useThemeVars } from "naive-ui";
// let's query for an event that exists
const themeVars = useThemeVars();
watchEffect(() => {
  document.body.style.background = themeVars.value.bodyColor;
});
</script>

<template>
  <div
    class="body"
    :style="{
      backgroundColor: themeVars.bodyColor,
    }"
  >
    <div class="container">
      <div class="w-full h-screen overflow-hidden">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
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
}
</style>
