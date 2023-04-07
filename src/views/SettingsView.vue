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
  dialog.info({
    title: t("info"),
    content: t("are_you_sure"),
    positiveText: t("yes"),
    negativeText: t("no"),
    onPositiveClick: () => {
      intelligentCleaning();
      location.reload();
    },
    onNegativeClick: () => {},
  });
}
function handelClearCache() {
  dialog.info({
    title: t("info"),
    content: t("are_you_sure"),
    positiveText: t("yes"),
    negativeText: t("no"),
    onPositiveClick: () => {
      clearCache();
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
      <n-thing :title="t('hide_rules')"> </n-thing>
      <template #suffix>
        <n-icon><ArrowForwardIosRoundVue /> </n-icon>
      </template>
    </n-list-item>
    <n-list-item @click="handelIntelligentCleaning">
      <n-thing :title="t('clear_expired_cache')"> </n-thing>
    </n-list-item>
    <n-list-item @click="handelClearCache">
      <n-thing :title="t('clear_all_caches')"> </n-thing>
    </n-list-item>
    <n-list-item @click="handelClearLocalStorage">
      <n-thing :title="t('clear_local_storage')"> </n-thing>
    </n-list-item>

    <n-list-item>
      <n-thing :title="t('automatic_ping')"> </n-thing>
      <template #suffix>
        <n-switch v-model:value="config.autoPing" />
      </template>
    </n-list-item>

    <n-list-item>
      <n-thing :title="t('enable_papaw_tree')"> </n-thing>
      <template #suffix>
        <n-switch v-model:value="config.enablePapawTree" />
      </template>
    </n-list-item>

    <n-list-item>
      <n-thing :title="t('enable_papaw_tree_lazy_mode')"> </n-thing>
      <template #suffix>
        <n-switch v-model:value="config.enablePapawTreeLazyMode" />
      </template>
    </n-list-item>

    <n-list-item>
      <n-thing
        :description="t('lazy_delay_for_papaw_tip')"
        :titleExtra="String(config.lazyDelayForPapaw)"
      >
        <template #header> {{ t("lazy_delay_for_papaw") }} </template>
        <template #footer>
          <n-slider
            v-model:value="config.lazyDelayForPapaw"
            :step="50"
            :min="0"
            :max="1000"
          />
        </template>
      </n-thing>
    </n-list-item>

    <n-list-item>
      <n-thing :titleExtra="String(config.relayEmiterQueueInterval)">
        <template #header> {{ t("relay_emiter_queue_interval") }} </template>
        <template #footer>
          <n-slider
            v-model:value="config.relayEmiterQueueInterval"
            :min="0"
            :max="20"
          />
        </template>
      </n-thing>
    </n-list-item>
    <n-list-item
      @click="
        () =>
          $router.push({
            name: 'move-house',
          })
      "
    >
      <n-thing :description="t('move_house_description')">
        <template #header> {{ t("move_house") }} </template>
      </n-thing>
    </n-list-item>
  </n-list>
</template>

<style scoped></style>
