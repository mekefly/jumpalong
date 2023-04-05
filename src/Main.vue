<script lang="ts" setup>
// let's query for an event that exists

const router = useRouter();
const loading = useLoadingBar();
router.beforeEach(() => {
  loading.start();
});
router.afterEach(() => {
  loading.finish();
});
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
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
