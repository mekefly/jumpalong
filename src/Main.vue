<script lang="ts" setup>
// let's query for an event that exists

import Router from "./components/Router.vue";

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
  <Router></Router>
</template>

<style scoped></style>
