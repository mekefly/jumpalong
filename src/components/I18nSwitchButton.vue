<script lang="ts" setup>
import i18n, { setLang, SUPPORT_LOCALES, t } from "@/i18n";

const languageOptions = ref(
  SUPPORT_LOCALES.map((locale) => {
    return {
      label: t(locale),
      key: locale,
    };
  })
);

function handleLanguageSelect(key: string) {
  setLang(key as any);
}
const locale = computed(() => i18n.global.locale);
</script>

<template>
  <n-dropdown
    trigger="hover"
    :options="languageOptions"
    @select="handleLanguageSelect"
  >
    <n-button quaternary>{{ t(locale) }}</n-button>
  </n-dropdown>
</template>

<style scoped></style>
