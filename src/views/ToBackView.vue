<script lang="ts" setup>
const router = useRouter();
function handleBack() {
  router.back();
}
</script>

<template>
  <n-page-header subtitle="" @back="handleBack">
    <RouterView></RouterView>
  </n-page-header>
</template>

<style scoped></style>
