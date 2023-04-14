<script lang="ts" setup>
import { t } from "@/i18n";
import { relayConfigurator } from "@/nostr/nostr";
import { usePubkey } from "@/utils/nostrApiUse";
import { NButton, NSpace } from "naive-ui";
import { getUserMetadataLineByPubkey, UserMetaData } from "../api/user";
import UserMetadataEditingVue from "./UserMetadataEditing.vue";

const message = useMessage();
const emit = defineEmits<{
  (e: "close"): void;
}>();

const userMetadata = ref<UserMetaData>({});

const pubkey = usePubkey({ intercept: true });
const metadataLine = computed(() => {
  if (!pubkey.value) return;
  return getUserMetadataLineByPubkey(pubkey.value);
});
const metadata = computed(
  () => metadataLine.value && metadataLine.value.feat.useMetadata()
);
watchEffect(() => {
  if (!metadata.value) return;
  userMetadata.value = metadata.value;
});

const loading = ref(false);
async function send() {
  loading.value = true;
  metadataLine.value?.publish(
    {
      content: JSON.stringify(userMetadata.value),
      kind: 0,
    },
    relayConfigurator.getWriteList(),
    {
      addUrl: true,
      onOK({ ok, url }) {
        loading.value = false;

        if (ok) {
          message.success(`已成功提交到${url}`);
        } else {
          message.error(`提交到${url}失败`);
        }
      },
    }
  );
}
</script>

<template>
  <n-card
    class="w-[600px] max-w-full max-h-full"
    title="编辑用户信息"
    :bordered="false"
    role="dialog"
    aria-modal="true"
    v-if="metadataLine"
  >
    <n-space vertical>
      <UserMetadataEditingVue :userMetadata="userMetadata" />

      <n-space center>
        <n-button type="tertiary" @click="() => emit('close')">
          {{ t("cancel") }}
        </n-button>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              type="primary"
              @click="send"
              :loading="loading"
              :disabled="loading"
            >
              {{ t("submit") }}
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
