<script lang="ts" setup>
import i18n, { getSupportLocales, setLang, t } from "@/i18n";

const languageOptions = ref(
  Array.from(getSupportLocales(), (locale) => {
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
