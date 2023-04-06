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

<style scoped></style>
