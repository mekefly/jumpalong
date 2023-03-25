<script lang="ts" setup>
import { registerPrikey, testAndVerifyNewUser } from "@/api/login";
import { t } from "@/i18n";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import { useOnOK } from "@/utils/use";
import { useLoginStepsState } from "@/views/LoginStepsView";
import { generatePrivateKey, getPublicKey, nip19 } from "nostr-tools";
import { useSetAutocomplete } from "./Login";
import UserMetadataEditingVue from "./UserMetadataEditing.vue";

const emit = defineEmits<{
  (e: "next"): void;
}>();

const { loginOperations } = useLoginStepsState();

const message = useMessage();

const prikeyInput = useSetAutocomplete("new-password");
const pubkeyInput = useSetAutocomplete("username");

const prikey = ref(generatePrivateKey());
const pubkey = computed(() => getPublicKey(prikey.value));
const nsec = computed(() => nip19.nsecEncode(prikey.value));
const npub = computed(() => nip19.npubEncode(pubkey.value));
const userMetadata = ref({} as any);

function handleRegister() {
  emit("next");

  registerPrikey(prikey.value);
}

loginOperations.push(() => {
  //在点击完成注册按钮时将会执行

  if (testAndVerifyNewUser()) {
    //是新用户的话执行
    send();
  }
});
const onOK = useOnOK();
async function send() {
  rootEventBeltline.publish(
    {
      content: JSON.stringify(userMetadata.value),
      kind: 0,
      tags: [
        ["t", "jumpalong"], //给注册用户加个客户端标识
      ],
    },
    relayConfigurator.getWriteList(),
    {
      addUrl: true,
      onOK,
    }
  );
}
</script>

<template>
  <n-form>
    <n-form-item-row :label="t('pubkey')">
      <n-input ref="pubkeyInput" placeholder="" v-model:value="npub" disabled />
    </n-form-item-row>
    <n-form-item-row :label="t('prikey')">
      <n-input
        ref="prikeyInput"
        placeholder=""
        show-password-on="click"
        v-model:value="nsec"
        type="password"
        disabled
      />
    </n-form-item-row>
    <UserMetadataEditingVue :userMetadata="userMetadata" />
    <div class="mt-4">
      <slot name="prev-step"></slot>
    </div>
    <n-button class="mt-2" type="primary" block strong @click="handleRegister">
      {{ t("logon") }}
    </n-button>
  </n-form>
</template>

<style scoped></style>
