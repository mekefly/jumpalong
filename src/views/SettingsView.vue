<script lang="ts" setup>
import { config } from "@/nostr/nostr";
import ArrowForwardIosRoundVue from "../components/icon/ArrowForwardIosRound.vue";
import { clearCache, intelligentCleaning } from "../utils/cache/index";
const dialog = useDialog();
function handelClearLocalStorage() {
  dialog.warning({
    title: "警告",
    content:
      "您确定要清理localStorage吗？localStorage是浏览器提供的本地存储，您需要备份一下私钥和稍微记忆一下中续，否则此账户将无法登录",
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: () => {
      localStorage.clear();
      location.reload();
    },
    onNegativeClick: () => {},
  });
}
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
    <n-list-item @click="intelligentCleaning">清楚垃圾缓存</n-list-item>
    <n-list-item @click="clearCache">清楚缓存</n-list-item>
    <n-list-item @click="handelClearLocalStorage">清楚本地存储</n-list-item>
    <n-list-item>
      中继自动Ping
      <template #suffix>
        <n-switch v-model:value="config.autoPing" />
      </template>
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
