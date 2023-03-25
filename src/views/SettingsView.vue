<script lang="ts" setup>
import { t } from "@/i18n";
import { config } from "@/nostr/nostr";
import ArrowForwardIosRoundVue from "../components/icon/ArrowForwardIosRound.vue";
import { clearCache, intelligentCleaning } from "../utils/cache/index";
const dialog = useDialog();
const message = useMessage();
function handelClearLocalStorage() {
  dialog.warning({
    title: t("warning"),
    content: t("clear_local_storage_warning"),
    positiveText: t("yes"),
    negativeText: t("no"),
    onPositiveClick: () => {
      localStorage.clear();
      location.reload();
    },
    onNegativeClick: () => {},
  });
}
function handelIntelligentCleaning() {
  intelligentCleaning();
  message.success(t("message.cleanup_succeeded"));
}
function handelClearCache() {
  clearCache();
  message.success(t("message.cleanup_succeeded"));
}
</script>

<template>
  <n-list clickable hoverable>
    <n-list-item
      @click="() => $router.push({ name: 'content-blacklist-view' })"
    >
      {{ t("hide_rules") }}
      <template #suffix>
        <n-icon><ArrowForwardIosRoundVue /> </n-icon>
      </template>
    </n-list-item>
    <n-list-item @click="handelIntelligentCleaning">{{
      t("clear_expired_cache")
    }}</n-list-item>
    <n-list-item @click="handelClearCache">{{
      t("clear_all_caches")
    }}</n-list-item>
    <n-list-item @click="handelClearLocalStorage">{{
      t("clear_local_storage")
    }}</n-list-item>
    <n-list-item>
      {{ t("automatic_ping") }}
      <template #suffix>
        <n-switch v-model:value="config.autoPing" />
      </template>
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
