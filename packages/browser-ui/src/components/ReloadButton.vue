<script lang="ts" setup>
import ReloadCircleSharp from "./icon/ReloadCircleSharp.vue";

const loadingBar = useLoadingBar();
function handelReload() {
  loadingBar.start();
  location.reload();
}
</script>

<template>
  <n-button @click="handelReload" quaternary>
    <n-icon size="20">
      <ReloadCircleSharp />
    </n-icon>
  </n-button>
</template>

<style scoped></style>
