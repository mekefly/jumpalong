<script lang="ts" setup>
import { Copy16Filled } from "@vicons/fluent";
import { NSpace } from "naive-ui";
import { nip19 } from "nostr-tools";
import { userKey } from "../api/user";
import { useClipboard } from "../utils/naiveUi";

const emit = defineEmits<{
  (e: "next"): void;
}>();

const clipboard = useClipboard();
const key = readonly(ref(nip19.nsecEncode(userKey.value.privateKey)));
function _clipboard() {
  clipboard(key.value);
}
const value = ref();
</script>

<template>
  <n-space size="large" vertical>
    <n-input
      placeholder=""
      v-model:value="key"
      type="password"
      show-password-on="click"
    >
      <template #suffix>
        <n-icon class="px-2" @click="_clipboard"
          ><Copy16Filled class="hover:text-[#2ed573]"
        /></n-icon>
      </template>
    </n-input>
    <n-alert title="注意" type="info">
      请妥善保管您的私钥,一旦泄漏，您将被迫放弃此账户，也请注意，浏览器插件的安全性
    </n-alert>
    <n-checkbox v-model:checked="value"> 我已妥善保存私钥 </n-checkbox>

    <n-button
      class="relative"
      type="primary"
      block
      secondary
      strong
      @click="() => emit('next')"
      :disabled="!value"
    >
      完成
      <n-tooltip v-if="!value" trigger="hover">
        <template #trigger>
          <div class="absolute left-0 right-0 top-0 bottom-0"></div>
        </template>
        请确认上方按钮已勾选
      </n-tooltip>
    </n-button>
  </n-space>
</template>

<style scoped></style>
