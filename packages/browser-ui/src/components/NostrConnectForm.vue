<script lang="ts" setup>
import { t } from "@/i18n";
import { injectNostrApi, relayConfigurator } from "@/nostr/nostr";
import { NostrApiMode, setNostrApiMode } from "@/nostr/nostrApi/NostrApiMode";
import { NostrConnectNostrApiImpl } from "@/nostr/nostrApi/NostrConnectNostrApiImpl";
import { toDeCodeNprofile } from "@/utils/nostr";
import { useSetAutocomplete } from "./Login";

import { getTempPubkey } from "@/api/NostrConnect";
import { useCacheStorage } from "@/utils/use";
import { useLoginCompleteHook } from "./LoginCompleteHook";

const emit = defineEmits<{
  (e: "next"): void;
  (e: "beforeNext"): void;
}>();
const hook = useLoginCompleteHook();
const pubkeyValue = useCacheStorage("pubkey-input-value", "", {});
const profilePointer = computed(() => toDeCodeNprofile(pubkeyValue.value));

const pubkey = computed(() => profilePointer.value?.pubkey);
const dialog = useDialog();
async function handleNext() {
  if (!pubkey.value) return;
  emit("beforeNext");

  const nostrApi = new NostrConnectNostrApiImpl(pubkey.value);

  //设置api
  setNostrApiMode(NostrApiMode.NostrContent);
  injectNostrApi({ nostrApi: nostrApi });

  //全部同步
  setTimeout(() => {
    relayConfigurator.sync();
  });

  //设置完成时调用
  hook?.setHook(async () => {
    if (!pubkey.value) return;
    dialog.info({
      title: t("note"),
      content: t("nostr_connect_tip"),
      positiveText: t("yes"),
      onPositiveClick: () => {},
    });

    await connect(pubkey.value, nostrApi);
  });

  emit("next");
}
async function connect(pubkey: string, nostrApi: NostrConnectNostrApiImpl) {
  await nostrApi.connect();

  //固定到存储，公钥登录，如果没有连接成功，那么刷新网页就会进入未登录状态
  localStorage.setItem("pubkey", pubkey);
}

const pubkeyInput = useSetAutocomplete("username");
</script>

<template>
  <n-space class="flex flex-col" vertical>
    <p>{{ t("device_pubkey") }} {{ getTempPubkey().slice(0, 10) }}</p>

    <n-input
      ref="pubkeyInput"
      :placeholder="t('pubkey')"
      show-password-on="click"
      v-model:value="pubkeyValue"
    />

    <slot name="prev-step"></slot>

    <n-button
      :disabled="!pubkey"
      @click="handleNext"
      class="w-full"
      :type="'primary'"
    >
      {{ t("next_step") }}
    </n-button>
  </n-space>
</template>

<style scoped></style>
