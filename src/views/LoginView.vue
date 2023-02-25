<script lang="ts" setup>
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
function complete() {
  const redirected = route.params.redirected as string;

  if (!redirected || redirected === route.hash) {
    router.push("/");
    return;
  }

  router.push(redirected);
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

      <n-button
        v-if="current > 1"
        type="primary"
        block
        secondary
        strong
        @click="() => --current"
      >
        上一步
      </n-button>

      <Login v-if="current === 1" @next="next" />
      <div v-else-if="current === 2">
        <RelayConfig />
        <n-button type="primary" block secondary strong @click="next">
          下一步
        </n-button>
      </div>
      <LoginPrompt v-if="current === maxStep" @next="complete" />
    </n-space>
  </n-card>
</template>

<style scoped></style>
