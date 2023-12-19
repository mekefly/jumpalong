<script lang="ts" setup>
import { t } from "@/i18n";
import { useThemeVars } from "naive-ui";
import { relayConfigurator } from "../nostr/nostr";
import TooltipVue from "./Tooltip.vue";
const msg = useMessage();
const optsRef = ref(
  null as null | {
    numberOfErrors: number;
    numberOfSuccesses: number;
    numberOfOvertime: number;
    total: number;
  }
);
function broadcast() {
  const opts = relayConfigurator.broadcast({ slef: reactive({}) });
  if (!opts) {
    msg.error(t("broadcast_error_message"));
    return;
  }

  optsRef.value = opts;
}

const isLoading = computed(
  () =>
    (optsRef.value?.numberOfSuccesses ?? 0) +
      (optsRef.value?.numberOfErrors ?? 0) +
      (optsRef.value?.numberOfOvertime ?? 0) <
    (optsRef.value?.total ?? 0)
);
const theme = useThemeVars();
</script>

<template>
  <TooltipVue
    :tooltip="
      relayConfigurator.hasChange()
        ? t('broadcast_has_change_tip')
        : t('broadcast_no_change_tip')
    "
  >
    <n-button
      @click="broadcast"
      type="default"
      :loading="isLoading"
      :disabled="isLoading || relayConfigurator.hasChange()"
    >
      {{ isLoading ? t("success_timeout_failure_total") : t("broadcast") }}

      <span v-if="optsRef">
        <span
          :style="{
            color: theme.successColor,
          }"
        >
          {{ optsRef.numberOfSuccesses }}
        </span>
        /
        <span
          :style="{
            color: theme.warningColor,
          }"
        >
          {{ optsRef.numberOfOvertime }}
        </span>
        /
        <span
          :style="{
            color: theme.errorColor,
          }"
        >
          {{ optsRef.numberOfErrors }}
        </span>
        /
        <span>
          {{ optsRef.total }}
        </span>
      </span>
    </n-button>
  </TooltipVue>
</template>

<style scoped></style>
