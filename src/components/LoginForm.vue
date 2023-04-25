<script lang="ts" setup>
import { loginPrikey } from "@/api/login";
import { t } from "@/i18n";
import { decodeToPrikey } from "@/utils/nostr";
import { getPublicKey } from "nostr-tools";
import { useSetAutocomplete } from "./Login";

const emit = defineEmits<{
  (e: "next"): void;
  (e: "beforeNext"): void;
}>();

const message = useMessage();

const prikeyValue = ref("");

const prikeyInput = useSetAutocomplete("current-password");
const pubkeyInput = useSetAutocomplete("username");

const prikey = computed(() => {
  return decodeToPrikey(prikeyValue.value);
});
const pubkey = computed(() => prikey.value && getPublicKey(prikey.value));

function handelLogin() {
  if (!prikeyValue.value) {
    message.error("请输入私钥");
    return;
  }
  if (!prikey.value) {
    message.error("您输入的既不是nsec,也不是hex");
    return;
  }
  emit("beforeNext");
  loginPrikey(prikey.value);
  emit("next");
}
</script>

<template>
  <n-form>
    <n-form-item-row :label="t('pubkey')">
      <n-input
        ref="pubkeyInput"
        :placeholder="t('pubkey')"
        show-password-on="click"
        v-model:value="pubkey"
        :disabled="true"
      />
    </n-form-item-row>
    <n-form-item-row :label="t('prikey')">
      <n-input
        ref="prikeyInput"
        :placeholder="t('prikey')"
        show-password-on="click"
        v-model:value="prikeyValue"
        type="password"
      />
    </n-form-item-row>

    <slot name="prev-step"></slot>
    <n-button
      class="mt-2"
      type="primary"
      block
      strong
      @click="handelLogin"
      :disabled="!prikey"
    >
      {{ t("login") }}
    </n-button>
  </n-form>
</template>

<style scoped></style>
