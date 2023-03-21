<script lang="ts" setup>
import { logout } from "@/api/login";
import { timeout } from "@/utils/utils";
import { NSpace } from "naive-ui";
import Login from "../components/Login.vue";
import LoginPrompt from "../components/LoginPrompt.vue";
import RelayConfig from "../components/RelayConfig.vue";

const router = useRouter();
const route = useRoute();
const showModal = ref(false);
const maxStep = ref(3);
const current = ref(1);
function next() {
  current.value++;
}
async function complete() {
  const redirected = route.query.redirected as string;
  if (!redirected || redirected === route.hash) {
    router.push("/");
    return;
  }

  router.push(redirected);

  //刷新页面
  await timeout(0);
  location.reload();
}
const disableRelayConfigNext = ref(true);
function testAndVerifyNewUser() {
  const prikey = localStorage.getItem("newUserFlag");
  const currentPrikey = localStorage.getItem("prikey");
  if (prikey && prikey === currentPrikey) {
    return true;
  } else {
    return false;
  }
}
const message = useMessage();
async function wheelSearchTestAndVerifyNewUser() {
  while (true) {
    await timeout(1000);
    console.log("wheelSearchTestAndVerifyNewUser", testAndVerifyNewUser());
    if (testAndVerifyNewUser()) {
      disableRelayConfigNext.value = true;
    } else {
      message.success("检查到您已经配置好了中继，您可以进行下一步了");
      disableRelayConfigNext.value = false;
      return;
    }
  }
}
wheelSearchTestAndVerifyNewUser();
function handleStep1Next() {
  --current.value;
}
</script>

<template>
  <n-card
    class=""
    :class="{
      'absolute left-[50%] top-[50%] max-w-sm':
        current === 1 || current === maxStep,
    }"
    :style="{
      transform:
        current === 1 || current === maxStep
          ? 'translate(-50%,-50%)'
          : undefined,
    }"
  >
    <n-space size="large" vertical>
      <n-steps size="small" :current="(current as number)">
        <n-step title="注册登录" description="" />
        <n-step title="配置中续" description="" />
        <n-step title="完成" description="" />
      </n-steps>

      <!-- 注册 -->
      <n-button
        v-if="current > 1"
        type="primary"
        block
        secondary
        strong
        @click="handleStep1Next"
      >
        上一步
      </n-button>
      <Login v-if="current === 1" @next="next" />

      <!-- 配置中继 -->
      <div v-else-if="current === 2">
        <n-button
          type="primary"
          block
          secondary
          strong
          @click="next"
          :disabled="disableRelayConfigNext"
        >
          下一步
        </n-button>

        <n-alert title="注意" type="info">
          请配置好您的中续，您至少应该配置一条曾经用过的中继，这样才能保证可以正常的读取您的用户数据
        </n-alert>
        <RelayConfig />
      </div>

      <!-- 完成 -->
      <LoginPrompt v-if="current === maxStep" @next="complete" />
    </n-space>
  </n-card>
</template>

<style scoped></style>
