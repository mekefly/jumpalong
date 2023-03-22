<script lang="ts" setup>
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
    msg.error("请求失败，您可能需要先配置一下列表");
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
        ? '当前已有数据更改，您应该点击保存，如果您不希望保存，您应该刷新页面'
        : '将自己的联系方式广泛发布，可帮助别人更容易找到自己'
    "
  >
    <n-button
      @click="broadcast"
      type="default"
      :loading="isLoading"
      :disabled="isLoading || relayConfigurator.hasChange()"
    >
      {{ isLoading ? "成功/超时/失败/总数" : "广播" }}

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
