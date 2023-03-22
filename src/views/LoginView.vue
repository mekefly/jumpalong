<script lang="ts" setup>
import { testAndVerifyNewUser } from "@/api/login";
import { loginOperations } from "@/api/loginOperations";
import ScrollbarVue from "@/components/Scrollbar.vue";
import { relayConfigurator } from "@/nostr/nostr";
import { NSpace } from "naive-ui";
import Login from "../components/Login.vue";
import LoginPrompt from "../components/LoginPrompt.vue";
import RelayConfig from "../components/RelayConfig.vue";

const router = useRouter();
const route = useRoute();
const showModal = ref(false);
const maxStep = ref(3);
const current = ref(1);
try {
  const c = parseInt(route.query.step as any);
  if (!isNaN(c)) {
    current.value = c;
  }
} catch (error) {}

const message = useMessage();

async function complete() {
  loginOperations.push(() => {
    //对新用户执行的操作
    if (testAndVerifyNewUser()) {
      //从现在开始不再是新注册用户了
      localStorage.removeItem("newUserFlag");
    }
  });

  loginOperations.forEach((f) => f());

  const redirected = route.query.redirected as string;

  if (!redirected) {
    router.push("/");
    return;
  }

  router.push(redirected);
}
const isNewUser = ref(testAndVerifyNewUser());

function handleStep1Next() {
  --current.value;

  updateRouter();
}
function updateRouter() {
  router.push({
    name: "login",
    query: { ...route.query, step: current.value },
  });
}
function next() {
  current.value++;

  updateRouter();
}
function handelLoggin() {
  next();
}

const numberOfrelayConfigurator = computed(
  () => Object.keys(relayConfigurator.getConfiguration()).length
);
const newUserChangeRelayConfig = computed(
  () => isNewUser.value && relayConfigurator.hasChange()
);
const step2NextButtonDisable = computed(() => {
  return (
    numberOfrelayConfigurator.value === 0 || newUserChangeRelayConfig.value
  );
});
const isShowStep2Tooltip = ref(false);
function handelReload() {
  location.reload();
}
</script>

<template>
  <ScrollbarVue>
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
          @click="handleStep1Next"
        >
          上一步
        </n-button>
        <Login
          :isNewUser="isNewUser"
          v-if="current === 1"
          @next="handelLoggin"
        />

        <!-- 配置中继 -->
        <div v-else-if="current === 2">
          <n-tooltip trigger="manual" :show="isShowStep2Tooltip">
            <template #trigger>
              <div
                @mouseenter="() => (isShowStep2Tooltip = true)"
                @mouseleave="() => (isShowStep2Tooltip = false)"
              >
                <n-button
                  type="primary"
                  block
                  strong
                  @click="next"
                  :disabled="step2NextButtonDisable"
                >
                  下一步
                </n-button>
              </div>
            </template>
            {{
              numberOfrelayConfigurator === 0
                ? "请配置relay"
                : newUserChangeRelayConfig
                ? "请保存配置"
                : "太好了，您可以点击下一步骤了"
            }}
          </n-tooltip>

          <n-alert class="mt-2" title="欢迎" type="info" closable>
            真的很欢迎您使用我们的软件，但是，您有一件更重要的事情，您需要选择一些中继来存储您的个人数据，这通常很简单
          </n-alert>

          <n-alert
            class="mt-2"
            v-if="!isNewUser"
            title=""
            type="warning"
            closable
          >
            请配置好您的中续，您至少应该配置一条曾经用过的中继，这样才能保证可以正常的读取您的用户数据
          </n-alert>
          <n-alert
            class="mt-2"
            v-if="!isNewUser"
            title="找回配置指南"
            type="info"
            closable
          >
            您需要做的是<br />
            1.找到印象中自己用过的中继<br />
            2.点击同步按钮<br />
          </n-alert>

          <n-alert
            class="mt-2"
            v-if="!isNewUser"
            title="注意"
            type="info"
            closable
          >
            如果您不小心点击加号，或想要放弃当前编辑配置，可以直接
            <n-button text @click="handelReload"> `点击此处刷新页面` </n-button>
            ，您的修改将会放弃
          </n-alert>

          <n-alert
            class="mt-2"
            v-if="!isNewUser"
            title="注意"
            type="info"
            closable
          >
            同步不是遮盖，也不是合并，是寻找到最新的配置信息，您可以频繁点击，但默认每次开启此软件，都会自动同步一次，所以大多数情况下您不需要手动同步，您的配置将始终保持最新状态
          </n-alert>

          <n-alert
            class="mt-2"
            v-if="isNewUser"
            title="配置简化教程"
            type="info"
            closable
          >
            1. 点击加号<br />
            2. 点击保存<br />
            3. 点击下一步<br />
          </n-alert>

          <n-alert
            class="mt-2"
            v-if="isNewUser"
            title="如何配置中继"
            type="info"
            closable
          >
            1.
            可能根据网络原因，您可能需要等待十秒内的一定时间，等待下方更多中继列表更新
            <br />
            2.
            您可以在更多中继列表里查找自己喜欢的中续，或直接使用搜索找到自己喜欢的中续
            <br />
            3. 当您找到自己喜欢的中续后，您需要点击后方的 `+` 号来添加中续

            <br />
            4. 新添加的中续会进入第一个配置区，您可以点击上下箭头来更改读写情况

            <br />
            5. 我们建议您配置三个中继

            <br />
            6. 配置完成后点击保存

            <br />
            7.
            如果您想要让您的好友立即找到您，只需要点击广播，来将自己所在的中继发布到更多的中续，这通常会让您的好友更容易的找到您
          </n-alert>

          <n-alert
            class="mt-2"
            v-if="isNewUser"
            title="中继是什么"
            type="info"
            closable
          >
            Nostr是一个分布式的网络，但是不是P2P网络，也没有用到区块链技术，仅仅使用了公私钥体系。Nostr网络中目前只有两个角色relay和client。每一个节点被称之为relay（中继服务器），普通用户是client。由于没有实现P2P协议，每个relay之间并不会同步消息，每个relay都有自己的数据库存储，数据库的类型可以自行决定，目前用的比较多的是sqlite或者Postgresql，其他的类的数据库也可以，要看relay的具体实现。1
          </n-alert>
          <RelayConfig class="h-full mt-2" />
        </div>

        <!-- 完成 -->
        <LoginPrompt v-if="current === maxStep" @next="complete" />
      </n-space>
    </n-card>
  </ScrollbarVue>
</template>

<style scoped></style>
