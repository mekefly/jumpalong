<script lang="ts" setup>
import { NButton, NInput, NSpace } from "naive-ui";
import {
  getUserMetadataLineByPubkey,
  sendUserMetadataByPubkey,
  UserMetaData,
} from "../api/user";
import { userKey } from "../nostr/user";

const message = useMessage();
const emit = defineEmits<{
  (e: "close"): void;
}>();

const userMetadataByPubkey = ref<UserMetaData>({});

const metadataLine = computed(() =>
  getUserMetadataLineByPubkey(userKey.value.publicKey)
);
const metadata = computed(() => metadataLine.value.feat.useMetadata());
watchEffect(() => {
  userMetadataByPubkey.value = metadata.value;
});

const loading = ref(false);
async function send() {
  loading.value = true;
  await sendUserMetadataByPubkey(userMetadataByPubkey.value).catch(() => {
    message.error("提交失败");
    loading.value = false;
  });
  message.success("提交成功，已发送到至少一个服务器");
  loading.value = false;
}
</script>

<template>
  <n-card
    style="width: 600px"
    title="编辑用户信息"
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
  >
    <n-space vertical>
      <n-input
        type="text"
        placeholder="用户名"
        v-model:value="userMetadataByPubkey.name"
      />
      <n-input
        type="textarea"
        placeholder="介绍"
        v-model:value="userMetadataByPubkey.about"
      />
      <n-input
        type="text"
        placeholder="profileUrl"
        v-model:value="userMetadataByPubkey.picture"
      />
      <n-input
        type="text"
        placeholder="nip5用户认证"
        v-model:value="userMetadataByPubkey.nip05"
      />

      <n-space center>
        <n-button type="tertiary" @click="() => emit('close')"> 取消 </n-button>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              type="primary"
              @click="send"
              :loading="loading"
              :disabled="loading"
            >
              提交
            </n-button>
          </template>
          如果加载不到合适的信息，那可能是relays设置不对请尝试配置一下
        </n-tooltip>
        <n-tooltip v-if="loading" trigger="hover">
          <template #trigger>
            <n-button @click="() => (loading = false)">停止加载</n-button>
          </template>
          如果您是新用户的话，或者您放弃之前的信息就可以点此处
        </n-tooltip>
      </n-space>
    </n-space>
  </n-card>
</template>

<style scoped></style>
