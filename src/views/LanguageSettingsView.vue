<script lang="ts" setup>
import JSONTreeEdit from "@/components/JSONTreeEdit.vue";
import i18n, {
  deleteLocalStorageConfig,
  getLocalConfig,
  getSupportLocales,
  setLocalStorageConfig,
  t,
} from "@/i18n";
import { I18nLocalConfig } from "@/i18n/type";
import { prettifyStringify } from "@/utils/utils";
import { NInput, NScrollbar } from "naive-ui";

const message = useMessage();
const dialog = useDialog();
const logger = loggerScope;
logger.info();

const isChangeLocalConfigJson = ref(false);
const isChange = ref(false);
const name = ref<string>(i18n.global.locale);
const i18nConfig = ref<I18nLocalConfig>({});
const i18nConfigJson = ref("");

const nameOptions = ref(
  Array.from(getSupportLocales(), (locale) => {
    return {
      label: `${locale}: ${t(locale)}`,
      value: locale,
    };
  })
);

//loadJson
handleLoadI18nJson(name.value);

//stringify
watch(
  i18nConfig,
  () => {
    i18nConfigJson.value = prettifyStringify(i18nConfig.value);
  },
  { immediate: true }
);

async function handleLoadI18nJson(name: string) {
  logger.debug("设置", name);
  try {
    if (isChange.value) {
      dialog.warning({
        title: t("warning"),
        content: t("do_you_want_to_discard_the_changes"),
        positiveText: t("yes"),
        negativeText: t("no"),
        onPositiveClick: async () => {
          await loadI18nConfig(name);
        },
        onNegativeClick: () => {
          syncName();
        },
      });
      return;
    }
    await loadI18nConfig(name);
  } catch (error) {}
}
function handelParseJson() {
  try {
    i18nConfig.value = JSON.parse(i18nConfigJson.value);
    syncName();
    isChange.value = true;
    isChangeLocalConfigJson.value = false;
  } catch (error) {
    message.error(String(error));
  }
}

function handleSave() {
  syncName();
  setLocalStorageConfig(i18nConfig.value);
  message.success(t("success"));
  isChange.value = false;
}
function handleDelete() {
  deleteLocalStorageConfig(name.value);
  message.success(t("success"));
}

async function loadI18nConfig(name: string) {
  //readConfig
  try {
    const _localConfig = await getLocalConfig(name);
    logger.debug("_localConfig", _localConfig);

    if (_localConfig) {
      i18nConfig.value = clone(_localConfig);
      isChange.value = false;
      return;
    }
  } catch (error) {}

  //createByLast
  createI18nConfigByDefault(i18nConfig.value, name);
}
function createI18nConfigByDefault(defaul: any, name: string) {
  i18nConfig.value = clone(defaul);
  i18nConfig.value.name = name;
  isChange.value = true;
}
function clone(v: any) {
  return JSON.parse(JSON.stringify(v));
}
function syncName() {
  if (i18nConfig.value.name) {
    name.value = i18nConfig.value.name;
  } else {
    i18nConfig.value.name = name.value;
  }
}
</script>

<template>
  <NScrollbar>
    <n-space vertical>
      <n-select
        v-model:value="name"
        @change="handleLoadI18nJson"
        :options="nameOptions"
        tag
        filterable
        clearable
      />
      <n-input
        type="textarea"
        v-model:value="i18nConfigJson"
        @change="isChangeLocalConfigJson = true"
      ></n-input>
      <n-space>
        <n-button
          @click="handelParseJson"
          :type="'primary'"
          :disabled="!isChangeLocalConfigJson"
        >
          {{ t("parse") }}
        </n-button>
        <n-button @click="handleSave" :type="'primary'" :disabled="!isChange">
          {{ t("save") }}
        </n-button>
        <n-button @click="handleDelete" :type="'error'">
          {{ t("delete") }}
        </n-button>
      </n-space>
      <JSONTreeEdit @change="isChange = true" :data="i18nConfig"></JSONTreeEdit>
    </n-space>
  </NScrollbar>
</template>

<style scoped lang="scss">
.tree {
  :deep(.n-tree-node-content__text) {
    word-wrap: break-word;
    word-break: break-all;
  }

  :deep(.n-tree-node-content__suffix) {
    flex-shrink: 0;
    height: 100%;
  }
}
</style>
