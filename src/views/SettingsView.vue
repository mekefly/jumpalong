<script lang="ts" setup>
import ArrowForwardIosRoundVue from "../components/icon/ArrowForwardIosRound.vue";
import { clearCache } from "../utils/cache/index";
</script>

<template>
  <n-list clickable hoverable>
    <n-list-item
      @click="() => $router.push({ name: 'content-blacklist-view' })"
    >
      设置屏蔽规则
      <template #suffix>
        <n-icon><ArrowForwardIosRoundVue /> </n-icon>
      </template>
    </n-list-item>
    <n-list-item @click="clearCache">清楚垃圾缓存</n-list-item>
    <n-list-item @click="clearCache">清楚缓存</n-list-item>
  </n-list>
</template>

<style scoped></style>
