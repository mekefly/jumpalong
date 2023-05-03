<script lang="ts" setup>
import { t } from "@/i18n";
import { TYPES, relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import { useOnOK } from "@/utils/use";
import { generatePrivateKey, getPublicKey, nip19 } from "nostr-tools";
import { useSetAutocomplete } from "./Login";
import { useLoginCompleteHook } from "./LoginCompleteHook";
import {
  useNostrContainerFactory,
  useNostrContainerGet,
} from "./NostrContainerProvade";
import UserMetadataEditingVue from "./UserMetadataEditing.vue";

const emit = defineEmits<{
  (e: "next"): void;
  (e: "beforeNext"): void;
}>();

const message = useMessage();
const getFollowChannel = useNostrContainerFactory(TYPES.FollowChannel);
const contactConfiguration = useNostrContainerGet(TYPES.ContactConfiguration);
const getNostrApi = useNostrContainerFactory(TYPES.LoginApi);

const prikeyInput = useSetAutocomplete("new-password");
const pubkeyInput = useSetAutocomplete("username");

const prikey = ref(generatePrivateKey());
const pubkey = computed(() => getPublicKey(prikey.value));
const nsec = computed(() => nip19.nsecEncode(prikey.value));
const npub = computed(() => nip19.npubEncode(pubkey.value));
const userMetadata = ref({} as any);

function handleRegister() {
  emit("beforeNext");
  getNostrApi().registerPrikey(prikey.value);
  emit("next");
}

const hook = useLoginCompleteHook();
hook?.setHook(async () => {
  //在点击完成注册按钮时将会执行
  if (getNostrApi().testAndVerifyNewUser()) {
    //是新用户的话执行
    await send();

    //对新用户执行的操作
    contactConfiguration.follow(
      "076fae9a020673caf9db66734884aa4a77f49ba394274896e439e1c6ff178289",
      "wss://nos.lol", //作者
      "你好"
    );
    // Nostr
    getFollowChannel().joinChannel(
      "25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb", //nostr群
      {
        relays: ["wss://nos.lol"],
      }
    );
    // Jumpalong
    getFollowChannel().joinChannel(
      "22dcc0565a6c698199767e80b0526769cf3c04460b7ffc22a4b4cfbfdd642b53", //Jumpalong群
      {
        relays: ["wss://nos.lol"],
      }
    );
  }

  getNostrApi().clearNewUserFlag();
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
