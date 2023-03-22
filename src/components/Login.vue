<script lang="ts" setup>
import { loginOperations } from "@/api/loginOperations";
import { relayConfigurator, rootEventBeltline } from "@/nostr/nostr";
import { getPublicKey, nip19 } from "nostr-tools";
import {
  loginPrikey,
  PRIVATE_KEY,
  registerPrikey,
  testAndVerifyNewUser,
} from "../api/login";
import { useSetAutocomplete } from "./Login";
import UserMetadataEditingVue from "./UserMetadataEditing.vue";

const key = localStorage.getItem(PRIVATE_KEY);

const props = defineProps<{
  isNewUser: boolean;
}>();
const { isNewUser } = toRefs(props);
const emit = defineEmits<{
  (e: "next"): void;
}>();
const msg = useMessage();

const prikey = ref(isNewUser.value ? "" : key ? nip19.nsecEncode(key) : "");
const nprofile = ref("");
function register() {
  emit("next");

  registerPrikey();
}
function login() {
  if (!prikey.value) {
    msg.error("请输入私钥");
    return;
  }
  try {
    getPublicKey(prikey.value);
    _login(prikey.value);
  } catch (error) {
    try {
      const key = nip19.decode(prikey.value);
      switch (key.type) {
        case "nsec":
          _login(key.data as string);
          break;
        default:
          msg.error("既不是nsec,也不是hex");
          return;
          break;
      }
    } catch (error) {
      msg.error("既不是nsec,也不是hex");
    }
  }

  function _login(key: string) {
    emit("next");
    loginPrikey(key);
  }
}
const userMetadata = ref({} as any);

loginOperations.push(() => {
  //在点击完成注册按钮时将会执行
  console.log(
    "注册完成",
    testAndVerifyNewUser(),
    JSON.stringify(userMetadata.value),
    relayConfigurator.getWriteList()
  );

  if (testAndVerifyNewUser()) {
    //是新用户的话执行
    send();
  }
});
const message = useMessage();
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
      onOK({ ok, url }) {
        if (ok) {
          message.success(`已成功提交到${url}`);
        } else {
          message.error(`提交到${url}失败`);
        }
      },
    }
  );
}
const pubkeyValue1 = ref("");
const disablePubkeyValue = ref(false);
const pubkeyValue = computed({
  get() {
    if (!prikey.value) {
      disablePubkeyValue.value = false;
      return pubkeyValue1.value;
    }

    try {
      disablePubkeyValue.value = true;
      return nip19.npubEncode(getPublicKey(prikey.value)) as string;
    } catch (error) {}

    try {
      const opt = nip19.decode(prikey.value);

      if (opt.type === "nsec") {
        disablePubkeyValue.value = true;
        return nip19.npubEncode(
          getPublicKey(nip19.npubEncode(opt.data as string))
        ) as string;
      }
    } catch (error) {}
    disablePubkeyValue.value = false;
    return pubkeyValue1.value;
  },
  set(v) {
    pubkeyValue1.value = v;
  },
});
const prikeyInput = useSetAutocomplete("current-password");
const pubkeyInput = useSetAutocomplete("username");
</script>

<template>
  <n-tabs
    class="card-tabs"
    default-value="signin"
    size="large"
    animated
    style="margin: 0 -4px"
    pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
  >
    <n-tab-pane name="signin" tab="登录">
      <n-form>
        <n-form-item-row label="公钥(可选)">
          <n-input
            ref="pubkeyInput"
            placeholder="用户公钥"
            show-password-on="click"
            v-model:value="pubkeyValue"
            :disabled="disablePubkeyValue"
          />
        </n-form-item-row>
        <n-form-item-row label="私钥*">
          <n-input
            ref="prikeyInput"
            placeholder="私钥：请输入nsec或私钥hex"
            show-password-on="click"
            v-model:value="prikey"
            type="password"
          />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block strong @click="login" :disabled="!prikey">
        登录
      </n-button>
    </n-tab-pane>
    <n-tab-pane name="signup" tab="注册">
      <UserMetadataEditingVue :userMetadata="userMetadata" />
      <n-button class="mt-4" type="primary" block strong @click="register">
        注册
      </n-button>
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped></style>
