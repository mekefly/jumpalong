<script lang="ts" setup>
const router = useRouter();
function handleBack() {
  router.back();
}
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex-shrink-0">
      <n-page-header subtitle="" @back="handleBack"> </n-page-header>
    </div>
    <div class="flex-grow flex-shrink h-0">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped></style>
