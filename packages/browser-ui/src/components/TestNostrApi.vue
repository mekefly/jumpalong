<script lang="ts" setup>
import { t } from "@/i18n";
import { ApiListType, apiNameList } from "@/nostr/nostrApi/NostrApi";
import { testNostr } from "@/nostr/nostrApi/test";
import { NostrApi } from "@/types/NostrApi";
const props = defineProps<{
  disabled?: boolean;
  nostr: Partial<NostrApi> | undefined;
}>();
const emits = defineEmits<{
  (e: "test"): void;
}>();

const isTest = ref(false);
const withNameApi = ref<ApiListType>([]);
const dialog = useDialog();
async function handelTest() {
  emits("test");
  isTest.value = true;
  withNameApi.value = [];

  dialog.info({
    title: t("note"),
    content: t("authorized_form_test_note"),
    positiveText: t("yes"),
    onPositiveClick: () => testNostr(withNameApi.value, props.nostr),
  });
}
</script>

<template>
  <n-checkbox-group v-if="isTest" :value="withNameApi">
    <n-space>
      <n-checkbox
        v-for="apiName in apiNameList"
        :value="apiName"
        :label="apiName"
      />
    </n-space>
  </n-checkbox-group>

  <n-button
    @click="handelTest"
    :disabled="disabled"
    class="w-full"
    :type="'primary'"
  >
    {{ t("test") }}
  </n-button>
</template>

<style scoped></style>
