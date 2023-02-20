<script lang="ts" setup>
import { relayConfigurator } from "../api/relays";
const msg = useMessage();
const optsRef = ref(
  null as null | {
    numberOfErrors: number;
    numberOfSuccesses: number;
    total: number;
  }
);
function broadcast() {
  const opts = relayConfigurator.broadcast();
  if (!opts) {
    msg.error("请求失败，您可能需要先配置一下列表");
    return;
  }
  optsRef.value = ref(opts).value;
}
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button
        @click="broadcast"
        type="default"
        :loading="optsRef"
        :disabled="optsRef"
      >
        广播
        <span v-if="optsRef">
          <span class="text-[#ff4757]">{{ optsRef?.numberOfSuccesses }}</span
          >/<span class="text-[#7bed9f]">{{ optsRef?.numberOfErrors }}</span
          >/{{ optsRef?.total }}
        </span>
      </n-button>
    </template>
    将自己的联系方式广泛发布，可帮助别人更容易找到自己
  </n-tooltip>
</template>

<style scoped></style>
