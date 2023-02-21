<script lang="ts" setup>
import { getPublicKey, nip19 } from "nostr-tools";
import { loginPrikey, PRIVATE_KEY, registerPrikey } from "../api/login";

const key = localStorage.getItem(PRIVATE_KEY);

const emit = defineEmits<{
  (e: "next"): void;
}>();
const msg = useMessage();
const prikey = ref(!key ? "" : nip19.nsecEncode(key));
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
      const xx = nip19.decode(prikey.value);
      switch (xx.type) {
        case "nsec":
          _login(xx.data as string);
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
        <n-form-item-row label="私钥*">
          <n-input
            placeholder="私钥：请输入nsec或私钥hex"
            show-password-on="click"
            v-model:value="prikey"
            type="password"
          />
        </n-form-item-row>
        <n-form-item-row label="公钥">
          <n-input placeholder="nprofile" v-model:value="nprofile" />
        </n-form-item-row>
      </n-form>
      <n-button
        type="primary"
        block
        secondary
        strong
        @click="login"
        :disabled="!prikey"
      >
        登录
      </n-button>
    </n-tab-pane>
    <n-tab-pane name="signup" tab="注册">
      <n-form>
        <n-form-item-row label="用户名">
          <n-input />
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block secondary strong @click="register">
        注册
      </n-button>
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped></style>
