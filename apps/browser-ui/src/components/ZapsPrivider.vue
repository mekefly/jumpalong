<script lang="ts" setup>
import { t } from "@/i18n";
import { fatchLud6, fetchLnbc } from "@/sat/lud";
import { useUserMetadata } from "@/state/metadata";
import { NScrollbar } from "naive-ui";
import { requestProvider } from "webln";
import Drawer from "./Drawer.vue";
import UserInfo from "./UserInfo.vue";
import { provideZaps } from "./ZapsPrivider";

logger.info();

const { pubkey, eventId, show } = provideZaps();

const message = useMessage();
const metadata = useUserMetadata(pubkey);

const lud16 = computed(() => metadata.value?.lud16);
const lud6Data = computedAsync(async () => {
  if (!lud16.value) return null;

  return await fatchLud6(lud16.value);
});

const amount = ref(1000);
const min = computed(() => lud6Data.value?.minSendable ?? 0);
const max = computed(
  () => lud6Data.value?.maxSendable ?? Number.MAX_SAFE_INTEGER
);
watch(lud6Data, () => {
  amount.value = min.value;
});

async function handleRequestProvider() {
  if (!pubkey.value) {
    message.error(`${t("not_found")}${t("pubkey")}`);
    return;
  }
  if (!lud6Data.value) {
    message.error(`${t("not_found")}${t("lud6")}`);
    return;
  }
  if (!lud16.value) {
    message.error(`${t("not_found")}${t("lud16")}`);
    return;
  }
  try {
    const pr = await fetchLnbc(
      lud16.value,
      lud6Data.value,
      amount.value,
      pubkey.value,
      eventId.value ?? undefined
    );

    if (!pr) {
      message.error(t("failed_to_generate_invoice"));
      return;
    }
    const webln = await requestProvider();
    await webln.sendPayment(pr);
  } catch (error) {
    message.error(`${t("payment_failed")}: ${String(error)}`);
  }
}
</script>

<template>
  <Drawer v-if="pubkey" v-model:show="show" height="50%">
    <NScrollbar>
      <UserInfo class="mb-4" :pubkey="pubkey"> </UserInfo>
      <n-alert v-if="metadata && !lud16" :type="'error'">
        {{ t("not_found") }} {{ t("lud16") }}
      </n-alert>
      <n-spin v-else :show="!lud6Data">
        <n-space vertical :size="'large'">
          <n-space>
            <n-input-number
              :min="min"
              :max="max"
              v-model:value="amount"
              clearable
            >
              <template #prefix>
                <span class="ml-2">msta</span>
              </template>
            </n-input-number>
          </n-space>

          <n-space>
            <n-button @click="amount = 1_000">1sat</n-button>
            <n-button @click="amount = 1_000_0">10sat</n-button>
            <n-button @click="amount = 1_000_00">100sat</n-button>
            <n-button @click="amount = 1_000_000">1000sat</n-button>
            <n-button @click="amount = 1_000_000_0">10000sat</n-button>
          </n-space>

          <n-space>
            <n-button
              @click="handleRequestProvider"
              type="primary"
              size="large"
            >
              {{ t("pay") }}
            </n-button>
            <n-button @click="show = false" type="tertiary" size="large">
              {{ t("cancel") }}
            </n-button>
          </n-space>
        </n-space>
      </n-spin>
    </NScrollbar>
  </Drawer>
  <slot></slot>
</template>

<style scoped></style>
